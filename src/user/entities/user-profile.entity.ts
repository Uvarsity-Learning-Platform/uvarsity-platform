import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  user_id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ length: 2 })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ default: 'Africa/Nairobi' })
  timezone: string;

  @Column({ default: 'en' })
  preferred_language: string;

  @Column({ nullable: true })
  date_of_birth: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  education_level: string;

  @Column({ nullable: true })
  employment_status: string;

  @Column({ type: 'jsonb', default: '[]' })
  skills: string[];

  @Column({ type: 'jsonb', default: '[]' })
  interests: string[];

  @Column({ type: 'jsonb', default: '{}' })
  social_links: Record<string, string>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, user => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}