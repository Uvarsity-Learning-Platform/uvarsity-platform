import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as ApiResponseDecorator, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiResponse } from '../../../shared/interfaces';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponseDecorator({ status: 201, description: 'User registered successfully' })
  @ApiResponseDecorator({ status: 409, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponseDecorator({ status: 200, description: 'Login successful' })
  @ApiResponseDecorator({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse> {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponseDecorator({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<ApiResponse> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponseDecorator({ status: 200, description: 'Password reset successful' })
  @ApiResponseDecorator({ status: 401, description: 'Invalid or expired token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<ApiResponse> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponseDecorator({ status: 200, description: 'Password changed successfully' })
  @ApiResponseDecorator({ status: 401, description: 'Current password is incorrect' })
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto): Promise<ApiResponse> {
    return this.authService.changePassword(req.user.sub, changePasswordDto);
  }

  @Get('verify-email/:token')
  @ApiOperation({ summary: 'Verify email address' })
  @ApiResponseDecorator({ status: 200, description: 'Email verified successfully' })
  @ApiResponseDecorator({ status: 401, description: 'Invalid verification token' })
  async verifyEmail(@Param('token') token: string): Promise<ApiResponse> {
    return this.authService.verifyEmail(token);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponseDecorator({ status: 200, description: 'Token refreshed successfully' })
  @ApiResponseDecorator({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body('refreshToken') refreshToken: string): Promise<ApiResponse> {
    return this.authService.refreshToken(refreshToken);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponseDecorator({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@Request() req): Promise<ApiResponse> {
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: req.user,
    };
  }
}