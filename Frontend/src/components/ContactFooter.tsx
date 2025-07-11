
import React from 'react';
import { Phone, Mail, MapPin, Heart, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const ContactFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-rose-900 to-pink-900 text-white">
      {/* Newsletter Section */}
      <div className="py-16 px-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-white/80 mb-8 text-lg">
            Get the latest wedding venue deals and tips straight to your inbox
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
            <Button className="bg-white text-rose-900 hover:bg-white/90 font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center mb-6">
                <Heart className="h-8 w-8 text-rose-400 mr-3" />
                <h3 className="text-2xl font-bold">WeddingVenues</h3>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Making your dream wedding come true by connecting you with the perfect venues across India.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-white/60 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Browse Venues</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Wedding Planners</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Catering Services</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Photography</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Decorations</a></li>
              </ul>
            </div>

            {/* Popular Cities */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Popular Cities</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Mumbai Venues</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Delhi Venues</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Bangalore Venues</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Pune Venues</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors">Chennai Venues</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-rose-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">+91 98765 43210</p>
                    <p className="text-white/80 text-sm">Mon-Sat, 9AM-7PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-rose-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">info@weddingvenues.com</p>
                    <p className="text-white/80 text-sm">24/7 support</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-rose-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Mumbai, India</p>
                    <p className="text-white/80 text-sm">Serving pan-India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © 2024 WeddingVenues. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
