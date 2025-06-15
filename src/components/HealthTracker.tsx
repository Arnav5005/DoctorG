
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Weight, Activity, Heart, Droplets, Plus, TrendingUp, TrendingDown } from "lucide-react";

export const HealthTracker = () => {
  const [weight, setWeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState({ systolic: "", diastolic: "" });
  const [bloodSugar, setBloodSugar] = useState("");

  // Mock historical data
  const weightData = [
    { date: '2024-01', value: 75 },
    { date: '2024-02', value: 74.5 },
    { date: '2024-03', value: 74 },
    { date: '2024-04', value: 73.8 },
    { date: '2024-05', value: 73.5 },
    { date: '2024-06', value: 73.2 }
  ];

  const bpData = [
    { date: '2024-01', systolic: 120, diastolic: 80 },
    { date: '2024-02', systolic: 118, diastolic: 78 },
    { date: '2024-03', systolic: 115, diastolic: 75 },
    { date: '2024-04', systolic: 117, diastolic: 77 },
    { date: '2024-05', systolic: 119, diastolic: 79 },
    { date: '2024-06', systolic: 116, diastolic: 76 }
  ];

  const sugarData = [
    { date: '2024-01', value: 95 },
    { date: '2024-02', value: 92 },
    { date: '2024-03', value: 88 },
    { date: '2024-04', value: 90 },
    { date: '2024-05', value: 87 },
    { date: '2024-06', value: 85 }
  ];

  const metrics = [
    {
      title: "Weight",
      value: "73.2 kg",
      change: "-1.8 kg",
      trend: "down",
      icon: Weight,
      color: "blue",
      target: "Target: 72 kg"
    },
    {
      title: "Blood Pressure",
      value: "116/76",
      change: "Normal",
      trend: "stable",
      icon: Heart,
      color: "green",
      target: "Target: <120/80"
    },
    {
      title: "Blood Sugar",
      value: "85 mg/dL",
      change: "-10 mg/dL",
      trend: "down",
      icon: Droplets,
      color: "purple",
      target: "Target: 80-100"
    },
    {
      title: "Steps Today",
      value: "8,247",
      change: "+1,200",
      trend: "up",
      icon: Activity,
      color: "orange",
      target: "Target: 10,000"
    }
  ];

  const addWeight = () => {
    if (weight) {
      console.log('Adding weight:', weight);
      setWeight("");
    }
  };

  const addBloodPressure = () => {
    if (bloodPressure.systolic && bloodPressure.diastolic) {
      console.log('Adding BP:', bloodPressure);
      setBloodPressure({ systolic: "", diastolic: "" });
    }
  };

  const addBloodSugar = () => {
    if (bloodSugar) {
      console.log('Adding blood sugar:', bloodSugar);
      setBloodSugar("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color}-500 rounded-lg flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                {metric.trend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                {metric.trend === "down" && <TrendingDown className="w-5 h-5 text-red-500" />}
                {metric.trend === "stable" && <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>}
              </div>
              <h3 className="font-medium text-gray-600 dark:text-gray-300 text-sm">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-yellow-600'}`}>
                {metric.change}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{metric.target}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Entry and Charts */}
      <Tabs defaultValue="weight" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm">
          <TabsTrigger value="weight" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            Weight Tracker
          </TabsTrigger>
          <TabsTrigger value="bp" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
            Blood Pressure
          </TabsTrigger>
          <TabsTrigger value="sugar" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            Blood Sugar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weight">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center space-x-2">
                <Weight className="w-5 h-5" />
                <span>Weight Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-4">
                <Input
                  placeholder="Enter weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button onClick={addWeight} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(31 41 55)', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      formatter={(value: any) => [`${value} kg`, 'Weight']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bp">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Blood Pressure Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-4">
                <Input
                  placeholder="Systolic"
                  value={bloodPressure.systolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, systolic: e.target.value }))}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Input
                  placeholder="Diastolic"
                  value={bloodPressure.diastolic}
                  onChange={(e) => setBloodPressure(prev => ({ ...prev, diastolic: e.target.value }))}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button onClick={addBloodPressure} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bpData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(31 41 55)', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="systolic" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      name="Systolic"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="diastolic" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      name="Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sugar">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white flex items-center space-x-2">
                <Droplets className="w-5 h-5" />
                <span>Blood Sugar Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-4">
                <Input
                  placeholder="Blood sugar (mg/dL)"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button onClick={addBloodSugar} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sugarData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-sm" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgb(31 41 55)', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }}
                      formatter={(value: any) => [`${value} mg/dL`, 'Blood Sugar']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
