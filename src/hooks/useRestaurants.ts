import { useState, useEffect, useCallback } from 'react';
import { Restaurant, RestaurantFilters, FilterOptions, PaginationInfo } from '@/types';
import { restaurantApi } from '@/lib/api';
import { useDebounce } from 'use-debounce';

interface UseRestaurantsReturn {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  filterOptions: FilterOptions | null;
  filters: Partial<RestaurantFilters>;
  updateFilters: (newFilters: Partial<RestaurantFilters>) => void;
  clearFilters: () => void;
  loadPage: (page: number) => void;
}

const initialFilters: Partial<RestaurantFilters> = {
  cuisine: [],
  priceRange: [],
  rating: 0,
  deliveryTime: '',
  isVeg: false,
  location: [],
  search: '',
  sortBy: 'rating',
  sortOrder: 'desc'
};

export function useRestaurants(): UseRestaurantsReturn {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [filters, setFilters] = useState<Partial<RestaurantFilters>>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search to avoid too many API calls
  const [debouncedSearch] = useDebounce(filters.search, 300);

  const fetchRestaurants = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const filtersToSend = {
        ...filters,
        search: debouncedSearch
      };

      const response = await restaurantApi.getRestaurants(filtersToSend, page, 12);
      
      setRestaurants(response.data);
      setPagination(response.pagination || null);
      
      if (response.filters) {
        setFilterOptions(response.filters);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  const fetchFilterOptions = useCallback(async () => {
    try {
      const response = await restaurantApi.getRestaurantFilters();
      setFilterOptions(response.data);
    } catch (err) {
      console.error('Error fetching filter options:', err);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // Fetch restaurants when filters or search change
  useEffect(() => {
    setCurrentPage(1);
    fetchRestaurants(1);
  }, [fetchRestaurants]);

  const updateFilters = useCallback((newFilters: Partial<RestaurantFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const loadPage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchRestaurants(page);
  }, [fetchRestaurants]);

  return {
    restaurants,
    loading,
    error,
    pagination,
    filterOptions,
    filters,
    updateFilters,
    clearFilters,
    loadPage
  };
}