import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Module, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
class DemoHealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return {
      status: 'ok',
      message: 'Uvarsity API Demo is running',
      timestamp: new Date().toISOString(),
      service: 'uvarsity-api',
      version: '1.0.0',
      features: [
        'Authentication Service',
        'User Management',
        'Course Management (planned)',
        'Mobile Money Payments (planned)',
        'African Market Focus'
      ]
    };
  }
}

@Module({
  controllers: [DemoHealthController],
})
class DemoModule {}

async function bootstrap() {
  const app = await NestFactory.create(DemoModule);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Uvarsity API - Demo')
    .setDescription(`
# Uvarsity Learning Platform Backend API

🌍 **Empowering Africa's Future through Design & Tech Education**

This is a demo of the backend microservices architecture for the Uvarsity Learning Platform.

## Key Features
- **Authentication Service** with JWT and African-focused user management
- **Multi-country Support** for 10 African nations
- **Mobile Money Integration** (M-Pesa, MTN Mobile Money, Airtel Money)
- **Multi-language Support** (English, Swahili, French, Hausa, Arabic, Amharic)
- **Offline-first Architecture** for low-bandwidth environments
- **Microservices Design** with Docker containerization

## African-Focused Design
- Country-specific user profiles with proper timezone/currency mapping
- Mobile Money payment provider support per country
- Low-bandwidth optimization for African internet infrastructure
- Installment payment plans for affordable education access

## Architecture
Built with Node.js, NestJS, PostgreSQL, Redis, and Docker for scalability.
    `)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Health', 'System health and status')
    .addTag('Authentication', 'User auth with JWT')
    .addTag('Users', 'African-focused user profiles')
    .addTag('Courses', 'Course management with offline support')
    .addTag('Payments', 'Mobile Money integration')
    .addTag('Mentorship', 'Mentor-student matching')
    .addTag('Community', 'Forums and discussions')
    .addTag('Jobs', 'Job matching and internships')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Uvarsity API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; }
      .swagger-ui .info .description { background: #f8f9fa; padding: 20px; border-radius: 8px; }
    `,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Uvarsity API Demo is running on: http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`🔍 Health Check: http://localhost:${port}/api/v1/health`);
}

bootstrap();