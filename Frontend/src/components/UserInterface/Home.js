import React, { useState, useEffect } from 'react';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiMapPin, 
  FiStar, 
  FiCalendar, 
  FiUsers, 
  FiDollarSign, 
  FiMail, 
  FiHeart,
  FiCheckCircle,
  FiAward,
  FiUser,
  FiMessageSquare
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const venues = [
  {
    id: 1,
    name: 'Luxury Banquet Hall',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Mumbai',
    capacity: '200-300',
    price: '₹50,000 - ₹1,00,000',
    rating: '4.5',
    reviews: '124',
    amenities: ['AC', 'Parking', 'Catering', 'Dance Floor'],
    type: 'Banquet Hall'
  },
  {
    id: 2,
    name: 'Grand Palace',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Delhi',
    capacity: '300-500',
    price: '₹1,00,000 - ₹2,50,000',
    rating: '4.8',
    reviews: '98',
    amenities: ['AC', 'Parking', 'Garden', 'Stage'],
    type: 'Palace'
  },
  {
    id: 3,
    name: 'Royal Gardens',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Bangalore',
    capacity: '150-250',
    price: '₹75,000 - ₹1,50,000',
    rating: '4.7',
    reviews: '156',
    amenities: ['Garden', 'Outdoor', 'Catering', 'Parking'],
    type: 'Garden'
  },
  {
    id: 4,
    name: 'Beachside Resort',
    image: 'https://images.unsplash.com/photo-1499793983690-29d59a6fd5cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Goa',
    capacity: '100-200',
    price: '₹1,50,000 - ₹3,00,000',
    rating: '4.9',
    reviews: '210',
    amenities: ['Beach View', 'Pool', 'Spa', 'Restaurant'],
    type: 'Resort'
  },
  {
    id: 5,
    name: 'Heritage Villa',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Jaipur',
    capacity: '100-150',
    price: '₹2,00,000 - ₹4,00,000',
    rating: '4.6',
    reviews: '87',
    amenities: ['Heritage', 'Garden', 'AC', 'Catering'],
    type: 'Villa'
  },
  {
    id: 6,
    name: 'Mountain View Resort',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    location: 'Shimla',
    capacity: '80-120',
    price: '₹1,00,000 - ₹2,50,000',
    rating: '4.8',
    reviews: '134',
    amenities: ['Mountain View', 'Heating', 'Restaurant', 'Parking'],
    type: 'Resort'
  },
];

const TestimonialCard = ({ name, role, content, avatar }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <FiUser className="text-gray-500" size={24} />
        </div>
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <div className="text-gray-700">
      <FiMessageSquare className="inline-block mr-2 text-blue-500" />
      {content}
    </div>
    <div className="flex mt-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar key={star} className="text-yellow-400 fill-current" />
      ))}
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md text-center">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const carouselItems = [
    {
      id: 1,
      title: 'Luxury Wedding Venues',
      description: 'Find the perfect venue for your special day',
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Professional spaces for your business needs',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 3,
      title: 'Birthday Parties',
      description: 'Celebrate your special moments with us',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const popularLocations = [
    { name: 'Mumbai', count: 124, image: 'https://images.unsplash.com/photo-1570166078579-bec7e0d0d9aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Delhi', count: 98, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Bangalore', count: 156, image: 'https://images.unsplash.com/photo-1529516222410-475a9b9d267d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { name: 'Goa', count: 210, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Bridegroom',
      content: 'Found the perfect venue for our wedding. The booking process was smooth and the staff was very helpful.',
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Event Planner',
      content: 'Great platform with a wide variety of venues. Saved us a lot of time in our venue hunting process.',
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'Corporate Client',
      content: 'Excellent service! The team went above and beyond to accommodate our last-minute changes.',
    },
  ];

  const features = [
    {
      id: 1,
      icon: <FiCheckCircle className="text-blue-600 text-2xl" />,
      title: 'Easy Booking',
      description: 'Simple and quick booking process for all types of events.'
    },
    {
      id: 2,
      icon: <FiAward className="text-blue-600 text-2xl" />,
      title: 'Verified Venues',
      description: 'All venues are personally verified for quality and authenticity.'
    },
    {
      id: 3,
      icon: <FiDollarSign className="text-blue-600 text-2xl" />,
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden charges.'
    },
    {
      id: 4,
      icon: <FiHeart className="text-blue-600 text-2xl" />,
      title: '24/7 Support',
      description: 'Our team is always here to help you with any queries.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <div className="relative h-96 md:h-screen/80 overflow-hidden">
        {carouselItems.map((item, index) => (
          <div 
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-4">
              <div className="text-white max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{item.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-20"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full z-20"
        >
          <FiChevronRight size={24} />
        </button>
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Search Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-6 z-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Your Perfect Venue</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Event Date"
                  className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option value="">Guest Count</option>
                  <option value="1-50">1-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-200">101-200</option>
                  <option value="201+">201+</option>
                </select>
                <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Search Venues
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {['Wedding', 'Corporate', 'Birthday', 'Conference'].map((category) => (
            <div key={category} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold">{category}</h3>
              <p className="text-sm text-gray-500 mt-1">24 Venues</p>
            </div>
          ))}
        </div>

        {/* Popular Venues */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Popular Venues</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  className="w-full h-64 object-cover" 
                  src={venue.image} 
                  alt={venue.name} 
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1" /> {venue.rating}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{venue.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <FiMapPin className="mr-1" size={14} />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <FiStar className="mr-1" size={12} />
                    {venue.rating}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-4 text-sm">
                  <div className="flex items-center">
                    <FiUsers className="text-gray-500 mr-2" />
                    <span>{venue.capacity} guests</span>
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-500 mr-2" />
                    <span>{venue.price}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We make event planning simple and stress-free</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard 
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Popular Locations */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Locations</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map((location, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden h-48 group">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold">{location.name}</h3>
                  <p className="text-white/80">{location.count} venues</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Don't just take our word for it. Here's what our clients have to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to find your perfect venue?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of happy customers who found their dream venue with us</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-xl text-gray-600 mb-8">Subscribe to our newsletter for the latest updates and offers</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PelliPandiri</h3>
              <p className="text-gray-400">Find and book the perfect venue for your special day.</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Venues</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Venue Types</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Wedding Halls</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Banquet Halls</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resorts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Gardens</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hotels</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <FiMapPin className="mr-2 mt-1 flex-shrink-0" />
                  123 Venue Street, City, Country
                </li>
                <li className="flex items-center">
                  <FiMail className="mr-2" />
                  info@pandiri.com
                </li>
                <li className="flex items-center">
                  <FiCalendar className="mr-2" />
                  Mon - Sun: 9:00 AM - 9:00 PM
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PelliPandiri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
