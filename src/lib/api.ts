import axios from 'axios';
import { ApiResponse, Restaurant, MenuItem, FilterOptions, RestaurantFilters, MenuItemFilters } from '@/types';
import { buildQueryString } from './utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Restaurant API
export const restaurantApi = {
  getRestaurants: async (
    filters?: Partial<RestaurantFilters>, 
    page: number = 1, 
    limit: number = 12
  ): Promise<ApiResponse<Restaurant[]>> => {
    const queryParams = {
      ...filters,
      page,
      limit
    };
    const queryString = buildQueryString(queryParams);
    const response = await api.get(`/restaurants?${queryString}`);
    return response.data;
  },

  getRestaurantById: async (id: string): Promise<ApiResponse<Restaurant>> => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },

  getRestaurantFilters: async (): Promise<ApiResponse<FilterOptions>> => {
    const response = await api.get('/restaurants/filters');
    return response.data;
  }
};

// Menu API
export const menuApi = {
  getMenuItems: async (
    filters?: Partial<MenuItemFilters>,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<MenuItem[]>> => {
    const queryParams = {
      ...filters,
      page,
      limit
    };
    const queryString = buildQueryString(queryParams);
    const response = await api.get(`/menu?${queryString}`);
    return response.data;
  },

  getMenuItemById: async (id: string): Promise<ApiResponse<MenuItem>> => {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  },

  getMenuFilters: async (restaurantId?: string): Promise<ApiResponse<FilterOptions & { priceRange: { min: number; max: number } }>> => {
    const queryString = restaurantId ? `?restaurantId=${restaurantId}` : '';
    const response = await api.get(`/menu/filters${queryString}`);
    return response.data;
  }
};

// Health check
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  const response = await api.get('/health', { baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000' });
  return response.data;
};