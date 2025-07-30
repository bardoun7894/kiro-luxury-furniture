import { notFound } from 'next/navigation';
import { projectService } from '@/lib/firebase/collections';
import { Project } from '@/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface ProjectPageProps {
  params: {
    id: string;
    locale: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id, locale } = params;
  const t = await getTranslations('projects');
  
  const project = await projectService.getById(id);
  
  if (!project) {
    notFound();
  }

  // Increment view count
  await projectService.incrementViewCount(id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getLocalizedContent = (content: any) => {
    return content[locale] || content.en;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
            <Image
              src={project.images[0]}
              alt={getLocalizedContent(project.title)}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {project.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {project.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square relative rounded overflow-hidden">
                  <Image
                    src={image}
                    alt={`${getLocalizedContent(project.title)} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getLocalizedContent(project.title)}
          </h1>
          
          <div className="text-2xl font-bold text-amber-600 mb-4">
            {formatPrice(project.price)}
          </div>

          <p className="text-gray-600 mb-6">
            {getLocalizedContent(project.description)}
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900">Category</h3>
              <p className="text-gray-600 capitalize">{project.category}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Style</h3>
              <p className="text-gray-600 capitalize">{project.style}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Wood Type</h3>
              <p className="text-gray-600 capitalize">{project.woodType}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Dimensions</h3>
              <p className="text-gray-600">
                {project.dimensions.width} × {project.dimensions.height} × {project.dimensions.depth} {project.dimensions.unit}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900">Availability</h3>
              <p className={`${project.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {project.isAvailable ? 'Available' : 'Unavailable'}
              </p>
            </div>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors">
              {t('inquire')}
            </button>
            <button className="flex-1 border border-amber-600 text-amber-600 py-3 px-6 rounded-lg hover:bg-amber-50 transition-colors">
              {t('addToWishlist')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
