'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types';
import { ProjectCard } from '@/components/projects/project-card';
import { projectService } from '@/lib/firebase/collections';
import { Loader2 } from 'lucide-react';

export function FeaturedProjects() {
  const t = useTranslations('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const featuredProjects = await projectService.getFeatured(6);
      setProjects(featuredProjects);
    } catch (error) {
      console.error('Error loading featured projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="animate-spin text-amber-600 mx-auto" size={48} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                {t('viewAll')}
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 text-lg">{t('noProjects')}</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
