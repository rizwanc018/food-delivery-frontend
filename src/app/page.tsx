/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { Suspense } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import { useURLFilters } from '@/hooks/useURLFilters';
import { SearchBar } from '@/components/filters/SearchBar';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { SortOptions } from '@/components/filters/SortOptions';
import { RestaurantGrid } from '@/components/restaurant/RestaurantGrid';
import { Pagination } from '@/components/common/Pagination';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function HomePageContent() {
  const { filters, updateFilters, clearFilters, updatePage, currentPage } = useURLFilters();
  const {
    restaurants,
    loading,
    error,
    pagination,
    filterOptions
  } = useRestaurants({ filters, currentPage });

  const handleSearchChange = (search: string) => {
    updateFilters({ ...filters, search });
  };

  const handleSortChange = (sortBy: any, sortOrder: any) => {
    updateFilters({ ...filters, sortBy, sortOrder });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}. Please make sure the backend server is running on http://localhost:5000
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <div className="bg-gray-200 text-black">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-100 bg-clip-text text-transparent border leading-24">
              Discover Amazing Food
            </h1>
            <p className="text-xl text-gray-900 max-w-2xl mx-auto">
              Filter through hundreds of restaurants and find exactly what you&apos;re craving
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar
              value={filters.search || ''}
              onChange={handleSearchChange}
              placeholder="Search restaurants, cuisines, or dishes..."
              className="text-lg "
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              filterOptions={filterOptions}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                {!loading && pagination && (
                  <p className="text-muted-foreground">
                    Found {pagination.total} restaurant{pagination.total !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              
              <SortOptions
                sortBy={filters.sortBy || 'rating'}
                sortOrder={filters.sortOrder || 'desc'}
                onSortChange={handleSortChange}
              />
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-6">
              <Card>
                <CardContent className="p-4">
                  <FilterSidebar
                    filters={filters}
                    filterOptions={filterOptions}
                    onFiltersChange={updateFilters}
                    onClearFilters={clearFilters}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Restaurant Grid */}
            <RestaurantGrid restaurants={restaurants} loading={loading} />

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8">
                <Pagination pagination={pagination} onPageChange={updatePage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50/50 flex items-center justify-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}