export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface FilterParams {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// User related interfaces
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  country: string;
  timezone: string;
  language: string;
  role: UserRole;
}

export enum UserRole {
  STUDENT = 'student',
  MENTOR = 'mentor',
  INSTRUCTOR = 'instructor',
  ADMIN = 'admin',
  EMPLOYER = 'employer',
}

export enum CourseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum CourseCategory {
  DESIGN = 'design',
  DEVELOPMENT = 'development',
  MARKETING = 'marketing',
  MOTION = 'motion',
  BUSINESS = 'business',
  DATA_SCIENCE = 'data_science',
}

export enum PaymentMethod {
  MPESA = 'mpesa',
  MTN_MOBILE_MONEY = 'mtn_mobile_money',
  AIRTEL_MONEY = 'airtel_money',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

export enum LessonType {
  VIDEO = 'video',
  TEXT = 'text',
  QUIZ = 'quiz',
  ASSIGNMENT = 'assignment',
  INTERACTIVE = 'interactive',
}

export enum NotificationType {
  COURSE = 'course',
  PAYMENT = 'payment',
  MENTORSHIP = 'mentorship',
  JOB = 'job',
  SYSTEM = 'system',
  COMMUNITY = 'community',
}

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance',
}

export interface MobileMoneyPayment {
  phoneNumber: string;
  provider: PaymentMethod;
  amount: number;
  currency: string;
  reference?: string;
  metadata?: Record<string, any>;
}

export interface CourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  timeSpent: number; // in minutes
  lastAccessed: Date;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeId: string;
  title: string;
  scheduledTime: Date;
  duration: number;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  meetingUrl?: string;
}

// African-specific constants
export const AFRICAN_COUNTRIES = [
  { code: 'KE', name: 'Kenya', currency: 'KES', timezone: 'Africa/Nairobi' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', timezone: 'Africa/Lagos' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', timezone: 'Africa/Accra' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', timezone: 'Africa/Dar_es_Salaam' },
  { code: 'UG', name: 'Uganda', currency: 'UGX', timezone: 'Africa/Kampala' },
  { code: 'RW', name: 'Rwanda', currency: 'RWF', timezone: 'Africa/Kigali' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', timezone: 'Africa/Johannesburg' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', timezone: 'Africa/Cairo' },
  { code: 'MA', name: 'Morocco', currency: 'MAD', timezone: 'Africa/Casablanca' },
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', timezone: 'Africa/Addis_Ababa' },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'sw', name: 'Swahili' },
  { code: 'fr', name: 'French' },
  { code: 'ha', name: 'Hausa' },
  { code: 'ar', name: 'Arabic' },
  { code: 'am', name: 'Amharic' },
];

export const MOBILE_MONEY_PROVIDERS = {
  KE: ['mpesa'],
  NG: ['mtn_mobile_money', 'airtel_money'],
  GH: ['mtn_mobile_money', 'airtel_money', 'vodafone_cash'],
  TZ: ['mpesa', 'airtel_money', 'tigo_pesa'],
  UG: ['mtn_mobile_money', 'airtel_money'],
  RW: ['mtn_mobile_money', 'airtel_money'],
};