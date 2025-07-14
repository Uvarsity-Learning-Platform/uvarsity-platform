import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserProfile } from '../../user/entities/user-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  @Exclude()
  password_hash: string;

  @Column({ default: 'student' })
  role: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  @Exclude()
  verification_token: string;

  @Column({ nullable: true })
  @Exclude()
  reset_token: string;

  @Column({ nullable: true })
  reset_token_expires: Date;

  @Column({ nullable: true })
  last_login: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => UserProfile, profile => profile.user)
  profile: UserProfile;
}