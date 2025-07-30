import { z } from 'zod';
import { 
  ProjectCategory, 
  FurnitureStyle, 
  WoodType, 
  InquiryStatus, 
  InquiryPriority,
  UserRole 
} from '@/types';

// Base schemas
const localizedContentSchema = z.object({
  en: z.string().min(1, 'English content is required'),
  ar: z.string().min(1, 'Arabic content is required'),
  fr: z.string().min(1, 'French content is required'),
  dz: z.string().min(1, 'Darija content is required'),
});

const dimensionsSchema = z.object({
  width: z.number().positive('Width must be positive'),
  height: z.number().positive('Height must be positive'),
  depth: z.number().positive('Depth must be positive'),
  unit: z.enum(['cm', 'inch']),
});

// Project schemas
export const projectSchema = z.object({
  title: localizedContentSchema,
  description: localizedContentSchema,
  category: z.enum(['living', 'bedroom', 'dining', 'office', 'outdoor', 'custom'] as const),
  style: z.enum(['modern', 'traditional', 'minimalist', 'rustic', 'luxury', 'industrial'] as const),
  woodType: z.enum(['oak', 'walnut', 'cherry', 'maple', 'mahogany', 'pine', 'teak'] as const),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  dimensions: dimensionsSchema,
  price: z.number().positive('Price must be positive'),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

export const projectFormSchema = z.object({
  title: localizedContentSchema,
  description: localizedContentSchema,
  category: z.enum(['living', 'bedroom', 'dining', 'office', 'outdoor', 'custom'] as const),
  style: z.enum(['modern', 'traditional', 'minimalist', 'rustic', 'luxury', 'industrial'] as const),
  woodType: z.enum(['oak', 'walnut', 'cherry', 'maple', 'mahogany', 'pine', 'teak'] as const),
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
  dimensions: dimensionsSchema,
  price: z.number().positive('Price must be positive'),
  isFeatured: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
});

// Inquiry schemas
export const inquirySchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectId: z.string().optional(),
  referenceImages: z.array(z.string().url()).optional(),
  status: z.enum(['pending', 'in-progress', 'responded', 'completed', 'cancelled'] as const).default('pending'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const).default('medium'),
  notes: z.string().optional(),
  response: z.string().optional(),
});

export const inquiryFormSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectId: z.string().optional(),
  referenceImages: z.array(z.instanceof(File)).optional(),
});

// Woodmaker profile schemas
export const woodmakerProfileSchema = z.object({
  name: localizedContentSchema,
  bio: localizedContentSchema,
  philosophy: localizedContentSchema,
  experience: z.number().int().min(0, 'Experience must be non-negative'),
  specialties: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  workshopImages: z.array(z.string().url()).optional(),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().min(8, 'Phone number must be at least 8 characters'),
    address: localizedContentSchema,
    workingHours: localizedContentSchema,
  }),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    whatsapp: z.string().optional(),
    website: z.string().url().optional(),
  }).optional(),
  testimonials: z.array(z.object({
    id: z.string(),
    clientName: z.string().min(2, 'Client name must be at least 2 characters'),
    content: localizedContentSchema,
    rating: z.number().int().min(1).max(5),
    date: z.date(),
    project: z.string().optional(),
  })).optional(),
});

// User schemas
export const userSchema = z.object({
  uid: z.string(),
  email: z.string().email('Invalid email address'),
  displayName: z.string().optional(),
  photoURL: z.string().url().optional(),
  role: z.enum(['admin', 'woodmaker', 'client'] as const),
  createdAt: z.date(),
  lastLoginAt: z.date(),
});

// Authentication schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  displayName: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const passwordResetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// Filter and search schemas
export const projectFiltersSchema = z.object({
  category: z.enum(['living', 'bedroom', 'dining', 'office', 'outdoor', 'custom']).optional(),
  style: z.enum(['modern', 'traditional', 'minimalist', 'rustic', 'luxury', 'industrial']).optional(),
  woodType: z.enum(['oak', 'walnut', 'cherry', 'maple', 'mahogany', 'pine', 'teak']).optional(),
  priceRange: z.object({
    min: z.number().nonnegative(),
    max: z.number().positive(),
  }).optional(),
  isFeatured: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});

export const searchParamsSchema = z.object({
  query: z.string().optional(),
  filters: projectFiltersSchema.optional(),
  sortBy: z.enum(['newest', 'oldest', 'price-low', 'price-high', 'popular', 'name']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

// File upload schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File),
  maxSize: z.number().optional().default(5 * 1024 * 1024), // 5MB default
  allowedTypes: z.array(z.string()).optional().default(['image/jpeg', 'image/png', 'image/webp']),
});

// Error handling
export const appErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.any().optional(),
  timestamp: z.date(),
});

// Export types from schemas
export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type InquiryFormData = z.infer<typeof inquiryFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
