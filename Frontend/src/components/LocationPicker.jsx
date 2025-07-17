
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LocationPicker = ({ onLocationSelect, initialLocation = null }) => {
  const [location, setLocation] = useState(initialLocation || { lat: null, lng: null, address: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      const defaultCenter = location.lat && location.lng 
        ? { lat: location.lat, lng: location.lng }
        : { lat: 19.0760, lng: 72.8777 }; // Mumbai default

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: defaultCenter,
      });

      const markerInstance = new window.google.maps.Marker({
        position: defaultCenter,
        map: mapInstance,
        draggable: true,
      });

      // Handle marker drag
      markerInstance.addListener('dragend', async () => {
        const position = markerInstance.getPosition();
        const lat = position.lat();
        const lng = position.lng();
        
        try {
          const address = await reverseGeocode(lat, lng);
          const newLocation = { lat, lng, address };
          setLocation(newLocation);
          onLocationSelect?.(newLocation);
        } catch (error) {
          console.error('Error getting address:', error);
        }
      });

      // Handle map click
      mapInstance.addListener('click', async (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        
        markerInstance.setPosition({ lat, lng });
        
        try {
          const address = await reverseGeocode(lat, lng);
          const newLocation = { lat, lng, address };
          setLocation(newLocation);
          onLocationSelect?.(newLocation);
        } catch (error) {
          console.error('Error getting address:', error);
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    };

    // Load Google Maps API if not already loaded
    if (window.google && window.google.maps) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  const reverseGeocode = async (lat, lng) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject('Geocoding failed');
        }
      });
    });
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          const lat = location.lat();
          const lng = location.lng();
          const address = results[0].formatted_address;
          
          const newLocation = { lat, lng, address };
          setLocation(newLocation);
          onLocationSelect?.(newLocation);
          
          // Update map
          if (map && marker) {
            map.setCenter({ lat, lng });
            marker.setPosition({ lat, lng });
          }
        }
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Search failed:', error);
      setIsLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          try {
            const address = await reverseGeocode(lat, lng);
            const newLocation = { lat, lng, address };
            setLocation(newLocation);
            onLocationSelect?.(newLocation);
            
            // Update map
            if (map && marker) {
              map.setCenter({ lat, lng });
              marker.setPosition({ lat, lng });
            }
          } catch (error) {
            console.error('Error getting address:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
            />
            <Button onClick={searchLocation} disabled={isLoading}>
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={getCurrentLocation}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          {/* Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-64 rounded-lg border"
            style={{ minHeight: '256px' }}
          />

          {/* Selected Location Display */}
          {location.address && (
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-medium">Selected Location</p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                  {location.lat && location.lng && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;
