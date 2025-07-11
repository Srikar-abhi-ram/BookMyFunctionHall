
import React, { useState } from 'react';
import { Star, MapPin, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Venue {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  price: string;
  capacity: string;
  images: string[];
  features: string[];
}

interface VenueCardProps {
  venue: Venue;
  onClick: () => void;
}

export const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === venue.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? venue.images.length - 1 : prev - 1
    );
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="relative">
        {/* Image Carousel */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={venue.images[currentImageIndex]} 
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Navigation Arrows */}
          {venue.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {venue.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {venue.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={toggleLike}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <Heart 
              className={`h-4 w-4 ${
                isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-600'
              }`} 
            />
          </button>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-xs">{venue.rating}</span>
          </div>
        </div>
        
        <CardContent className="p-4" onClick={onClick}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-primary line-clamp-1">{venue.name}</h3>
            <div className="text-right">
              <span className="text-lg font-bold text-primary">{venue.price}</span>
              <span className="text-xs text-muted-foreground block">onwards</span>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm line-clamp-1">{venue.location}</span>
            <span className="text-sm ml-2 text-rose-600">• {venue.distance}</span>
          </div>

          <div className="flex items-center text-muted-foreground mb-3">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{venue.capacity}</span>
            <span className="text-sm ml-auto text-muted-foreground">
              ({venue.reviews} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {venue.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
            {venue.features.length > 3 && (
              <span className="text-xs text-muted-foreground py-1">
                +{venue.features.length - 3} more
              </span>
            )}
          </div>

          <Button 
            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Know More
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
