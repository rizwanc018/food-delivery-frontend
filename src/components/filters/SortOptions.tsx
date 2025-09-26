import React from 'react';
import { RestaurantFilters } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortOptionsProps {
  sortBy: RestaurantFilters['sortBy'];
  sortOrder: RestaurantFilters['sortOrder'];
  onSortChange: (sortBy: RestaurantFilters['sortBy'], sortOrder: RestaurantFilters['sortOrder']) => void;
}

export function SortOptions({ sortBy, sortOrder, onSortChange }: SortOptionsProps) {
  const handleSortChange = (value: string) => {
    const [newSortBy, newSortOrder] = value.split('-') as [RestaurantFilters['sortBy'], RestaurantFilters['sortOrder']];
    onSortChange(newSortBy, newSortOrder);
  };

  const currentValue = `${sortBy}-${sortOrder}`;

  const sortOptions = [
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'rating-asc', label: 'Rating: Low to High' },
    { value: 'deliveryTime-asc', label: 'Delivery Time: Fastest' },
    { value: 'deliveryTime-desc', label: 'Delivery Time: Slowest' },
    { value: 'deliveryFee-asc', label: 'Delivery Fee: Lowest' },
    { value: 'deliveryFee-desc', label: 'Delivery Fee: Highest' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
      <Select value={currentValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}