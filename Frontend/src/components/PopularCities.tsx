
import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const popularCities = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    venues: 1250,
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=300",
    popular: true
  },
  {
    name: "Delhi",
    state: "NCR",
    venues: 980,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300",
    popular: true
  },
  {
    name: "Bangalore",
    state: "Karnataka",
    venues: 750,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300",
    popular: true
  },
  {
    name: "Pune",
    state: "Maharashtra",
    venues: 680,
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=300",
    popular: false
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    venues: 620,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300",
    popular: false
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    venues: 590,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300",
    popular: false
  }
];

export const PopularCities = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-rose-50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Popular Cities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore wedding venues in India's most popular cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCities.map((city) => (
            <Card 
              key={city.name} 
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-rose-200 hover:-translate-y-1"
            >
              <div className="relative">
                <img 
                  src={city.image} 
                  alt={city.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {city.popular && (
                  <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </div>
                )}

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                  <div className="flex items-center text-white/80 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {city.state}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/90">
                      {city.venues}+ venues
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Can't find your city? We cover venues across India
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Jaipur", "Kolkata", "Ahmedabad", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore"].map((city) => (
              <span 
                key={city}
                className="bg-white border border-border rounded-full px-4 py-2 text-sm hover:bg-rose-50 hover:border-rose-200 cursor-pointer transition-colors"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
