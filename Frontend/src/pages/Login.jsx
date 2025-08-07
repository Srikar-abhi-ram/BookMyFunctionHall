import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { signInWithGoogle } from '../firebase/config';
import { useToast } from '@/hooks/use-toast';
import { Chrome, ArrowLeft, Building } from 'lucide-react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const OwnerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Success!",
        description: "You have been signed in successfully."
      });
      navigate('/owner/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Success!",
        description: "You have been signed in successfully."
      });
      navigate('/owner/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="w-fit mb-4 hover:bg-accent/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Building className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold  from-primary via-primary to-primary bg-clip-text text-transparent">
            Venue Owner Portal
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your venue and reach thousands of customers
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email </Label>
              <div className="relative">
               
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">
                {/* Remember me checkbox could go here */}
              </div>
              <Link 
                to="#" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-12 border-border/50 hover:bg-accent/50 transition-all duration-200"
          >
            <Chrome className="h-5 w-5 mr-2" />
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link 
              to="/owner/signup" 
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </Link>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{' '}
            <span className="text-primary cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-primary cursor-pointer">Privacy Policy</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerLogin;