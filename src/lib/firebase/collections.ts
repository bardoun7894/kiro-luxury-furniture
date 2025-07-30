import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';
import { 
  Project, 
  Inquiry, 
  WoodmakerProfile, 
  ProjectFilters, 
  SearchParams,
  UploadProgress 
} from '@/types';

// Collection references
export const projectsCol = collection(db, 'projects');
export const inquiriesCol = collection(db, 'inquiries');
export const woodmakerProfileCol = collection(db, 'woodmakerProfile');
export const usersCol = collection(db, 'users');

// Projects CRUD operations
export const projectService = {
  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'inquiryCount'>) {
    const docRef = await addDoc(projectsCol, {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      viewCount: 0,
      inquiryCount: 0,
    });
    return docRef.id;
  },

  async getById(id: string): Promise<Project | null> {
    const docSnap = await getDoc(doc(projectsCol, id));
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as Project;
  },

  async getAll(params?: SearchParams): Promise<{ items: Project[]; total: number }> {
    let q = query(projectsCol, orderBy('createdAt', 'desc'));
    
    if (params?.filters) {
      const { category, style, woodType, priceRange, isFeatured, isAvailable, tags } = params.filters;
      
      if (category) q = query(q, where('category', '==', category));
      if (style) q = query(q, where('style', '==', style));
      if (woodType) q = query(q, where('woodType', '==', woodType));
      if (priceRange) {
        q = query(q, where('price', '>=', priceRange.min), where('price', '<=', priceRange.max));
      }
      if (isFeatured !== undefined) q = query(q, where('isFeatured', '==', isFeatured));
      if (isAvailable !== undefined) q = query(q, where('isAvailable', '==', isAvailable));
      if (tags && tags.length > 0) {
        q = query(q, where('tags', 'array-contains-any', tags));
      }
    }

    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'newest':
          q = query(q, orderBy('createdAt', 'desc'));
          break;
        case 'oldest':
          q = query(q, orderBy('createdAt', 'asc'));
          break;
        case 'price-low':
          q = query(q, orderBy('price', 'asc'));
          break;
        case 'price-high':
          q = query(q, orderBy('price', 'desc'));
          break;
        case 'popular':
          q = query(q, orderBy('viewCount', 'desc'));
          break;
        case 'name':
          q = query(q, orderBy('title.en', 'asc'));
          break;
      }
    }

    if (params?.page && params?.limit) {
      const offset = (params.page - 1) * params.limit;
      q = query(q, limit(params.limit));
      if (offset > 0) {
        // For pagination, we'd need to implement cursor-based pagination
        // This is a simplified version
      }
    }

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Project[];

    return { items, total: items.length };
  },

  async getFeatured(limitCount: number = 6): Promise<Project[]> {
    const q = query(projectsCol, where('isFeatured', '==', true), limit(limitCount));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Project[];
  },

  async update(id: string, updates: Partial<Project>) {
    await updateDoc(doc(projectsCol, id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string) {
    await deleteDoc(doc(projectsCol, id));
  },

  async incrementViewCount(id: string) {
    const projectRef = doc(projectsCol, id);
    const projectSnap = await getDoc(projectRef);
    if (projectSnap.exists()) {
      const currentCount = projectSnap.data().viewCount || 0;
      await updateDoc(projectRef, { viewCount: currentCount + 1 });
    }
  },

  async incrementInquiryCount(id: string) {
    const projectRef = doc(projectsCol, id);
    const projectSnap = await getDoc(projectRef);
    if (projectSnap.exists()) {
      const currentCount = projectSnap.data().inquiryCount || 0;
      await updateDoc(projectRef, { inquiryCount: currentCount + 1 });
    }
  },
};

// Inquiries CRUD operations
export const inquiryService = {
  async create(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(inquiriesCol, {
      ...inquiry,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Increment inquiry count for the project if specified
    if (inquiry.projectId) {
      await projectService.incrementInquiryCount(inquiry.projectId);
    }
    
    return docRef.id;
  },

  async getById(id: string): Promise<Inquiry | null> {
    const docSnap = await getDoc(doc(inquiriesCol, id));
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      respondedAt: data.respondedAt?.toDate() || undefined,
    } as Inquiry;
  },

  async getAll(filters?: {
    status?: string;
    email?: string;
    projectId?: string;
    limit?: number;
  }) {
    let q = query(inquiriesCol, orderBy('createdAt', 'desc'));
    
    if (filters?.status) q = query(q, where('status', '==', filters.status));
    if (filters?.email) q = query(q, where('email', '==', filters.email));
    if (filters?.projectId) q = query(q, where('projectId', '==', filters.projectId));
    if (filters?.limit) q = query(q, limit(filters.limit));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      respondedAt: doc.data().respondedAt?.toDate() || undefined,
    })) as Inquiry[];
  },

  async update(id: string, updates: Partial<Inquiry>) {
    await updateDoc(doc(inquiriesCol, id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async delete(id: string) {
    await deleteDoc(doc(inquiriesCol, id));
  },
};

// Woodmaker profile operations
export const woodmakerProfileService = {
  async getProfile(): Promise<WoodmakerProfile | null> {
    const querySnapshot = await getDocs(woodmakerProfileCol);
    if (querySnapshot.empty) return null;
    
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    } as WoodmakerProfile;
  },

  async create(profile: Omit<WoodmakerProfile, 'id' | 'createdAt' | 'updatedAt'>) {
    const docRef = await addDoc(woodmakerProfileCol, {
      ...profile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async update(id: string, updates: Partial<WoodmakerProfile>) {
    await updateDoc(doc(woodmakerProfileCol, id), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },
};

// File upload utilities
export const fileUploadService = {
  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  },

  async uploadMultipleImages(files: File[], basePath: string): Promise<string[]> {
    const uploadPromises = files.map((file, index) => 
      this.uploadImage(file, `${basePath}/${Date.now()}_${index}_${file.name}`)
    );
    return Promise.all(uploadPromises);
  },

  async deleteImage(url: string): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  },

  async uploadWithProgress(
    file: File, 
    path: string, 
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const storageRef = ref(storage, path);
    
    // This would need to be implemented with uploadBytesResumable for real progress
    const snapshot = await uploadBytes(storageRef, file);
    if (onProgress) onProgress(100);
    
    return getDownloadURL(snapshot.ref);
  },
};

// Analytics utilities
export const analyticsService = {
  async getProjectStats() {
    const projectsSnapshot = await getDocs(projectsCol);
    const inquiriesSnapshot = await getDocs(inquiriesCol);
    
    const projects = projectsSnapshot.docs.map(doc => doc.data() as Project);
    const inquiries = inquiriesSnapshot.docs.map(doc => doc.data() as Inquiry);
    
    const totalProjects = projects.length;
    const totalInquiries = inquiries.length;
    const totalViews = projects.reduce((sum, p) => sum + (p.viewCount || 0), 0);
    
    const popularCategories = projects.reduce((acc, project) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const popularStyles = projects.reduce((acc, project) => {
      acc[project.style] = (acc[project.style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const inquiryStatus = inquiries.reduce((acc, inquiry) => {
      acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalProjects,
      totalInquiries,
      totalViews,
      popularCategories: Object.entries(popularCategories).map(([category, count]) => ({ category: category as any, count })),
      popularStyles: Object.entries(popularStyles).map(([style, count]) => ({ style: style as any, count })),
      inquiryStatus: Object.entries(inquiryStatus).map(([status, count]) => ({ status: status as any, count })),
    };
  },
};
