import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Video, Star, ArrowLeft, Stethoscope, Heart, Brain, Eye, Clock, Filter, Truck, Activity } from "lucide-react";
import { UserProfileMenu } from "./UserProfileMenu";
import { useI18n } from "@/contexts/I18nContext";
import { useState } from "react";
import { MedicineDelivery } from "./MedicineDelivery";
import { HealthTracker } from "./HealthTracker";

interface PatientDashboardProps {
  onBack: () => void;
  onBookAppointment: () => void;
}

export const PatientDashboard = ({ onBack, onBookAppointment }: PatientDashboardProps) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      rating: 4.9,
      experience: "15 years",
      fee: 500,
      available: true,
      image: "SJ",
      consultations: 1200,
      languages: ["English", "Hindi"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist", 
      rating: 4.8,
      experience: "12 years",
      fee: 600,
      available: true,
      image: "MC",
      consultations: 890,
      languages: ["English", "Mandarin"]
    },
    {
      id: 3,
      name: "Dr. Rajesh Sharma",
      specialization: "General Physician",
      rating: 4.7,
      experience: "20 years",
      fee: 400,
      available: false,
      image: "RS",
      consultations: 2100,
      languages: ["English", "Hindi", "Bengali"]
    }
  ];

  const appointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", date: "Today 3:00 PM", status: "confirmed", type: "Cardiology", avatar: "SJ" },
    { id: 2, doctor: "Dr. Michael Chen", date: "Tomorrow 10:00 AM", status: "pending", type: "Neurology", avatar: "MC" }
  ];

  const specializations = [
    { name: "Cardiology", icon: Heart, color: "red", count: 45 },
    { name: "Neurology", icon: Brain, color: "purple", count: 32 },
    { name: "Ophthalmology", icon: Eye, color: "blue", count: 28 },
    { name: "General Medicine", icon: Stethoscope, color: "green", count: 67 }
  ];

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    type: 'patient' as const
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-green-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="p-2 hover:bg-green-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('dashboard.welcome')}, {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Find and connect with verified doctors</p>
            </div>
          </div>
          <UserProfileMenu user={user} onLogout={onBack} />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="doctors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
            <TabsTrigger 
              value="doctors" 
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
            >
              <Stethoscope className="w-4 h-4" />
              {t('dashboard.findDoctors')}
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
            >
              <Calendar className="w-4 h-4" />
              {t('dashboard.myAppointments')}
            </TabsTrigger>
            <TabsTrigger 
              value="medicines" 
              className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
            >
              <Truck className="w-4 h-4" />
              Medicines
            </TabsTrigger>
            <TabsTrigger 
              value="health-tracker" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
            >
              <Activity className="w-4 h-4" />
              Health Tracker
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center gap-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white transition-all duration-200 hover:scale-105"
            >
              <Video className="w-4 h-4" />
              {t('dashboard.consultationHistory')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="space-y-6">
            {/* Enhanced Search and Filters */}
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-in slide-in-from-top-2 fade-in-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-gray-900 dark:text-white">Find the Right Doctor</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Search by name, specialization, or symptoms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search doctors or specializations..." 
                      className="pl-10 h-12 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 h-12 px-8 hover:scale-105 transition-all duration-200 shadow-lg">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" className="h-12 px-6 hover:scale-105 transition-all duration-200">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
                
                {/* Enhanced Specialization Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {specializations.map((spec, index) => (
                    <div
                      key={spec.name}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in slide-in-from-bottom-2 ${
                        selectedSpecialization === spec.name
                          ? `border-${spec.color}-500 bg-${spec.color}-50 dark:bg-${spec.color}-900/20`
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedSpecialization(selectedSpecialization === spec.name ? "" : spec.name)}
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <div className={`p-3 rounded-full bg-${spec.color}-100 dark:bg-${spec.color}-900/30`}>
                          <spec.icon className={`w-6 h-6 text-${spec.color}-600 dark:text-${spec.color}-400`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{spec.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{spec.count} doctors</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Doctor Cards */}
            <div className="grid gap-6">
              {doctors.map((doctor, index) => (
                <Card 
                  key={doctor.id} 
                  className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-4 md:space-y-0">
                      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 flex-1">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">{doctor.image}</span>
                          </div>
                          {doctor.available && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {doctor.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{doctor.specialization}</p>
                          
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="font-medium text-gray-900 dark:text-white">{doctor.rating}</span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.experience} experience</span>
                            <span className="text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{doctor.consultations}+ consultations</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                            {doctor.languages.map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center md:text-right">
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-gray-900 dark:text-white">₹{doctor.fee}</div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Consultation fee</p>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          {doctor.available ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 mb-2">
                              <Clock className="w-3 h-3 mr-1" />
                              Available Now
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="mb-2">
                              <Clock className="w-3 h-3 mr-1" />
                              Busy
                            </Badge>
                          )}
                          
                          <Button 
                            onClick={onBookAppointment}
                            disabled={!doctor.available}
                            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg"
                          >
                            Book Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="appointments">
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 animate-in slide-in-from-bottom-2 fade-in-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Your Appointments</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Manage your upcoming and past appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((apt, index) => (
                    <div 
                      key={apt.id} 
                      className="flex items-center justify-between p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gray-50 dark:bg-gray-700 dark:border-gray-600 animate-in slide-in-from-left-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{apt.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{apt.doctor}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{apt.type}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {apt.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                          className={apt.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                        >
                          {apt.status}
                        </Badge>
                        {apt.status === 'confirmed' && apt.date.includes('Today') && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                            <Video className="w-4 h-4 mr-1" />
                            Join Call
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medicines">
            <MedicineDelivery />
          </TabsContent>

          <TabsContent value="health-tracker">
            <HealthTracker />
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 animate-in slide-in-from-bottom-2 fade-in-0">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Consultation History</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Your past consultations and prescriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">No consultation history available yet.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Your completed consultations will appear here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
