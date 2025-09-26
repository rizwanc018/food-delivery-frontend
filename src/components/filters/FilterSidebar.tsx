import React from 'react';
import { RestaurantFilters, FilterOptions } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, X, Star, MapPin, DollarSign, Utensils, Leaf } from 'lucide-react';

interface FilterSidebarProps {
  filters: Partial<RestaurantFilters>;
  filterOptions: FilterOptions | null;
  onFiltersChange: (filters: Partial<RestaurantFilters>) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({ filters, filterOptions, onFiltersChange, onClearFilters }: FilterSidebarProps) {
  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    const currentCuisines = filters.cuisine || [];
    const updatedCuisines = checked
      ? [...currentCuisines, cuisine]
      : currentCuisines.filter(c => c !== cuisine);
    
    onFiltersChange({ ...filters, cuisine: updatedCuisines });
  };

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    const currentPriceRanges = filters.priceRange || [];
    const updatedPriceRanges = checked
      ? [...currentPriceRanges, priceRange]
      : currentPriceRanges.filter(p => p !== priceRange);
    
    onFiltersChange({ ...filters, priceRange: updatedPriceRanges });
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    const currentLocations = filters.location || [];
    const updatedLocations = checked
      ? [...currentLocations, location]
      : currentLocations.filter(l => l !== location);
    
    onFiltersChange({ ...filters, location: updatedLocations });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({ ...filters, rating: value[0] });
  };

  const handleVegChange = (checked: boolean) => {
    onFiltersChange({ ...filters, isVeg: checked });
  };

  const activeFiltersCount = 
    (filters.cuisine?.length || 0) +
    (filters.priceRange?.length || 0) +
    (filters.location?.length || 0) +
    (filters.isVeg ? 1 : 0) +
    (filters.rating && filters.rating > 0 ? 1 : 0);

  return (
    <Card className="w-80 h-fit sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="h-5 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <h4 className="font-medium">Minimum Rating</h4>
          </div>
          <div className="space-y-2">
            <Slider
              value={[filters.rating || 0]}
              onValueChange={handleRatingChange}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0</span>
              <span className="font-medium">{filters.rating || 0} stars</span>
              <span>5</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Vegetarian Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            <h4 className="font-medium">Dietary</h4>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vegetarian"
              checked={filters.isVeg || false}
              onCheckedChange={handleVegChange}
            />
            <label htmlFor="vegetarian" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Vegetarian Only
            </label>
          </div>
        </div>

        <Separator />

        {/* Cuisine Filter */}
        {filterOptions?.cuisines && filterOptions.cuisines.length > 0 && (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <h4 className="font-medium">Cuisine</h4>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filterOptions.cuisines.map((cuisine) => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine}
                      checked={filters.cuisine?.includes(cuisine) || false}
                      onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                    />
                    <label htmlFor={cuisine} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {cuisine}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Price Range Filter */}
        {filterOptions?.priceRanges && filterOptions.priceRanges.length > 0 && (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <h4 className="font-medium">Price Range</h4>
              </div>
              <div className="space-y-2">
                {filterOptions.priceRanges.map((priceRange) => (
                  <div key={priceRange} className="flex items-center space-x-2">
                    <Checkbox
                      id={priceRange}
                      checked={filters.priceRange?.includes(priceRange) || false}
                      onCheckedChange={(checked) => handlePriceRangeChange(priceRange, checked as boolean)}
                    />
                    <label htmlFor={priceRange} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                      {priceRange.replace('-', ' ')}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Location Filter */}
        {filterOptions?.locations && filterOptions.locations.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <h4 className="font-medium">Location</h4>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {filterOptions.locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={filters.location?.includes(location) || false}
                    onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                  />
                  <label htmlFor={location} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}