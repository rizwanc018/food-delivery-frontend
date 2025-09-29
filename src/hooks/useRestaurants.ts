import { useState, useEffect, useCallback } from "react";
import { Restaurant, RestaurantFilters, FilterOptions, PaginationInfo } from "@/types";
import { restaurantApi } from "@/lib/api";
import { useDebounce } from "use-debounce";

interface UseRestaurantsProps {
    filters: Partial<RestaurantFilters>;
    currentPage: number;
}

interface UseRestaurantsReturn {
    restaurants: Restaurant[];
    loading: boolean;
    error: string | null;
    pagination: PaginationInfo | null;
    filterOptions: FilterOptions | null;
}

export function useRestaurants({ filters, currentPage }: UseRestaurantsProps): UseRestaurantsReturn {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);

    const [debouncedSearch] = useDebounce(filters.search, 300);

    const fetchRestaurants = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filtersToSend = {
                ...filters,
                search: debouncedSearch,
            };

            const response = await restaurantApi.getRestaurants(filtersToSend, currentPage, 12);

            setRestaurants(response.data);
            setPagination(response.pagination || null);

            if (response.filters) {
                setFilterOptions(response.filters);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch restaurants");
            console.error("Error fetching restaurants:", err);
        } finally {
            setLoading(false);
        }
    }, [filters, debouncedSearch, currentPage]);

    const fetchFilterOptions = useCallback(async () => {
        try {
            const response = await restaurantApi.getRestaurantFilters();
            setFilterOptions(response.data);
        } catch (err) {
            console.error("Error fetching filter options:", err);
        }
    }, []);

    useEffect(() => {
        fetchFilterOptions();
    }, [fetchFilterOptions]);

    useEffect(() => {
        fetchRestaurants();
    }, [fetchRestaurants]);

    return {
        restaurants,
        loading,
        error,
        pagination,
        filterOptions,
    };
}
