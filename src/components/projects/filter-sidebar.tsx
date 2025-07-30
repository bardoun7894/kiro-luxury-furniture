'use client';

import { useTranslations } from 'next-intl';
import { ProjectFilters, SearchParams } from '@/types';
import { ProjectCategory, FurnitureStyle, WoodType } from '@/types';

interface FilterSidebarProps {
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
  onSearch: (query: string) => void;
  onSort: (sort: SearchParams['sortBy']) => void;
  currentSort: SearchParams['sortBy'];
  searchQuery: string;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onSearch,
  onSort,
  currentSort,
  searchQuery,
}: FilterSidebarProps) {
  const t = useTranslations('projects');

  const categories: ProjectCategory[] = ['living', 'bedroom', 'dining', 'office', 'outdoor', 'custom'];
  const styles: FurnitureStyle[] = ['modern', 'traditional', 'minimalist', 'rustic', 'luxury', 'industrial'];
  const woodTypes: WoodType[] = ['oak', 'walnut', 'cherry', 'maple', 'mahogany', 'pine', 'teak'];

  const handleCategoryChange = (category: ProjectCategory) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleStyleChange = (style: FurnitureStyle) => {
    onFilterChange({
      ...filters,
      style: filters.style === style ? undefined : style,
    });
  };

  const handleWoodTypeChange = (woodType: WoodType) => {
    onFilterChange({
      ...filters,
      woodType: filters.woodType === woodType ? undefined : woodType,
    });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    onFilterChange({
      ...filters,
      priceRange: { min, max },
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{t('filters')}</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('search')}
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('categories')}</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{t(`categories.${category}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Styles */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('styles')}</h4>
        <div className="space-y-2">
          {styles.map((style) => (
            <label key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.style === style}
                onChange={() => handleStyleChange(style)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{t(`styles.${style}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Wood Types */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('woodTypes')}</h4>
        <div className="space-y-2">
          {woodTypes.map((woodType) => (
            <label key={woodType} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.woodType === woodType}
                onChange={() => handleWoodTypeChange(woodType)}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{t(`woodTypes.${woodType}`)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('priceRange')}</h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={filters.priceRange?.max || 10000}
            onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>${filters.priceRange?.max || 10000}</span>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">{t('availability')}</h4>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.isAvailable === true}
            onChange={(e) => onFilterChange({
              ...filters,
              isAvailable: e.target.checked ? true : undefined,
            })}
            className="mr-2 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700">{t('availableOnly')}</span>
        </label>
      </div>

      {/* Featured */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.isFeatured === true}
            onChange={(e) => onFilterChange({
              ...filters,
              isFeatured: e.target.checked ? true : undefined,
            })}
            className="mr-2 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-sm text-gray-700">{t('featuredOnly')}</span>
        </label>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-2 text-sm text-amber-600 border border-amber-600 rounded-md hover:bg-amber-50"
      >
        {t('clearFilters')}
      </button>
    </div>
  );
}
