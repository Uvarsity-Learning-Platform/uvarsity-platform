import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserProfile)
    private profileRepository: Repository<UserProfile>,
  ) {}

  async findProfile(userId: string): Promise<UserProfile> {
    return this.profileRepository.findOne({
      where: { user_id: userId },
    });
  }

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    await this.profileRepository.update({ user_id: userId }, updates);
    return this.findProfile(userId);
  }
}