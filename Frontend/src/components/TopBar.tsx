import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Heart, Globe, Menu, User, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const TopBar = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const { user, logout } = authContext || { user: null, logout: () => {} };

  const handleBecomeHost = () => {
    navigate('/owner/login');
  };

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="text-xl font-bold text-rose-500">Book My Function Hall </span>


            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={handleBecomeHost}
              className="text-gray-700 hover:text-rose-600 font-medium hidden sm:inline-flex"
            >
              Become a host
            </Button>
            <div className="flex items-center space-x-2">
              <div className="flex items-center border border-gray-300 rounded-full p-1 hover:shadow-md transition-shadow duration-200">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2"
                  onClick={handleAuthAction}
                >
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>









        </div>
      </div>
    </header>
  );
};