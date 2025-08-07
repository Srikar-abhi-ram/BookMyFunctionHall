import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import OwnerSignup from "./pages/Signup";
import OwnerLogin from "./pages/Login";
import OwnerOnboarding from "./pages/OwnerOnboarding";
import OwnerDashboard from "./pages/OwnerDashboard";
import NotFound from "./pages/NotFound";
import OfflineBookingForm from "./components/OfflineBookingForm";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/venues" element={<Venues />} />
              <Route path="/venue/:id" element={<VenueDetails />} />
              <Route path="/owner/login" element={<OwnerLogin />} />
              <Route path="/owner/signup" element={<OwnerSignup />} />
              <Route path="/owner/onboarding" element={<OwnerOnboarding />} />
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route path ="/owner/booking" element={<OfflineBookingForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
