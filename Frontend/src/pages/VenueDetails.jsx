
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { 
  Star, MapPin, Users, Phone, Mail, Navigation, 
  Flower, Music, UtensilsCrossed, Sparkles, Crown, 
  Palette, Heart, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';

const mockVenueDetails = {
  1: {
    id: 1,
    name: "Royal Garden Palace",
    location: "Bandra West, Mumbai, Maharashtra",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    rating: 4.8,
    reviews: 245,
    price: "₹1,50,000",
    capacity: "500-800 guests",
    description: "Royal Garden Palace is a magnificent wedding venue that combines traditional elegance with modern amenities. Set in the heart of Mumbai, this venue offers a perfect blend of luxury and convenience for your special day. With its stunning architecture, lush gardens, and world-class facilities, it creates an unforgettable experience for you and your guests.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800"
    ],
    nearbyPlaces: [
      { name: "Bandra Railway Station", distance: "1.2 km" },
      { name: "Linking Road", distance: "800 m" },
      { name: "Bandstand Promenade", distance: "2.1 km" },
      { name: "Mumbai Airport", distance: "8.5 km" }
    ],
    services: [
      { name: "Flower Decoration", icon: Flower, available: true },
      { name: "DJ Services", icon: Music, available: true },
      { name: "Food Catering", icon: UtensilsCrossed, available: true },
      { name: "Crackers & Fireworks", icon: Sparkles, available: true },
      { name: "One Gram Jewelry Rent", icon: Crown, available: true },
      { name: "Mandap Decoration", icon: Palette, available: true },
      { name: "Mehendi Specialist", icon: Heart, available: true }
    ],
    contact: {
      phone: "+91 9876543210",
      email: "contact@royalgardenpalace.com",
      manager: "Rajesh Kumar"
    }
  }
};

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const venueId = parseInt(id);
  const venue = mockVenueDetails[venueId];

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Handle booking logic here
    console.log('Booking venue:', venue.name);
  };

  const handleContactUs = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Handle contact logic here
    console.log('Contacting venue:', venue.name);
  };

  if (!venue) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-muted-foreground">Venue not found</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (!venue || !Array.isArray(venue.images) || venue.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === venue.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    if (!venue || !Array.isArray(venue.images) || venue.images.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? venue.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img 
                src={venue.images[currentImageIndex]} 
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {venue.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {venue.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-20 rounded-lg overflow-hidden ${
                    index === currentImageIndex ? 'ring-2 ring-rose-500' : ''
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${venue.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Venue Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-white/90 rounded-full px-3 py-1 flex items-center gap-1 border">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{venue.rating}</span>
                  <span className="text-muted-foreground">({venue.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-primary mb-2">{venue.name}</h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{venue.location}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="font-medium">{venue.capacity}</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {venue.price} <span className="text-sm font-normal text-muted-foreground">onwards</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">About this venue</h3>
                <p className="text-muted-foreground leading-relaxed">{venue.description}</p>
              </CardContent>
            </Card>

            {/* Nearby Places */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Navigation className="h-5 w-5 mr-2" />
                  Nearby Places
                </h3>
                <div className="space-y-2">
                  {venue.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-muted-foreground">{place.name}</span>
                      <span className="font-medium">{place.distance}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1 border-rose-600 text-rose-600 hover:bg-rose-50"
                onClick={handleContactUs}
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6">Services Offered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {venue.services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="p-2 rounded-full bg-rose-100">
                    <service.icon className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <span className="font-medium">{service.name}</span>
                    {service.available && (
                      <span className="text-xs text-green-600 block">Available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">{venue.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">{venue.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-rose-600" />
                <div>
                  <p className="font-medium">Manager</p>
                  <p className="text-muted-foreground">{venue.contact.manager}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VenueDetails;
