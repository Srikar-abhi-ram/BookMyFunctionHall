
import React from 'react';
import { MapPin, Phone, Mail, Sparkles } from 'lucide-react';

export const TopBar = () => {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-full p-2 mr-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Book My Function Hall
              </h1>
            </div>
          </div>
          
          {/* Centered Navigation - Hovering Rectangular Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2">
              <a 
                href="#" 
                className="text-foreground hover:text-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105 border border-transparent hover:border-border/30"
              >
                Home
              </a>
              <a 
                href="#venues" 
                className="text-foreground hover:text-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105 border border-transparent hover:border-border/30"
              >
                Venues
              </a>
              <a 
                href="#cities" 
                className="text-foreground hover:text-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105 border border-transparent hover:border-border/30"
              >
                Cities
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105 border border-transparent hover:border-border/30"
              >
                About
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary hover:bg-accent px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md hover:scale-105 border border-transparent hover:border-border/30"
              >
                Contact
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="h-4 w-4 mr-1" />
              <span>+91 9876543210</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Mail className="h-4 w-4 mr-1" />
              <span>info@bookmyfunctionhall.com</span>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-foreground hover:text-primary p-2 hover:bg-accent rounded-lg transition-all duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
