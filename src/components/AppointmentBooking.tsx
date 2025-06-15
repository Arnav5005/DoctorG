
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentBookingProps {
  onBack: () => void;
}

export const AppointmentBooking = ({ onBack }: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [symptoms, setSymptoms] = useState("");
  const [step, setStep] = useState<'schedule' | 'payment' | 'confirmation'>('schedule');
  const { toast } = useToast();

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleScheduleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Both date and time slot are required",
        variant: "destructive"
      });
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    // Simulate Razorpay payment
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your payment",
    });
    
    setTimeout(() => {
      setStep('confirmation');
      toast({
        title: "Payment Successful! 🎉",
        description: "Your appointment has been booked",
      });
    }, 2000);
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment with Dr. Sarah Johnson is confirmed for {selectedDate?.toDateString()} at {selectedTime}
            </p>
            <div className="space-y-3">
              <Button onClick={onBack} className="w-full">
                Back to Dashboard
              </Button>
              <Button variant="outline" className="w-full">
                Add to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <header className="bg-white border-b border-green-100 px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => setStep('schedule')} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Details
              </CardTitle>
              <CardDescription>Complete your payment to confirm the appointment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Appointment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Doctor:</span>
                    <span>Dr. Sarah Johnson</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate?.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Consultation Fee:</span>
                    <span>₹500</span>
                  </div>
                </div>
              </div>

              {/* Razorpay Payment Simulation */}
              <div className="border-2 border-dashed border-blue-200 p-6 rounded-lg text-center">
                <div className="text-blue-600 font-semibold mb-2">Razorpay Payment Gateway</div>
                <p className="text-sm text-gray-600 mb-4">In a real implementation, Razorpay checkout would load here</p>
                <Button onClick={handlePayment} className="bg-blue-600 hover:bg-blue-700">
                  Pay ₹500 with Razorpay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-green-100 px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
            <p className="text-gray-600">Schedule with Dr. Sarah Johnson</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Doctor Info */}
          <Card>
            <CardHeader>
              <CardTitle>Doctor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SJ</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600">Cardiologist</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-1 text-sm">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Experience:</strong> 15 years</p>
                <p><strong>Specialization:</strong> Cardiology, Heart Disease</p>
                <p><strong>Consultation Fee:</strong> ₹500</p>
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calendar */}
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="rounded-md border"
                />
              </div>

              {/* Time Slots */}
              <div>
                <h4 className="font-semibold mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTime(time)}
                      className={selectedTime === time ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Symptoms */}
              <div>
                <h4 className="font-semibold mb-2">Describe your symptoms (Optional)</h4>
                <Textarea
                  placeholder="Please describe your symptoms or reason for consultation..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <Button 
                onClick={handleScheduleConfirm}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
