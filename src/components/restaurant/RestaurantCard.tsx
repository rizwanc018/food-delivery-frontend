import Link from 'next/link';
import { Restaurant } from '@/types';
import { Card, CardContent,  } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Truck,  Leaf } from 'lucide-react';
import { formatPrice, formatRating, getPriceRangeColor, getCuisineColor } from '@/lib/utils';
import Image from 'next/image';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 py-0 h-full">
        <div className="relative">
          <Image
          width={192}
          height={192}
            src={restaurant.image}
            alt={restaurant.name}
            className="h-48 w-full object-cover transition-transform duration-300 "
          />
          {!restaurant.isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-white">Closed</Badge>
            </div>
          )}
          {restaurant.isVeg && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-500 hover:bg-green-600">
                <Leaf className="w-3 h-3 mr-1" />
                Veg
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{formatRating(restaurant.rating)}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {restaurant.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {restaurant.cuisine.slice(0, 3).map((cuisine) => (
                <Badge key={cuisine} variant="outline" className={getCuisineColor(cuisine)}>
                  {cuisine}
                </Badge>
              ))}
              {restaurant.cuisine.length > 3 && (
                <Badge variant="outline" className="text-muted-foreground">
                  +{restaurant.cuisine.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>{formatPrice(restaurant.deliveryFee)}</span>
                </div>
              </div>
              
              <Badge className={getPriceRangeColor(restaurant.priceRange)}>
                {restaurant.priceRange}
              </Badge>
            </div>

            {/* <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>Min {formatPrice(restaurant.minOrder)}</span>
              </div>
              
              {restaurant._count && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Utensils className="w-4 h-4" />
                  <span>{restaurant._count.menuItems} items</span>
                </div>
              )}
            </div> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}