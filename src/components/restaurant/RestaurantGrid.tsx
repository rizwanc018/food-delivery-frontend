import React from 'react';
import { Restaurant } from '@/types';
import { RestaurantCard } from './RestaurantCard';
import { Card, CardContent } from '@/components/ui/card';
import { Utensils, Search } from 'lucide-react';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
}

export function RestaurantGrid({ restaurants, loading }: RestaurantGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <CardContent className="p-4 space-y-3">
              <div className="h-6 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 bg-muted rounded w-16 animate-pulse" />
                <div className="h-6 bg-muted rounded w-16 animate-pulse" />
              </div>
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-muted rounded-full p-4 mb-4">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
        <p className="text-muted-foreground mb-4 max-w-md">
          Try adjusting your filters or search terms to find more restaurants.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Utensils className="w-5 h-5 text-muted-foreground" />
        <span className="text-muted-foreground">
          {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} found
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}