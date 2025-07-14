# Uvarsity Platform Backend

## Overview
This is the backend microservices architecture for the Uvarsity Learning Platform - an ed-tech platform focused on equipping African youth with employable skills in design and technology.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Uvarsity-Learning-Platform/uvarsity-platform.git
cd uvarsity-platform
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the database (using Docker)
```bash
docker-compose up -d postgres redis
```

5. Run database migrations
```bash
# Database schema is auto-created from init.sql
```

6. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Using Docker

To run the entire stack with Docker:
```bash
docker-compose up -d
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

## Project Structure

```
src/
├── auth/              # Authentication service
│   ├── controllers/   # Auth controllers
│   ├── services/      # Auth business logic
│   ├── entities/      # User entity
│   ├── dto/          # Data transfer objects
│   ├── guards/       # JWT guards
│   └── strategies/   # Passport strategies
├── user/             # User management service
├── course/           # Course management service
├── payment/          # Payment processing service
├── mentorship/       # Mentorship service
├── community/        # Community/forums service
├── job/              # Job matching service
├── notification/     # Notification service
├── health/           # Health check endpoints
└── shared/           # Shared interfaces and utilities
```

## Features Implemented

### ✅ Phase 1 (MVP)
- [x] Authentication Service (JWT with refresh tokens)
- [x] User Management Service (profiles with African-specific fields)
- [x] Database schema with PostgreSQL
- [x] API documentation with Swagger
- [x] Docker configuration
- [x] Health check endpoints
- [x] Basic security (helmet, rate limiting, CORS)

### 🚧 Phase 2 (In Progress)
- [ ] Course Management Service
- [ ] Payment Service (Mobile Money integration)
- [ ] Content Delivery Service
- [ ] Basic tests

### 📋 Phase 3 (Planned)
- [ ] Mentorship Service
- [ ] Community Service
- [ ] Job Matching Service
- [ ] Analytics Service
- [ ] Notification Service
- [ ] Advanced features (real-time, AI recommendations)

## African-Focused Features

- **Multi-country support**: Kenya, Nigeria, Ghana, Tanzania, Uganda, Rwanda, South Africa, Egypt, Morocco, Ethiopia
- **Mobile Money integration**: M-Pesa, MTN Mobile Money, Airtel Money
- **Multi-language support**: English, Swahili, French, Hausa, Arabic, Amharic
- **Timezone awareness**: Automatic timezone detection based on country
- **Low-bandwidth optimization**: Compressed responses, offline-first architecture
- **Local currency support**: KES, NGN, GHS, TZS, UGX, RWF, ZAR, EGP, MAD, ETB

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with token
- `POST /api/v1/auth/change-password` - Change password (authenticated)
- `GET /api/v1/auth/verify-email/:token` - Verify email address
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `GET /api/v1/auth/profile` - Get current user profile

### Users
- `GET /api/v1/users/profile` - Get user profile

### Health
- `GET /api/v1/health` - General health check
- `GET /api/v1/health/database` - Database health check
- `GET /api/v1/health/redis` - Redis health check

## Environment Variables

Key environment variables (see `.env.example` for complete list):

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=uvarsity
DB_USER=uvarsity_user
DB_PASSWORD=uvarsity_password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h

# Server
NODE_ENV=development
PORT=3000
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test auth.controller.spec.ts
```

## Database Schema

The database includes tables for:
- Users and user profiles
- Courses and enrollments
- Payments and installment plans
- Mentorship sessions
- Community forums
- Job postings and applications
- Notifications
- User settings

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- CORS configuration for African regions
- Input validation and sanitization
- Helmet for security headers
- Environment-based configuration

## Mobile Money Integration (Planned)

Support for major African mobile money providers:
- **Kenya**: M-Pesa
- **Nigeria**: MTN Mobile Money, Airtel Money
- **Ghana**: MTN Mobile Money, Airtel Money, Vodafone Cash
- **Tanzania**: M-Pesa, Airtel Money, Tigo Pesa
- **Uganda**: MTN Mobile Money, Airtel Money
- **Rwanda**: MTN Mobile Money, Airtel Money

## Deployment

### Production Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start with PM2: `pm2 start ecosystem.config.js`

### Using Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Uvarsity** - Learning designed for Africa, powered by community, and driven by opportunity.