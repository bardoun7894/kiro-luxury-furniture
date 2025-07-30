'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Project, ProjectFilters, SearchParams } from '@/types';
import { ProjectCard } from './project-card';
import { FilterSidebar } from './filter-sidebar';
import { projectService } from '@/lib/firebase/collections';
import { Loader2 } from 'lucide-react';

interface ProjectGalleryProps {
  initialProjects?: Project[];
  showFilters?: boolean;
  limit?: number;
}

export function ProjectGallery({ initialProjects, showFilters = true, limit }: ProjectGalleryProps) {
  const t = useTranslations('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SearchParams['sortBy']>('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!initialProjects) {
      loadProjects();
    }
  }, [filters, sortBy, page]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const params: SearchParams = {
        query: searchQuery,
        filters,
        sortBy,
        page,
        limit: limit || 12,
      };

      const result = await projectService.getAll(params);
      setProjects(page === 1 ? result.items : [...projects, ...result.items]);
      setTotal(result.total);
      setHasMore(result.items.length === (limit || 12));
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleSort = (sort: SearchParams['sortBy']) => {
    setSortBy(sort);
    setPage(1);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handleWishlistToggle = (projectId: string) => {
    // This would be implemented with wishlist context
    console.log('Toggle wishlist:', projectId);
  };

  if (loading && projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-amber-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <aside className="lg:w-64">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onSort={handleSort}
              currentSort={sortBy}
              searchQuery={searchQuery}
            />
          </aside>
        )}

        {/* Projects Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('title')} ({total})
            </h2>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value as SearchParams['sortBy'])}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="newest">{t('sort.newest')}</option>
              <option value="oldest">{t('sort.oldest')}</option>
              <option value="price-low">{t('sort.priceLow')}</option>
              <option value="price-high">{t('sort.priceHigh')}</option>
              <option value="popular">{t('sort.popular')}</option>
            </select>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('noProjects')}</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onWishlistToggle={handleWishlistToggle}
                  />
                ))}
              </div>

              {hasMore && !limit && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin inline-block mr-2" size={20} />
                        {t('loading')}
                      </>
                    ) : (
                      t('loadMore')
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
