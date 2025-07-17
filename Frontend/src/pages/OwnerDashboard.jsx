
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, Plus, Upload, MapPin, Info, Phone, 
  Star, Users, Camera, Save, ArrowLeft, Calendar,
  DollarSign, TrendingUp, Eye, MessageSquare,
  Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for dashboard
  const dashboardStats = {
    totalVenues: 3,
    totalBookings: 45,
    pendingBookings: 8,
    confirmedBookings: 32,
    cancelledBookings: 5,
    totalRevenue: 2850000,
    monthlyRevenue: 485000,
    averageRating: 4.7,
    totalReviews: 156
  };

  const recentBookings = [
    {
      id: 1,
      venueName: "Royal Garden Palace",
      customerName: "Rahul & Priya",
      eventDate: "2024-02-15",
      status: "confirmed",
      amount: 175000
    },
    {
      id: 2,
      venueName: "Grand Celebration Hub",
      customerName: "Amit & Sneha",
      eventDate: "2024-02-22",
      status: "pending",
      amount: 125000
    },
    {
      id: 3,
      venueName: "Heritage Wedding Hall",
      customerName: "Vikram & Anita",
      eventDate: "2024-03-05",
      status: "confirmed",
      amount: 95000
    }
  ];

  const venues = [
    {
      id: 1,
      name: "Royal Garden Palace",
      location: "Bandra West, Mumbai",
      status: "active",
      bookings: 18,
      rating: 4.8,
      revenue: 1250000
    },
    {
      id: 2,
      name: "Grand Celebration Hub",
      location: "Connaught Place, Delhi",
      status: "active",
      bookings: 15,
      rating: 4.7,
      revenue: 950000
    },
    {
      id: 3,
      name: "Heritage Wedding Hall",
      location: "Koregaon Park, Pune",
      status: "pending_approval",
      bookings: 12,
      rating: 4.6,
      revenue: 650000
    }
  ];

  const [venueData, setVenueData] = useState({
    name: '',
    location: '',
    description: '',
    capacity: '',
    price: '',
    phone: '',
    email: '',
    manager: '',
    images: [],
    services: []
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setVenueData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
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

  const handleSaveVenue = () => {
    // Here you would typically save to a database
    console.log('Saving venue data:', venueData);
    toast({
      title: "Success!",
      description: "Your venue has been saved successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending_approval': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!user) {
    navigate('/owner/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="flex items-center gap-2">
                <Building className="h-6 w-6 text-rose-600" />
                <h1 className="text-xl font-bold">Owner Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => navigate('/owner/onboarding')}
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Venue
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Welcome,</span>
                <span className="font-medium">{user.displayName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="venues">My Venues</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Venues</p>
                      <p className="text-2xl font-bold">{dashboardStats.totalVenues}</p>
                    </div>
                    <Building className="h-8 w-8 text-rose-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Bookings</p>
                      <p className="text-2xl font-bold">{dashboardStats.totalBookings}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(dashboardStats.monthlyRevenue)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">{dashboardStats.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-muted-foreground">{booking.venueName}</p>
                        <p className="text-sm text-muted-foreground">Event Date: {booking.eventDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(booking.amount)}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="venues" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Venues</h2>
              <Button 
                onClick={() => navigate('/owner/onboarding')}
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Venue
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <Card key={venue.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{venue.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(venue.status)}`}>
                          {venue.status.replace('_', ' ').charAt(0).toUpperCase() + venue.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {venue.location}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Bookings</p>
                          <p className="font-medium">{venue.bookings}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rating</p>
                          <p className="font-medium flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {venue.rating}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-muted-foreground text-sm">Revenue</p>
                        <p className="font-bold text-lg">{formatCurrency(venue.revenue)}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Booking Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirmed ({dashboardStats.confirmedBookings})
                </Button>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Pending ({dashboardStats.pendingBookings})
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.venueName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Event Date</p>
                            <p className="font-medium">{booking.eventDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="font-medium">{formatCurrency(booking.amount)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reports</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% from last month
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Booking Rate</p>
                      <p className="text-2xl font-bold">78%</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5% from last month
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                      <p className="text-2xl font-bold">{dashboardStats.averageRating}/5</p>
                      <p className="text-sm text-muted-foreground">Based on {dashboardStats.totalReviews} reviews</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      placeholder="Enter owner name"
                      defaultValue={user?.displayName || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerEmail">Email</Label>
                    <Input
                      id="ownerEmail"
                      type="email"
                      placeholder="Enter email"
                      defaultValue={user?.email || ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Phone</Label>
                    <Input
                      id="ownerPhone"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter business name"
                    />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
