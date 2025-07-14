import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Rate limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    }),
  );

  // Enable CORS for African regions and development
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://uvarsity.africa',
      'https://app.uvarsity.africa',
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Uvarsity API')
    .setDescription('Backend API for Uvarsity Learning Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Users', 'User management and profiles')
    .addTag('Courses', 'Course catalog and management')
    .addTag('Enrollments', 'Course enrollments and progress')
    .addTag('Payments', 'Payment processing and mobile money')
    .addTag('Mentorship', 'Mentorship sessions and matching')
    .addTag('Community', 'Forums and discussions')
    .addTag('Jobs', 'Job postings and applications')
    .addTag('Notifications', 'System notifications')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Uvarsity API Documentation',
    customfavIcon: 'https://uvarsity.africa/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Uvarsity API is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}

bootstrap();