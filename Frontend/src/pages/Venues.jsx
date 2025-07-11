import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { VenueCard } from '@/components/VenueCard';
import { MapPin, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const mockVenues = [
  {
    id: 1,
    name: "Royal Garden Palace",
    location: "Bandra West, Mumbai",
    distance: "2.5 km",
    rating: 4.8,
    reviews: 245,
    price: "₹1,50,000",
    capacity: "500-800 guests",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400"
    ],
    features: ["AC Hall", "Parking", "Catering", "Decoration"]
  },
  {
    id: 2,
    name: "Grand Celebration Hub",
    location: "Connaught Place, Delhi",
    distance: "3.2 km",
    rating: 4.7,
    reviews: 189,
    price: "₹1,25,000",
    capacity: "300-600 guests",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
    ],
    features: ["DJ", "Photography", "Catering", "Decoration"]
  },
  {
    id: 3,
    name: "Heritage Wedding Hall",
    location: "Koregaon Park, Pune",
    distance: "1.8 km",
    rating: 4.9,
    reviews: 312,
    price: "₹95,000",
    capacity: "200-400 guests",
    images: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400"
    ],
    features: ["Traditional Setup", "Garden", "Mandap", "Catering"]
  },
  {
    id: 4,
    name: "Majestic Banquet Hall",
    location: "Jubilee Hills, Hyderabad",
    distance: "4.1 km",
    rating: 4.6,
    reviews: 156,
    price: "₹1,80,000",
    capacity: "600-1000 guests",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400"
    ],
    features: ["Valet Parking", "AC Hall", "Stage", "Catering"]
  }
];

const Venues = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, searchType } = location.state || {};
  const [venues, setVenues] = useState(mockVenues);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    // Filter venues based on search query
    if (searchQuery) {
      const filtered = mockVenues.filter(venue =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVenues(filtered);
    }
  }, [searchQuery]);

  const handleSort = (value) => {
    setSortBy(value);
    let sortedVenues = [...venues];
    
    switch (value) {
      case 'price-low':
        sortedVenues.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, '')));
        break;
      case 'price-high':
        sortedVenues.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, '')));
        break;
      case 'rating':
        sortedVenues.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        sortedVenues.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        break;
      default:
        break;
    }
    
    setVenues(sortedVenues);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Function Halls {searchQuery && `in ${searchQuery}`}
          </h1>
          <p className="text-muted-foreground">
            {venues.length} venues found
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm border">
          <div className="flex-1">
            <Input
              placeholder="Filter by name or location..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues
            .filter(venue => 
              venue.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
              venue.location.toLowerCase().includes(filterQuery.toLowerCase())
            )
            .map((venue) => (
              <VenueCard 
                key={venue.id} 
                venue={venue}
                onClick={() => navigate(`/venue/${venue.id}`)}
              />
            ))}
        </div>

        {venues.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No venues found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Venues;
