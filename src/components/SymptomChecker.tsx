
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, AlertCircle, User, Heart, Brain, Baby } from "lucide-react";

export const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const commonSymptoms = [
    "Fever", "Headache", "Cough", "Sore throat", "Fatigue", "Nausea",
    "Chest pain", "Shortness of breath", "Dizziness", "Stomach pain",
    "Back pain", "Joint pain", "Skin rash", "Loss of appetite"
  ];

  const specialtyRecommendations = [
    {
      specialty: "General Physician",
      confidence: "95%",
      icon: User,
      color: "blue",
      description: "Based on your symptoms, a general consultation is recommended"
    },
    {
      specialty: "Cardiology",
      confidence: "78%",
      icon: Heart,
      color: "red",
      description: "Heart-related symptoms detected"
    },
    {
      specialty: "Neurology",
      confidence: "65%",
      icon: Brain,
      color: "purple",
      description: "Neurological symptoms may require specialist attention"
    }
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    if (symptoms.length > 0) {
      setRecommendations(specialtyRecommendations);
    }
  };

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Symptom Checker</span>
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Select your symptoms to get personalized doctor recommendations
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Symptom Selection */}
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Select your symptoms:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredSymptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={symptoms.includes(symptom)}
                    onCheckedChange={() => handleSymptomToggle(symptom)}
                  />
                  <label
                    htmlFor={symptom}
                    className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    {symptom}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Symptoms */}
          {symptoms.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Selected symptoms:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary" className="dark:bg-gray-700">
                    {symptom}
                    <button
                      onClick={() => handleSymptomToggle(symptom)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
              <Button onClick={analyzeSymptoms} className="bg-blue-600 hover:bg-blue-700">
                Analyze Symptoms
              </Button>
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Important Disclaimer</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  This symptom checker is for informational purposes only and does not replace professional medical advice. 
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Recommended Specialists</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              Based on your symptoms, these specialists are recommended
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-${rec.color}-500 rounded-full flex items-center justify-center`}>
                      <rec.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{rec.specialty}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{rec.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`bg-${rec.color}-100 text-${rec.color}-700 dark:bg-${rec.color}-900 dark:text-${rec.color}-300`}>
                      {rec.confidence} match
                    </Badge>
                    <Button size="sm" className="mt-2 ml-2 bg-blue-600 hover:bg-blue-700">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
