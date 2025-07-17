
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '@/components/TopBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from '../contexts/AuthContext';
import { 
  Star, MapPin, Users, Phone, Mail, Navigation, 
  Flower, Music, UtensilsCrossed, Sparkles, Crown, 
  Palette, Heart, ArrowLeft, Share, Bookmark
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
  },
  2: {
    id: 2,
    name: "Grand Celebration Hub",
    location: "Connaught Place, Delhi",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    rating: 4.7,
    reviews: 189,
    price: "₹1,25,000",
    capacity: "300-600 guests",
    description: "Grand Celebration Hub is a premier venue located in the heart of Delhi. With state-of-the-art facilities and elegant interiors, it provides the perfect setting for your special celebrations.",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"
    ],
    nearbyPlaces: [
      { name: "Connaught Place Metro", distance: "0.5 km" },
      { name: "India Gate", distance: "2.1 km" },
      { name: "Red Fort", distance: "3.5 km" }
    ],
    services: [
      { name: "DJ Services", icon: Music, available: true },
      { name: "Food Catering", icon: UtensilsCrossed, available: true },
      { name: "Flower Decoration", icon: Flower, available: true }
    ],
    contact: {
      phone: "+91 9876543211",
      email: "contact@grandcelebrationhub.com",
      manager: "Priya Sharma"
    }
  },
  3: {
    id: 3,
    name: "Heritage Wedding Hall",
    location: "Koregaon Park, Pune",
    coordinates: { lat: 18.5196, lng: 73.8553 },
    rating: 4.9,
    reviews: 312,
    price: "₹95,000",
    capacity: "200-400 guests",
    description: "Heritage Wedding Hall combines traditional architecture with modern amenities, creating a perfect venue for intimate celebrations in Pune.",
    images: [
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ],
    nearbyPlaces: [
      { name: "Pune Railway Station", distance: "8.2 km" },
      { name: "Koregaon Park", distance: "0.5 km" },
      { name: "Phoenix Mall", distance: "1.2 km" }
    ],
    services: [
      { name: "Traditional Setup", icon: Crown, available: true },
      { name: "Food Catering", icon: UtensilsCrossed, available: true },
      { name: "Mandap Decoration", icon: Palette, available: true }
    ],
    contact: {
      phone: "+91 9876543212",
      email: "contact@heritageweddinghall.com",
      manager: "Amit Patel"
    }
  },
  4: {
    id: 4,
    name: "Majestic Banquet Hall",
    location: "Jubilee Hills, Hyderabad",
    coordinates: { lat: 17.4065, lng: 78.4772 },
    rating: 4.6,
    reviews: 156,
    price: "₹1,80,000",
    capacity: "600-1000 guests",
    description: "Majestic Banquet Hall is a luxurious venue perfect for grand celebrations with world-class amenities and exceptional service.",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800"
    ],
    nearbyPlaces: [
      { name: "Hyderabad Airport", distance: "25 km" },
      { name: "Jubilee Hills", distance: "0.5 km" },
      { name: "Banjara Hills", distance: "3.2 km" }
    ],
    services: [
      { name: "Valet Parking", icon: Heart, available: true },
      { name: "Food Catering", icon: UtensilsCrossed, available: true },
      { name: "DJ Services", icon: Music, available: true }
    ],
    contact: {
      phone: "+91 9876543213",
      email: "contact@majesticbanquethall.com",
      manager: "Rajesh Kumar"
    }
  }
};

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();
  const { user } = authContext || { user: null };
  
  const venueId = parseInt(id);
  const venue = mockVenueDetails[venueId];
  const [isLiked, setIsLiked] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    console.log('Booking venue:', venue.name);
  };

  const handleContactUs = () => {
    if (!user) {
      navigate('/login');
      return;
    }
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

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-primary">{venue.name}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                Save
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-semibold">{venue.rating}</span>
              <span className="text-muted-foreground ml-1">({venue.reviews} reviews)</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{venue.location}</span>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {venue.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img 
                      src={image} 
                      alt={`${venue.name} ${index + 1}`}
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About this venue</h2>
              <p className="text-muted-foreground leading-relaxed">{venue.description}</p>
            </div>

            {/* Capacity & Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Venue Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-rose-600" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-muted-foreground">{venue.capacity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Services Offered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {venue.services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="p-2 rounded-full bg-rose-100">
                      <service.icon className="h-4 w-4 text-rose-600" />
                    </div>
                    <span className="font-medium text-sm">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Nearby Places</h2>
              <div className="space-y-3">
                {venue.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                    <span className="font-medium">{place.name}</span>
                    <span className="text-muted-foreground">{place.distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {venue.price} <span className="text-sm font-normal text-muted-foreground">onwards</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-muted-foreground ml-1">({venue.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-rose-600 text-rose-600 hover:bg-rose-50"
                    onClick={handleContactUs}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Venue
                  </Button>
                </div>

                {/* Contact Information */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-rose-600 mr-2" />
                      <span>{venue.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-rose-600 mr-2" />
                      <span>{venue.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-rose-600 mr-2" />
                      <span>{venue.contact.manager}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
