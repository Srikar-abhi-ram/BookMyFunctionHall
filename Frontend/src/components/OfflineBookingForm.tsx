import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Clock, User, Phone, Users, CreditCard, FileText, Save, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const bookingSchema = z.object({
  guestName: z.string().min(2, 'Guest name must be at least 2 characters'),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits'),
  eventType: z.string().min(1, 'Please select an event type'),
  numberOfGuests: z.number().min(1, 'Number of guests must be at least 1'),
  eventDate: z.date({ required_error: 'Please select an event date' }),
  startTime: z.string().min(1, 'Please select start time'),
  endTime: z.string().min(1, 'Please select end time'),
  advancePayment: z.number().min(0, 'Advance payment cannot be negative'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  notes: z.string().optional(),
  markAsPaid: z.boolean().default(false),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const OfflineBookingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName: '',
      contactNumber: '',
      eventType: '',
      numberOfGuests: 50,
      advancePayment: 0,
      paymentMethod: '',
      notes: '',
      markAsPaid: false,
      startTime: '',
      endTime: '',
    },
  });

  const watchedValues = form.watch();

  const onSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Booking saved:', data);
    
    toast({
      title: "Booking Saved Successfully! 🎉",
      description: `${data.guestName}'s ${data.eventType} booking has been saved.`,
    });
    
    setIsLoading(false);
    form.reset();
    setShowSummary(false);
  };

  const eventTypes = [
    'Wedding',
    'Reception',
    'Party',
    'Corporate',
    'Other'
  ];

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'upi', label: 'UPI' },
    { value: 'card', label: 'Card' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Offline Booking Manager
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Effortlessly manage bookings from calls, walk-ins, and manual entries with our intuitive booking system
          </p>
        </div>

        <div className="gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="card-wedding border-0 shadow-elegant">
              <CardHeader className="pb-8 border-b border-border/50">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
                  <div className="p-2 rounded-xl wedding-gradient">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  Booking Details
                </CardTitle>
                <p className="text-muted-foreground mt-2" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>Fill in the details for your offline booking</p>
              </CardHeader>
              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Guest Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">Guest Information</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="guestName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Guest Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter guest name"
                                className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]"
                                onChange={(e) => {
                                  field.onChange(e);
                                  setShowSummary(true);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              Contact Number
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Enter contact number"
                                className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                    </div>

                    {/* Event Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">Event Information</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]">
                                    <SelectValue placeholder="Select event type" />
                                  </SelectTrigger>
                                </FormControl>
                              <SelectContent>
                                {eventTypes.map((type) => (
                                  <SelectItem key={type} value={type.toLowerCase()}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfGuests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Number of Guests
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                placeholder="Enter number of guests"
                                className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">Date & Time</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Event Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm justify-start text-left font-normal transition-all hover:shadow-wedding hover:scale-[1.02]",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]">
                                  <SelectValue placeholder="Start time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]">
                                  <SelectValue placeholder="End time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timeSlots.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">Payment Details</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      </div>
                      <FormField
                        control={form.control}
                        name="advancePayment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4" />
                              Advance Payment (₹)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                placeholder="Enter advance payment amount"
                                className="h-12 rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm transition-all focus:shadow-wedding focus:scale-[1.02]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                              >
                                {paymentMethods.map((method) => (
                                  <div key={method.value} className="flex items-center space-x-3 p-4 rounded-2xl bg-card/50 border border-border/50 hover:shadow-wedding hover:scale-[1.02] transition-all cursor-pointer">
                                    <RadioGroupItem value={method.value} id={method.value} className="border-2" />
                                    <Label htmlFor={method.value} className="text-sm font-medium cursor-pointer">
                                      {method.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="markAsPaid"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 hover:shadow-wedding transition-all">
                            <div className="space-y-1">
                              <FormLabel className="text-base font-semibold">Mark as Paid</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Toggle if payment is completed
                              </div>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Notes */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                        <h3 className="text-lg font-semibold text-foreground">Additional Details</h3>
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                      </div>
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Notes & Requirements
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field}
                              placeholder="Enter any special requirements or notes..."
                              className="rounded-2xl border-0 bg-card/80 backdrop-blur-sm shadow-sm min-h-[120px] transition-all focus:shadow-wedding focus:scale-[1.02] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full rounded-2xl h-14 text-lg font-semibold wedding-gradient hover:shadow-elegant hover:scale-[1.02] transition-all duration-300 text-white border-0"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Saving Booking...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-3">
                            <Save className="h-5 w-5" />
                            Save Booking
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          {showSummary && (
            <div className="lg:col-span-1">
              <Card className="card-wedding border-0 shadow-elegant sticky top-6">
                <CardHeader className="border-b border-border/50">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <div className="p-2 rounded-xl wedding-gradient">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {watchedValues.guestName && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Guest Name</span>
                      <span className="text-sm font-bold">{watchedValues.guestName}</span>
                    </div>
                  )}
                  {watchedValues.eventType && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Event Type</span>
                      <span className="text-sm font-bold capitalize">{watchedValues.eventType}</span>
                    </div>
                  )}
                  {watchedValues.numberOfGuests > 0 && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Guests</span>
                      <span className="text-sm font-bold">{watchedValues.numberOfGuests}</span>
                    </div>
                  )}
                  {watchedValues.eventDate && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Event Date</span>
                      <span className="text-sm font-bold">{format(watchedValues.eventDate, "PPP")}</span>
                    </div>
                  )}
                  {watchedValues.startTime && watchedValues.endTime && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Time Slot</span>
                      <span className="text-sm font-bold">{watchedValues.startTime} - {watchedValues.endTime}</span>
                    </div>
                  )}
                  {watchedValues.advancePayment > 0 && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-accent/20">
                      <span className="text-sm font-medium text-muted-foreground">Advance Payment</span>
                      <span className="text-sm font-bold text-primary">₹{watchedValues.advancePayment}</span>
                    </div>
                  )}
                  {watchedValues.paymentMethod && (
                    <div className="flex justify-between items-center p-3 rounded-xl bg-secondary/30">
                      <span className="text-sm font-medium text-muted-foreground">Payment Method</span>
                      <span className="text-sm font-bold capitalize">{watchedValues.paymentMethod.replace('-', ' ')}</span>
                    </div>
                  )}
                  {watchedValues.markAsPaid && (
                    <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-bold">Payment Completed</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineBookingForm;