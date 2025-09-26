/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function getPriceRangeColor(priceRange: string): string {
  switch (priceRange) {
    case 'budget':
      return 'bg-green-100 text-green-800';
    case 'mid-range':
      return 'bg-yellow-100 text-yellow-800';
    case 'premium':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getCuisineColor(cuisine: string): string {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
    'bg-cyan-100 text-cyan-800',
    'bg-teal-100 text-teal-800',
    'bg-lime-100 text-lime-800',
    'bg-orange-100 text-orange-800'
  ];
  
  // Simple hash function to consistently assign colors
  let hash = 0;
  for (let i = 0; i < cuisine.length; i++) {
    hash = cuisine.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
}