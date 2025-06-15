
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Heart, Brain, Baby, Eye, Bone } from "lucide-react";

export const MedicalCategories = () => {
  const categories = [
    {
      title: "General Physician",
      icon: Stethoscope,
      description: "Primary healthcare and general medical consultations",
      color: "blue"
    },
    {
      title: "Cardiology",
      icon: Heart,
      description: "Heart and cardiovascular system specialists",
      color: "red"
    },
    {
      title: "Mental Health",
      icon: Brain,
      description: "Psychology and psychiatry consultations",
      color: "purple"
    },
    {
      title: "Pediatrics",
      icon: Baby,
      description: "Specialized care for children and infants",
      color: "green"
    },
    {
      title: "Ophthalmology",
      icon: Eye,
      description: "Eye care and vision specialists",
      color: "indigo"
    },
    {
      title: "Orthopedics",
      icon: Bone,
      description: "Bone, joint, and musculoskeletal care",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      indigo: "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      orange: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Medical Specialties
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with specialized doctors across various medical fields
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 overflow-hidden"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${getColorClasses(category.color)} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
