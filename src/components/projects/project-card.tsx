'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Heart, Eye } from 'lucide-react';
import { Project } from '@/types';
import { useRTL } from '@/hooks/use-rtl';

interface ProjectCardProps {
  project: Project;
  onWishlistToggle?: (projectId: string) => void;
  isWishlisted?: boolean;
}

export function ProjectCard({ project, onWishlistToggle, isWishlisted }: ProjectCardProps) {
  const t = useTranslations('projects');
  const { isRTL } = useRTL();
  const [imageError, setImageError] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle?.(project.id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Link href={`/projects/${project.id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {imageError || !project.images[0] ? (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          ) : (
            <Image
              src={project.images[0]}
              alt={project.title.en}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          )}
          
          {/* Wishlist Button */}
          {onWishlistToggle && (
            <button
              onClick={handleWishlistClick}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
            >
              <Heart
                size={20}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          )}

          {/* Featured Badge */}
          {project.isFeatured && (
            <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs font-semibold">
              {t('featured')}
            </div>
          )}

          {/* View Count */}
          <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center">
            <Eye size={12} className="mr-1" />
            {project.viewCount}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {project.title.en}
            </h3>
            <span className="text-lg font-bold text-amber-600">
              {formatPrice(project.price)}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {project.description.en}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {project.category}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {project.style}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {project.woodType}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className={`text-sm ${project.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
              {project.isAvailable ? t('available') : t('unavailable')}
            </span>
            <span className="text-xs text-gray-500">
              {project.inquiryCount} {t('inquiries')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
