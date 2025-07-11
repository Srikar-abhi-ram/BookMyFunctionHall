
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Loader } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi",
  "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
  "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad"
];

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('hall');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchType === 'city' && searchQuery.length > 0) {
      const filtered = indianCities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered.slice(0, 8));
      setShowCitySuggestions(true);
    } else {
      setShowCitySuggestions(false);
    }
  }, [searchQuery, searchType]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSearchQuery(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        setIsGettingLocation(false);
        console.log('User location:', latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location. Please enter manually.');
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleLocationSelect = () => {
    setSearchType('location');
    getCurrentLocation();
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'Type:', searchType);
    navigate('/venues', { state: { searchQuery, searchType } });
  };

  const handleCitySelect = (city: string) => {
    setSearchQuery(city);
    setShowCitySuggestions(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Your Perfect
          <span className="text-rose-400 block">Wedding Venue</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Discover beautiful function halls and venues for your special day
        </p>

        {/* Search Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button
              onClick={() => setSearchType('hall')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                searchType === 'hall' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <Building2 className="h-5 w-5" />
              Function Hall
            </button>
            
            <button
              onClick={handleLocationSelect}
              disabled={isGettingLocation}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                searchType === 'location' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              } ${isGettingLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isGettingLocation ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <MapPin className="h-5 w-5" />
              )}
              {isGettingLocation ? 'Getting Location...' : 'My Location'}
            </button>
            
            <button
              onClick={() => setSearchType('city')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                searchType === 'city' 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              <MapPin className="h-5 w-5" />
              City
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 relative">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder={
                  searchType === 'hall' ? 'Search for function halls...' :
                  searchType === 'location' ? 'Your location will appear here...' :
                  'Enter city name...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-2 border-border/20 focus:border-primary rounded-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                readOnly={searchType === 'location' && isGettingLocation}
              />
              
              {/* City Suggestions */}
              {showCitySuggestions && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-border/20 rounded-lg mt-1 shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="px-4 py-3 hover:bg-rose-50 cursor-pointer border-b border-border/10 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{city}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={handleSearch}
              size="lg"
              className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
            >
              Search Venues
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
