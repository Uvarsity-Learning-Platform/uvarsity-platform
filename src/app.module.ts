import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { PaymentModule } from './payment/payment.module';
import { MentorshipModule } from './mentorship/mentorship.module';
import { CommunityModule } from './community/community.module';
import { JobModule } from './job/job.module';
import { NotificationModule } from './notification/notification.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'uvarsity_user',
      password: process.env.DB_PASSWORD || 'uvarsity_password',
      database: process.env.DB_NAME || 'uvarsity',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 3,
    }),

    // Redis/Bull for queues
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),

    // Feature modules
    AuthModule,
    UserModule,
    CourseModule,
    PaymentModule,
    MentorshipModule,
    CommunityModule,
    JobModule,
    NotificationModule,
    HealthModule,
  ],
})
export class AppModule {}