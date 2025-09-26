export interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  cuisine: string[];
  isVeg: boolean;
  isOpen: boolean;
  location: string;
  priceRange: string;
  menuItems?: MenuItem[];
  _count?: {
    menuItems: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  rating: number;
  prepTime: string;
  restaurantId: string;
  restaurant?: {
    name: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantFilters {
  cuisine: string[];
  priceRange: string[];
  rating: number;
  deliveryTime: string;
  isVeg: boolean;
  location: string[];
  search: string;
  sortBy: 'rating' | 'deliveryTime' | 'deliveryFee' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface MenuItemFilters {
  restaurantId: string;
  category: string[];
  isVeg: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  priceMin: number;
  priceMax: number;
  rating: number;
  search: string;
  sortBy: 'price' | 'rating' | 'name';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: PaginationInfo;
  filters?: {
    cuisines: string[];
    priceRanges: string[];
    categories: string[];
    locations: string[];
  };
}

export interface FilterOptions {
  cuisines: string[];
  priceRanges: string[];
  categories: string[];
  locations: string[];
}