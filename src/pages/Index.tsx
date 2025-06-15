
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Video, Calendar, Shield, Clock, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { DoctorDashboard } from "@/components/DoctorDashboard";
import { PatientDashboard } from "@/components/PatientDashboard";
import { LoginModal } from "@/components/LoginModal";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import { useI18n } from "@/contexts/I18nContext";
import { FAQ } from "@/components/FAQ";
import { MedicalCategories } from "@/components/MedicalCategories";
import { Footer } from "@/components/Footer";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { ChatWidget } from "@/components/ChatWidget";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'doctor-dashboard' | 'patient-dashboard' | 'booking' | 'admin'>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginType, setLoginType] = useState<'doctor' | 'patient'>('patient');
  const { t } = useI18n();

  const handleLogin = (type: 'doctor' | 'patient') => {
    setLoginType(type);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    if (loginType === 'doctor') {
      setCurrentView('doctor-dashboard');
    } else {
      setCurrentView('patient-dashboard');
    }
  };

  if (currentView === 'doctor-dashboard') {
    return <DoctorDashboard onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'patient-dashboard') {
    return <PatientDashboard onBack={() => setCurrentView('home')} onBookAppointment={() => setCurrentView('booking')} />;
  }

  if (currentView === 'booking') {
    return <AppointmentBooking onBack={() => setCurrentView('patient-dashboard')} />;
  }

  if (currentView === 'admin') {
    return <AdminDashboard onBack={() => setCurrentView('home')} />;
  }

  const features = [
    {
      icon: Video,
      title: t('features.videoConsultations'),
      description: t('features.videoDesc'),
      color: 'blue',
      delay: 0
    },
    {
      icon: Calendar,
      title: t('features.easyBooking'),
      description: t('features.bookingDesc'),
      color: 'green',
      delay: 100
    },
    {
      icon: Shield,
      title: t('features.securePrivate'),
      description: t('features.secureDesc'),
      color: 'purple',
      delay: 200
    }
  ];

  const steps = [
    { step: 1, title: "Sign Up", desc: "Create account with MagicLink", icon: Users },
    { step: 2, title: "Find Doctor", desc: "Browse verified doctors", icon: Stethoscope },
    { step: 3, title: "Book & Pay", desc: "Schedule with Razorpay", icon: Calendar },
    { step: 4, title: "Consult", desc: "Video call consultation", icon: Video }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-blue-100 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                DoctorG
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleLogin('doctor')} 
                  className="border-blue-200 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-200"
                >
                  {t('header.doctorLogin')}
                </Button>
                <Button 
                  onClick={() => handleLogin('patient')} 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  {t('header.patientLogin')}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('admin')} 
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Admin
                </Button>
              </div>

              {/* Mobile Menu */}
              <MobileMenu onLogin={handleLogin} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-green-100/20 dark:from-blue-900/10 dark:to-green-900/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-in slide-in-from-bottom-4 fade-in-0">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 hover:from-blue-200 hover:to-green-200 dark:from-blue-900 dark:to-green-900 dark:text-blue-300 border-0 px-6 py-2 hover:scale-105 transition-all duration-300">
              {t('hero.badge')}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t('hero.title')}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent animate-pulse">
                {t('hero.titleHighlight')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in slide-in-from-bottom-4 fade-in-0" style={{animationDelay: '200ms'}}>
              <Button 
                size="lg" 
                onClick={() => handleLogin('patient')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-4 h-auto hover:scale-105 transition-all duration-300 shadow-xl group"
              >
                {t('header.findDoctor')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => handleLogin('doctor')}
                className="border-blue-200 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-gray-700 text-lg px-8 py-4 h-auto hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {t('header.joinAsDoctor')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Categories Section */}
      <MedicalCategories />

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in slide-in-from-top-2 fade-in-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Why Choose DoctorG?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of healthcare with our comprehensive telemedicine platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: t('features.videoConsultations'),
                description: t('features.videoDesc'),
                color: 'blue',
                delay: 0
              },
              {
                icon: Calendar,
                title: t('features.easyBooking'),
                description: t('features.bookingDesc'),
                color: 'green',
                delay: 100
              },
              {
                icon: Shield,
                title: t('features.securePrivate'),
                description: t('features.secureDesc'),
                color: 'purple',
                delay: 200
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`border-${feature.color}-100 dark:border-gray-700 dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group animate-in slide-in-from-bottom-4 fade-in-0`}
                style={{animationDelay: `${feature.delay}ms`}}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className={`text-${feature.color}-900 dark:text-${feature.color}-100 text-xl`}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="dark:text-gray-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Plans Section */}
      <SubscriptionPlans />

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {[
              { number: "1000+", label: "Verified Doctors", delay: 0 },
              { number: "50,000+", label: "Happy Patients", delay: 100 },
              { number: "24/7", label: "Healthcare Support", delay: 200 }
            ].map((stat, index) => (
              <div 
                key={index}
                className="animate-in slide-in-from-bottom-4 fade-in-0 hover:scale-110 transition-transform duration-300"
                style={{animationDelay: `${stat.delay}ms`}}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2 bg-white/20 backdrop-blur-sm rounded-2xl py-4">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in slide-in-from-top-2 fade-in-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Simple steps to get healthcare</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", desc: "Create account with MagicLink", icon: Users },
              { step: 2, title: "Find Doctor", desc: "Browse verified doctors", icon: Stethoscope },
              { step: 3, title: "Book & Pay", desc: "Schedule with Razorpay", icon: Calendar },
              { step: 4, title: "Consult", desc: "Video call consultation", icon: Video }
            ].map((item, index) => (
              <div 
                key={index} 
                className="text-center group animate-in slide-in-from-bottom-4 fade-in-0"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        userType={loginType}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
