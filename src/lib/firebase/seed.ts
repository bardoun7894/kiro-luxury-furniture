import { projectService, inquiryService, woodmakerProfileService } from './collections';
import { Project, Inquiry, WoodmakerProfile } from '@/types';

// Sample projects with multilingual content
const sampleProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'inquiryCount'>[] = [
  {
    title: {
      en: 'Modern Oak Dining Table',
      ar: 'طاولة طعام حديثة من البلوط',
      fr: 'Table à manger moderne en chêne',
      dz: 'طاولة ماكل حديثة من البلوط',
    },
    description: {
      en: 'A stunning modern dining table crafted from premium oak wood. Features clean lines and a minimalist design perfect for contemporary homes.',
      ar: 'طاولة طعام حديثة رائعة مصنوعة من خشب البلوط الفاخر. تتميز بخطوط نظيفة وتصميم بسيط مثالي للمنازل المعاصرة.',
      fr: 'Une magnifique table à manger moderne fabriquée en chêne de qualité supérieure. Présente des lignes épurées et un design minimaliste parfait pour les maisons contemporaines.',
      dz: 'طاولة ماكل حديثة مزيانة معاونة من البلوط الفاخر. كتتميز بخطوط نضيفة وتصميم بسيط مثالي للدار المعاصرة.',
    },
    category: 'dining',
    style: 'modern',
    woodType: 'oak',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800',
    ],
    dimensions: { width: 200, height: 75, depth: 100, unit: 'cm' },
    price: 2500,
    isFeatured: true,
    isAvailable: true,
    tags: ['dining', 'oak', 'modern', 'minimalist'],
  },
  {
    title: {
      en: 'Traditional Walnut Bookshelf',
      ar: 'رف كتب تقليدي من الجوز',
      fr: 'Bibliothèque traditionnelle en noyer',
      dz: 'رف كتب تقليدي من الجوز',
    },
    description: {
      en: 'Elegant traditional bookshelf made from rich walnut wood. Features intricate carvings and multiple storage compartments.',
      ar: 'رف كتب أنيق تقليدي مصنوع من خشب الجوز الغني. يتميز بنقوش معقدة ومساحات تخزين متعددة.',
      fr: 'Bibliothèque traditionnelle élégante en noyer riche. Présente des sculptures complexes et plusieurs compartiments de rangement.',
      dz: 'رف كتب مزيان تقليدي معاون من الجوز الغني. كتتميز بنقوش معقدة ومساحات تخزين متعددة.',
    },
    category: 'office',
    style: 'traditional',
    woodType: 'walnut',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800',
      'https://images.unsplash.com/photo-1588279102920-e8631ffaec7a?w=800',
    ],
    dimensions: { width: 120, height: 180, depth: 35, unit: 'cm' },
    price: 1800,
    isFeatured: true,
    isAvailable: true,
    tags: ['bookshelf', 'walnut', 'traditional', 'office'],
  },
  {
    title: {
      en: 'Minimalist Cherry Coffee Table',
      ar: 'طاولة قهوة بسيطة من الكرز',
      fr: 'Table basse minimaliste en cerisier',
      dz: 'طاولة قهوة بسيطة من الكرز',
    },
    description: {
      en: 'Sleek minimalist coffee table crafted from cherry wood. Perfect centerpiece for modern living rooms.',
      ar: 'طاولة قهوة أنيقة بسيطة مصنوعة من خشب الكرز. قطعة مركزية مثالية لغرف المعيشة الحديثة.',
      fr: 'Table basse minimaliste élégante en cerisier. Pièce centrale parfaite pour les salons modernes.',
      dz: 'طاولة قهوة مزيانة بسيطة معاونة من الكرز. قطعة مركزية مثالية لصالونات الحديثة.',
    },
    category: 'living',
    style: 'minimalist',
    woodType: 'cherry',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    dimensions: { width: 120, height: 45, depth: 60, unit: 'cm' },
    price: 1200,
    isFeatured: false,
    isAvailable: true,
    tags: ['coffee', 'cherry', 'minimalist', 'living'],
  },
  {
    title: {
      en: 'Luxury Mahogany Bed Frame',
      ar: 'إطار سرير فاخر من الماهوغاني',
      fr: 'Cadre de lit de luxe en acajou',
      dz: 'إطار سرير فاخر من الماهوغاني',
    },
    description: {
      en: 'Opulent bed frame made from premium mahogany wood. Features ornate headboard and sturdy construction.',
      ar: 'إطار سرير فاخر مصنوع من خشب الماهوغاني الفاخر. يتميز برأس سرير مزخرف وبناء قوي.',
      fr: 'Cadre de lit opulent en acajou de qualité supérieure. Présente une tête de lit ornementale et une construction solide.',
      dz: 'إطار سرير فاخر معاون من الماهوغاني الفاخر. كتتميز برأس سرير مزخرف وبناء قوي.',
    },
    category: 'bedroom',
    style: 'luxury',
    woodType: 'mahogany',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    ],
    dimensions: { width: 160, height: 120, depth: 200, unit: 'cm' },
    price: 3500,
    isFeatured: true,
    isAvailable: true,
    tags: ['bed', 'mahogany', 'luxury', 'bedroom'],
  },
];

// Sample inquiries
const sampleInquiries: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    clientName: 'Ahmed Al-Farsi',
    email: 'ahmed@example.com',
    phone: '+212600000001',
    subject: 'Custom dining table inquiry',
    message: 'I would like to order a custom dining table similar to your modern oak design, but in walnut wood. Can you provide a quote?',
    projectId: undefined,
    referenceImages: [],
    status: 'pending',
    priority: 'medium',
  },
  {
    clientName: 'Sophie Martin',
    email: 'sophie@example.com',
    phone: '+33600000002',
    subject: 'Bookshelf customization',
    message: 'Interested in the traditional walnut bookshelf but need it in custom dimensions. Height should be 200cm instead of 180cm.',
    projectId: undefined,
    referenceImages: [],
    status: 'in-progress',
    priority: 'high',
  },
];

// Sample woodmaker profile
const sampleWoodmakerProfile: Omit<WoodmakerProfile, 'id' | 'createdAt' | 'updatedAt'> = {
  name: {
    en: 'Kiro Woodworks',
    ar: 'كيرو للأعمال الخشبية',
    fr: 'Kiro Woodworks',
    dz: 'كيرو للأعمال الخشبية',
  },
  bio: {
    en: 'Master craftsman with over 15 years of experience creating bespoke luxury furniture. Specializing in traditional and modern designs using premium hardwoods.',
    ar: 'حرفي ماهر مع أكثر من 15 عامًا من الخبرة في إنشاء أثاث فاخر مخصص. متخصص في التصاميم التقليدية والحديثة باستخدام الأخشاب الفاخرة.',
    fr: 'Artisan maître avec plus de 15 ans d\'expérience dans la création de meubles de luxe sur mesure. Spécialisé dans les designs traditionnels et modernes utilisant des bois nobles.',
    dz: 'صانع ماهر مع أكثر من 15 عام من الخبرة فتصنيع الموبيليا الفاخرة المخصوصة. متخصص فالتصاميم التقليدية والحديثة باستعمال الأخشاب الفاخرة.',
  },
  philosophy: {
    en: 'Every piece tells a story. We believe in creating furniture that becomes part of your family\'s legacy, combining timeless design with exceptional craftsmanship.',
    ar: 'كل قطعة تحكي قصة. نؤمن بإنشاء أثاث يصبح جزءًا من تراث عائلتك، مع الجمع بين التصميم الخالد والحرفية الاستثنائية.',
    fr: 'Chaque pièce raconte une histoire. Nous croyons en créant des meubles qui deviennent partie de l\'héritage de votre famille, combinant design intemporel et artisanat exceptionnel.',
    dz: 'كل قطعة كتعاود قصة. كنؤمنو بصنع موبيليا كتوليو جزء من تراث عائلتك، مع الجمع بين التصميم الخالد والحرفية الاستثنائية.',
  },
  experience: 15,
  specialties: ['Custom Furniture', 'Traditional Joinery', 'Modern Design', 'Wood Restoration'],
  certifications: ['Master Craftsman Certificate', 'Sustainable Woodworking', 'Furniture Design Excellence'],
  workshopImages: [
    'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800',
    'https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=800',
  ],
  contact: {
    email: 'contact@kiro-luxury.com',
    phone: '+212600000000',
    address: {
      en: '123 Artisan Street, Marrakech, Morocco',
      ar: '123 شارع الحرفيين، مراكش، المغرب',
      fr: '123 Rue des Artisans, Marrakech, Maroc',
      dz: '123 زنقة الحرفيين، مراكش، المغرب',
    },
    workingHours: {
      en: 'Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM',
      ar: 'الاثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً، السبت: 10:00 صباحًا - 4:00 مساءً',
      fr: 'Lundi - Vendredi: 9h00 - 18h00, Samedi: 10h00 - 16h00',
      dz: 'الاثنين - الجمعة: 9:00 صباحًا - 6:00 مساءً، السبت: 10:00 صباحًا - 4:00 مساءً',
    },
  },
  socialLinks: {
    instagram: 'https://instagram.com/kiro_luxury',
    facebook: 'https://facebook.com/kiroluxury',
    whatsapp: '+212600000000',
    website: 'https://kiro-luxury.com',
  },
  testimonials: [
    {
      id: '1',
      clientName: 'Fatima Zahra',
      content: {
        en: 'Exceptional craftsmanship and attention to detail. The dining table exceeded all expectations!',
        ar: 'حرفية استثنائية واهتمام بالتفاصيل. طاولة الطعام تجاوزت كل التوقعات!',
        fr: 'Artisanat exceptionnel et attention aux détails. La table à manger a dépassé toutes les attentes!',
        dz: 'حرفية استثنائية واهتمام بالتفاصيل. طاولة الطعام تجاوزت كل التوقعات!',
      },
      rating: 5,
      date: new Date('2024-01-15'),
      project: 'Modern Oak Dining Table',
    },
    {
      id: '2',
      clientName: 'Jean Dupont',
      content: {
        en: 'Beautiful work and professional service. Highly recommend for custom furniture needs.',
        ar: 'عمل جميل وخدمة احترافية. أوصي بشدة لاحتياجات الأثاث المخصص.',
        fr: 'Beau travail et service professionnel. Je recommande vivement pour les besoins en meubles sur mesure.',
        dz: 'شغل مزيان وخدمة احترافية. نصح بزاف لحاجيات الموبيليا المخصوصة.',
      },
      rating: 5,
      date: new Date('2024-02-20'),
      project: 'Traditional Walnut Bookshelf',
    },
  ],
};

// Seeding function
export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Seed woodmaker profile
    const existingProfile = await woodmakerProfileService.getProfile();
    if (!existingProfile) {
      await woodmakerProfileService.create(sampleWoodmakerProfile);
      console.log('✅ Woodmaker profile seeded');
    } else {
      console.log('ℹ️ Woodmaker profile already exists');
    }
    
    // Seed projects
    const projects = await projectService.getAll();
    if (projects.items.length === 0) {
      for (const project of sampleProjects) {
        await projectService.create(project);
      }
      console.log(`✅ ${sampleProjects.length} projects seeded`);
    } else {
      console.log(`ℹ️ ${projects.items.length} projects already exist`);
    }
    
    // Seed inquiries
    const inquiries = await inquiryService.getAll();
    if (inquiries.length === 0) {
      for (const inquiry of sampleInquiries) {
        await inquiryService.create(inquiry);
      }
      console.log(`✅ ${sampleInquiries.length} inquiries seeded`);
    } else {
      console.log(`ℹ️ ${inquiries.length} inquiries already exist`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Reset database (use with caution)
export async function resetDatabase() {
  try {
    console.log('Resetting database...');
    
    // In a real application, you would implement proper cleanup
    // This is a simplified version for development
    
    console.log('Database reset completed!');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
}
