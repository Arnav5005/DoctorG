
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Video, Users, FileText, Settings, ArrowLeft, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfileMenu } from "./UserProfileMenu";
import { DoctorAvailability } from "./DoctorAvailability";
import { PrescriptionGenerator } from "./PrescriptionGenerator";
import { useI18n } from "@/contexts/I18nContext";

interface DoctorDashboardProps {
  onBack: () => void;
}

export const DoctorDashboard = ({ onBack }: DoctorDashboardProps) => {
  const { t } = useI18n();
  
  const appointments = [
    { id: 1, patient: "John Doe", time: "10:00 AM", type: "General Consultation", status: "confirmed", avatar: "JD" },
    { id: 2, patient: "Jane Smith", time: "11:30 AM", type: "Follow-up", status: "pending", avatar: "JS" },
    { id: 3, patient: "Mike Johnson", time: "2:00 PM", type: "Cardiology", status: "confirmed", avatar: "MJ" },
  ];

  const user = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@doctorg.com",
    type: 'doctor' as const
  };

  const stats = [
    { title: t('dashboard.todayAppointments'), value: '8', color: 'blue', change: '+2' },
    { title: t('dashboard.totalPatients'), value: '142', color: 'green', change: '+12' },
    { title: t('dashboard.thisMonth'), value: '₹45,000', color: 'purple', change: '+15%' },
    { title: t('dashboard.rating'), value: '4.9⭐', color: 'orange', change: '+0.1' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="p-2 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Doctor Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{t('dashboard.welcome')}, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
            <UserProfileMenu user={user} onLogout={onBack} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className={`border-${stat.color}-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4`}
              style={{animationDelay: `${index * 100}ms`}}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}>
                  {stat.value}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">{stat.change} from yesterday</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger 
              value="patients" 
              className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger 
              value="prescriptions" 
              className="flex items-center gap-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger 
              value="availability" 
              className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Clock className="w-4 h-4" />
              Availability
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="flex items-center gap-2 data-[state=active]:bg-gray-500 data-[state=active]:text-white transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700 border-0 shadow-xl animate-in slide-in-from-bottom-2 fade-in-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="dark:text-white">Today's Schedule</CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Manage your appointments and consultations
                    </CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slot
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((apt, index) => (
                    <div 
                      key={apt.id} 
                      className="flex items-center justify-between p-6 border rounded-xl dark:border-gray-600 dark:bg-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-left-2"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{apt.avatar}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold dark:text-white">{apt.patient}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{apt.type}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {apt.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={apt.status === 'confirmed' ? 'default' : 'secondary'}
                          className={apt.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : ''}
                        >
                          {apt.status}
                        </Badge>
                        <div className="flex space-x-2">
                          {apt.status === 'pending' && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 hover:scale-105 transition-all duration-200">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                              <Video className="w-4 h-4 mr-1" />
                              Start Call
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <Card className="border-0 shadow-xl dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-bottom-2 fade-in-0">
              <CardHeader>
                <CardTitle className="dark:text-white">Patient Management</CardTitle>
                <CardDescription className="dark:text-gray-300">View and manage your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Patient management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <div className="animate-in slide-in-from-bottom-2 fade-in-0">
              <PrescriptionGenerator />
            </div>
          </TabsContent>

          <TabsContent value="availability">
            <div className="animate-in slide-in-from-bottom-2 fade-in-0">
              <DoctorAvailability />
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-0 shadow-xl dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-bottom-2 fade-in-0">
              <CardHeader>
                <CardTitle className="dark:text-white">Profile Settings</CardTitle>
                <CardDescription className="dark:text-gray-300">Manage your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300">Profile management interface coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
