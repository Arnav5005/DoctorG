
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export const EmergencyMode = () => {
  const emergencyServices = [
    {
      name: "Emergency Ambulance",
      number: "108",
      description: "24/7 Emergency medical services",
      icon: Phone,
      color: "red"
    },
    {
      name: "Emergency Doctor",
      number: "Available Now",
      description: "Connect with emergency doctors",
      icon: MessageCircle,
      color: "blue"
    },
    {
      name: "Nearest Hospital",
      number: "Find Location",
      description: "Locate nearest emergency facility",
      icon: MapPin,
      color: "green"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-700">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            <div>
              <CardTitle className="text-red-900 dark:text-red-100">Emergency Mode Activated</CardTitle>
              <p className="text-red-700 dark:text-red-300">Get immediate medical assistance</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emergencyServices.map((service, index) => (
              <Card key={index} className="border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 bg-${service.color}-500 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{service.description}</p>
                  <Button 
                    className={`w-full bg-${service.color}-600 hover:bg-${service.color}-700`}
                    size="sm"
                  >
                    {service.number}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Emergency Guidelines</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Badge variant="destructive" className="mt-0.5">1</Badge>
              <p className="text-gray-700 dark:text-gray-300">Stay calm and assess the situation</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="destructive" className="mt-0.5">2</Badge>
              <p className="text-gray-700 dark:text-gray-300">Call emergency services immediately if life-threatening</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="destructive" className="mt-0.5">3</Badge>
              <p className="text-gray-700 dark:text-gray-300">Provide first aid if trained to do so</p>
            </div>
            <div className="flex items-start space-x-3">
              <Badge variant="destructive" className="mt-0.5">4</Badge>
              <p className="text-gray-700 dark:text-gray-300">Share your location with emergency contacts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
