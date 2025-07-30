// Base types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Project types
export interface Project extends BaseEntity {
  title: LocalizedContent;
  description: LocalizedContent;
  category: ProjectCategory;
  style: FurnitureStyle;
  woodType: WoodType;
  images: string[];
  dimensions: Dimensions;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
  viewCount: number;
  inquiryCount: number;
}

export type ProjectCategory = 
  | 'living' 
  | 'bedroom' 
  | 'dining' 
  | 'office' 
  | 'outdoor' 
  | 'custom';

export type FurnitureStyle = 
  | 'modern' 
  | 'traditional' 
  | 'minimalist' 
  | 'rustic' 
  | 'luxury' 
  | 'industrial';

export type WoodType = 
  | 'oak' 
  | 'walnut' 
  | 'cherry' 
  | 'maple' 
  | 'mahogany' 
  | 'pine' 
  | 'teak';

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  unit: 'cm' | 'inch';
}

// Inquiry types
export interface Inquiry extends BaseEntity {
  clientName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  projectId?: string;
  referenceImages: string[];
  status: InquiryStatus;
  priority: InquiryPriority;
  notes?: string;
  response?: string;
  respondedAt?: Date;
}

export type InquiryStatus = 
  | 'pending' 
  | 'in-progress' 
  | 'responded' 
  | 'completed' 
  | 'cancelled';

export type InquiryPriority = 'low' | 'medium' | 'high' | 'urgent';

// Woodmaker profile
export interface WoodmakerProfile extends BaseEntity {
  name: LocalizedContent;
  bio: LocalizedContent;
  philosophy: LocalizedContent;
  experience: number;
  specialties: string[];
  certifications: string[];
  workshopImages: string[];
  contact: ContactInfo;
  socialLinks: SocialLinks;
  testimonials: Testimonial[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: LocalizedContent;
  workingHours: LocalizedContent;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  content: LocalizedContent;
  rating: number;
  date: Date;
  project?: string;
}

// Internationalization
export interface LocalizedContent {
  en: string;
  ar: string;
  fr: string;
  dz: string;
}

// API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Form types
export interface ProjectFormData {
  title: LocalizedContent;
  description: LocalizedContent;
  category: ProjectCategory;
  style: FurnitureStyle;
  woodType: WoodType;
  images: File[];
  dimensions: Dimensions;
  price: number;
  isFeatured: boolean;
  isAvailable: boolean;
  tags: string[];
}

export interface InquiryFormData {
  clientName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  projectId?: string;
  referenceImages: File[];
}

// User types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt: Date;
}

export type UserRole = 'admin' | 'woodmaker' | 'client';

// Filter and search
export interface ProjectFilters {
  category?: ProjectCategory;
  style?: FurnitureStyle;
  woodType?: WoodType;
  priceRange?: PriceRange;
  isFeatured?: boolean;
  isAvailable?: boolean;
  tags?: string[];
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SearchParams {
  query?: string;
  filters?: ProjectFilters;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption = 
  | 'newest' 
  | 'oldest' 
  | 'price-low' 
  | 'price-high' 
  | 'popular' 
  | 'name';

// Analytics
export interface AnalyticsData {
  totalProjects: number;
  totalInquiries: number;
  totalViews: number;
  popularCategories: { category: ProjectCategory; count: number }[];
  popularStyles: { style: FurnitureStyle; count: number }[];
  inquiryStatus: { status: InquiryStatus; count: number }[];
  monthlyViews: { month: string; views: number }[];
  monthlyInquiries: { month: string; inquiries: number }[];
}

// Wishlist
export interface WishlistItem {
  projectId: string;
  addedAt: Date;
}

// File upload
export interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

// Error handling
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Component props
export interface ProjectCardProps {
  project: Project;
  onWishlistToggle?: (projectId: string) => void;
  isWishlisted?: boolean;
  locale: string;
}

export interface ProjectGalleryProps {
  projects: Project[];
  filters?: ProjectFilters;
  onFilterChange?: (filters: ProjectFilters) => void;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export interface InquiryFormProps {
  projectId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}
