
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import LocationPicker from '@/components/LocationPicker';
import { 
  Building, Upload, MapPin, Info, Phone, Star, 
  Camera, Save, ArrowLeft, ArrowRight, Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  { id: 1, title: 'Basic Information', icon: Info },
  { id: 2, title: 'Location & Contact', icon: MapPin },
  { id: 3, title: 'Upload Images', icon: Camera },
  { id: 4, title: 'Services & Pricing', icon: Star },
  { id: 5, title: 'Review & Submit', icon: Check }
];

const OwnerOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [venueData, setVenueData] = useState({
    name: '',
    description: '',
    capacity: '',
    location: '',
    coordinates: { lat: null, lng: null },
    phone: '',
    email: '',
    manager: '',
    price: '',
    images: [],
    services: []
  });

  const handleInputChange = (field, value) => {
    setVenueData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLocationSelect = (locationData) => {
    setVenueData(prev => ({
      ...prev,
      location: locationData.address,
      coordinates: { lat: locationData.lat, lng: locationData.lng }
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting venue data:', venueData);
    toast({
      title: "Success!",
      description: "Your venue has been submitted for review. We'll contact you soon!"
    });
    navigate('/owner/dashboard');
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVenueData(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;
  const currentStepData = STEPS[currentStep - 1];
  const CurrentStepIcon = currentStepData.icon;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Venue Name *</Label>
              <Input
                id="name"
                placeholder="Enter your venue name"
                value={venueData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Guest Capacity *</Label>
              <Input
                id="capacity"
                placeholder="e.g., 500-800 guests"
                value={venueData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">About Your Venue *</Label>
              <Textarea
                id="description"
                placeholder="Describe your venue, its features, and what makes it special..."
                rows={4}
                value={venueData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Venue Location *</Label>
              <LocationPicker 
                onLocationSelect={handleLocationSelect}
                initialLocation={venueData.coordinates.lat ? {
                  lat: venueData.coordinates.lat,
                  lng: venueData.coordinates.lng,
                  address: venueData.location
                } : null}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Number *</Label>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  value={venueData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="venue@example.com"
                  value={venueData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="manager">Manager/Contact Person *</Label>
              <Input
                id="manager"
                placeholder="Enter manager name"
                value={venueData.manager}
                onChange={(e) => handleInputChange('manager', e.target.value)}
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Upload high-quality images of your venue</p>
              <p className="text-sm text-gray-500 mb-4">Add at least 5 images (JPG, PNG - Max 5MB each)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('image-upload').click()}
              >
                Choose Images
              </Button>
            </div>
            
            {venueData.images.length > 0 && (
              <div>
                <h4 className="font-medium mb-3">Uploaded Images ({venueData.images.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venueData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Venue ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price">Starting Price *</Label>
              <Input
                id="price"
                placeholder="e.g., ₹1,50,000"
                value={venueData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
              <p className="text-sm text-gray-500">Enter your base package price</p>
            </div>
            
            <div>
              <Label className="text-base font-medium mb-4 block">Services Available *</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Flower Decoration', 'DJ Services', 'Food Catering', 
                  'Crackers & Fireworks', 'Photography', 'Videography',
                  'Mandap Decoration', 'Mehendi Specialist', 'Valet Parking', 
                  'AC Hall', 'Stage Setup', 'Generator Backup'
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={service}
                      className="rounded"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setVenueData(prev => ({
                            ...prev,
                            services: [...prev.services, service]
                          }));
                        } else {
                          setVenueData(prev => ({
                            ...prev,
                            services: prev.services.filter(s => s !== service)
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={service} className="text-sm">{service}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Venue Details</h3>
            
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Basic Information</h4>
                <p><strong>Name:</strong> {venueData.name}</p>
                <p><strong>Capacity:</strong> {venueData.capacity}</p>
                <p><strong>Price:</strong> {venueData.price}</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Contact Details</h4>
                <p><strong>Location:</strong> {venueData.location}</p>
                <p><strong>Phone:</strong> {venueData.phone}</p>
                <p><strong>Email:</strong> {venueData.email}</p>
                <p><strong>Manager:</strong> {venueData.manager}</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Images & Services</h4>
                <p><strong>Images:</strong> {venueData.images.length} uploaded</p>
                <p><strong>Services:</strong> {venueData.services.length} selected</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/owner/login')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-rose-600" />
              <h1 className="text-xl font-bold">Venue Registration</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={step.id}
                  className={`flex items-center ${
                    step.id <= currentStep ? 'text-rose-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    step.id <= currentStep ? 'bg-rose-100' : 'bg-gray-100'
                  }`}>
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden md:block">{step.title}</span>
                </div>
              );
            })}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CurrentStepIcon className="h-5 w-5" />
              {currentStepData.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === STEPS.length ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Submit for Review
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerOnboarding;
