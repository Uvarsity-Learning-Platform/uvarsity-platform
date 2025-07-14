import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'uvarsity-api',
      version: '1.0.0',
    };
  }

  @Get('database')
  @ApiOperation({ summary: 'Database health check' })
  getDatabaseHealth() {
    // TODO: Implement actual database health check
    return {
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('redis')
  @ApiOperation({ summary: 'Redis health check' })
  getRedisHealth() {
    // TODO: Implement actual Redis health check
    return {
      status: 'ok',
      redis: 'connected',
      timestamp: new Date().toISOString(),
    };
  }
}