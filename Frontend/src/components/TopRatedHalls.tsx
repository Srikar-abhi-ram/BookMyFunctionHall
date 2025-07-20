
import React from 'react';
import { Star, MapPin, Users, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const mockHalls = [
  {
    id: 1,
    name: "Royal Garden Palace",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    reviews: 245,
    capacity: "500-800 guests",
    price: "₹1,50,000",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
    features: ["AC Hall", "Parking", "Catering"]
  },
  {
    id: 2,
    name: "Grand Celebration Hub",
    location: "Delhi, NCR",
    rating: 4.7,
    reviews: 189,
    capacity: "300-600 guests",
    price: "₹1,25,000",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
    features: ["Decoration", "DJ", "Photography"]
  },
  {
    id: 3,
    name: "Heritage Wedding Hall",
    location: "Pune, Maharashtra",
    rating: 4.9,
    reviews: 312,
    capacity: "200-400 guests",
    price: "₹95,000",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400",
    features: ["Traditional Setup", "Garden", "Mandap"]
  }
];

export const TopRatedHalls = () => {
  const navigate = useNavigate();
  
  const handleKnowMoreClick = (hall: any) => (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/venue/${hall.id}`);
  };
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Top Rated Function Halls
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highly-rated wedding venues chosen by couples like you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockHalls.map((hall) => (
            <Card key={hall.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-rose-200">
              <div className="relative">
                <img 
                  src={hall.image} 
                  alt={hall.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{hall.rating}</span>
                  <span className="text-xs text-muted-foreground">({hall.reviews})</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{hall.name}</h3>
                
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{hall.location}</span>
                </div>

                <div className="flex items-center text-muted-foreground mb-3">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{hall.capacity}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hall.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="bg-rose-100 text-rose-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">{hall.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">onwards</span>
                  </div>
                  <Button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"  onClick={handleKnowMoreClick(hall)}>
                    
                    Know more
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-3 text-lg border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
          >
            View All Function Halls
          </Button>
        </div>
      </div>
    </section>
  );
};
