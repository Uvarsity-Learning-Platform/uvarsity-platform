import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entities/user.entity';
import { UserProfile } from '../../user/entities/user-profile.entity';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '../dto/auth.dto';
import { ApiResponse } from '../../../shared/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<ApiResponse> {
    const { email, phone, password, firstName, lastName, country, role = 'student' } = registerDto;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);
    const verification_token = uuidv4();

    // Create user
    const user = this.userRepository.create({
      email,
      phone,
      password_hash,
      role,
      verification_token,
    });

    const savedUser = await this.userRepository.save(user);

    // Create user profile
    const profile = this.profileRepository.create({
      user_id: savedUser.id,
      first_name: firstName,
      last_name: lastName,
      country,
      preferred_language: this.getDefaultLanguage(country),
      timezone: this.getDefaultTimezone(country),
    });

    await this.profileRepository.save(profile);

    // Generate JWT tokens
    const tokens = await this.generateTokens(savedUser);

    // TODO: Send verification email

    return {
      success: true,
      message: 'Registration successful. Please verify your email.',
      data: {
        user: {
          id: savedUser.id,
          email: savedUser.email,
          role: savedUser.role,
          isVerified: savedUser.is_verified,
        },
        ...tokens,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<ApiResponse> {
    const { email, password } = loginDto;

    // Find user with profile
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Update last login
    user.last_login = new Date();
    await this.userRepository.save(user);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isVerified: user.is_verified,
          profile: user.profile,
        },
        ...tokens,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<ApiResponse> {
    const { email } = forgotPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // Don't reveal if user exists or not
      return {
        success: true,
        message: 'If the email exists, password reset instructions have been sent.',
      };
    }

    // Generate reset token
    const reset_token = uuidv4();
    const reset_token_expires = new Date(Date.now() + 3600000); // 1 hour

    user.reset_token = reset_token;
    user.reset_token_expires = reset_token_expires;
    await this.userRepository.save(user);

    // TODO: Send reset email

    return {
      success: true,
      message: 'If the email exists, password reset instructions have been sent.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<ApiResponse> {
    const { token, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findOne({
      where: {
        reset_token: token,
      },
    });

    if (!user || !user.reset_token_expires || user.reset_token_expires < new Date()) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Hash new password
    const password_hash = await bcrypt.hash(newPassword, 12);

    // Update user
    user.password_hash = password_hash;
    user.reset_token = null;
    user.reset_token_expires = null;
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Password reset successful',
    };
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<ApiResponse> {
    const { currentPassword, newPassword } = changePasswordDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const password_hash = await bcrypt.hash(newPassword, 12);
    user.password_hash = password_hash;
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Password changed successfully',
    };
  }

  async verifyEmail(token: string): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: { verification_token: token },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid verification token');
    }

    user.is_verified = true;
    user.verification_token = null;
    await this.userRepository.save(user);

    return {
      success: true,
      message: 'Email verified successfully',
    };
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse> {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.userRepository.findOne({ where: { id: payload.sub } });

      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);

      return {
        success: true,
        message: 'Token refreshed successfully',
        data: tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '1h' }),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600, // 1 hour in seconds
    };
  }

  private getDefaultLanguage(country: string): string {
    const languageMap = {
      KE: 'en', // Kenya - English/Swahili
      NG: 'en', // Nigeria - English
      GH: 'en', // Ghana - English
      TZ: 'sw', // Tanzania - Swahili
      UG: 'en', // Uganda - English
      RW: 'en', // Rwanda - English
      ZA: 'en', // South Africa - English
      EG: 'ar', // Egypt - Arabic
      MA: 'ar', // Morocco - Arabic
      ET: 'am', // Ethiopia - Amharic
    };

    return languageMap[country] || 'en';
  }

  private getDefaultTimezone(country: string): string {
    const timezoneMap = {
      KE: 'Africa/Nairobi',
      NG: 'Africa/Lagos',
      GH: 'Africa/Accra',
      TZ: 'Africa/Dar_es_Salaam',
      UG: 'Africa/Kampala',
      RW: 'Africa/Kigali',
      ZA: 'Africa/Johannesburg',
      EG: 'Africa/Cairo',
      MA: 'Africa/Casablanca',
      ET: 'Africa/Addis_Ababa',
    };

    return timezoneMap[country] || 'Africa/Nairobi';
  }
}