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
    <div className="min-h-screen bg-gradient-to-br from-[#F3F5F9] to-[#D5DCE7] dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Offline Booking Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Save bookings from calls, walk-ins, or manual entries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-5 w-5 text-primary" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Guest Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
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
                                className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Event Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
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
                                className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                      "rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm justify-start text-left font-normal",
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
                                <SelectTrigger className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
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
                                <SelectTrigger className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm">
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

                    {/* Payment Information */}
                    <div className="space-y-4">
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
                                className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
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
                                  <div key={method.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={method.value} id={method.value} />
                                    <Label htmlFor={method.value} className="text-sm">
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
                          <FormItem className="flex flex-row items-center justify-between rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Mark as Paid</FormLabel>
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
                              className="rounded-xl border-0 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full rounded-xl h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Saving Booking...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Save className="h-4 w-4" />
                          Save Booking
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          {showSummary && (
            <div className="lg:col-span-1">
              <Card className="backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border-0 shadow-xl sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {watchedValues.guestName && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Guest:</span>
                      <span className="text-sm font-medium">{watchedValues.guestName}</span>
                    </div>
                  )}
                  {watchedValues.eventType && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Event:</span>
                      <span className="text-sm font-medium capitalize">{watchedValues.eventType}</span>
                    </div>
                  )}
                  {watchedValues.numberOfGuests > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Guests:</span>
                      <span className="text-sm font-medium">{watchedValues.numberOfGuests}</span>
                    </div>
                  )}
                  {watchedValues.eventDate && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm font-medium">{format(watchedValues.eventDate, "PPP")}</span>
                    </div>
                  )}
                  {watchedValues.startTime && watchedValues.endTime && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Time:</span>
                      <span className="text-sm font-medium">{watchedValues.startTime} - {watchedValues.endTime}</span>
                    </div>
                  )}
                  {watchedValues.advancePayment > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Advance:</span>
                      <span className="text-sm font-medium">₹{watchedValues.advancePayment}</span>
                    </div>
                  )}
                  {watchedValues.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payment:</span>
                      <span className="text-sm font-medium capitalize">{watchedValues.paymentMethod.replace('-', ' ')}</span>
                    </div>
                  )}
                  {watchedValues.markAsPaid && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium">Marked as Paid</span>
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