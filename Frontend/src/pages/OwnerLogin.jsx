
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signInWithGoogle } from '../firebase/config';
import { useToast } from '@/hooks/use-toast';
import { Chrome, ArrowLeft, Building } from 'lucide-react';

const OwnerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You have been signed in successfully."
      });
      // Redirect to onboarding for new owners
      navigate('/owner/onboarding');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="w-fit mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="mx-auto mb-4 p-3 bg-rose-100 rounded-full w-fit">
            <Building className="h-8 w-8 text-rose-600" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Venue Owner Portal
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Sign in to list your function hall and reach thousands of customers
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            New to our platform? Sign up and get your venue listed in minutes!
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerLogin;
