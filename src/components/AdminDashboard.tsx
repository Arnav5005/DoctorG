
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Stethoscope, Calendar, TrendingUp, IndianRupee, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  // Mock data for charts
  const appointmentData = [
    { month: 'Jan', appointments: 120 },
    { month: 'Feb', appointments: 150 },
    { month: 'Mar', appointments: 180 },
    { month: 'Apr', appointments: 200 },
    { month: 'May', appointments: 165 },
    { month: 'Jun', appointments: 240 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 61000 },
    { month: 'Apr', revenue: 58000 },
    { month: 'May', revenue: 67000 },
    { month: 'Jun', revenue: 72000 }
  ];

  const specializationData = [
    { name: 'Cardiology', value: 35, color: '#3B82F6' },
    { name: 'Neurology', value: 25, color: '#10B981' },
    { name: 'General', value: 20, color: '#F59E0B' },
    { name: 'Pediatrics', value: 15, color: '#EF4444' },
    { name: 'Others', value: 5, color: '#8B5CF6' }
  ];

  const stats = [
    { title: 'Total Doctors', value: '1,247', icon: Stethoscope, color: 'bg-blue-500', change: '+12%' },
    { title: 'Total Patients', value: '8,429', icon: Users, color: 'bg-green-500', change: '+18%' },
    { title: 'Appointments Today', value: '156', icon: Calendar, color: 'bg-purple-500', change: '+5%' },
    { title: 'Monthly Revenue', value: '₹72,000', icon: IndianRupee, color: 'bg-orange-500', change: '+23%' }
  ];

  // Custom tooltip for pie chart with proper styling
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <p className="text-gray-900 dark:text-white font-medium">{data.name}</p>
          <p style={{ color: data.payload.color }} className="font-semibold">
            {data.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Monitor and manage your platform</p>
          </div>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            <Activity className="w-4 h-4 mr-1" />
            Live Data
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in slide-in-from-bottom-4" style={{animationDelay: `${index * 100}ms`}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointments Chart */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-left-4">
            <CardHeader>
              <CardTitle className="dark:text-white">Monthly Appointments</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Appointment trends over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-sm" />
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
                    dataKey="appointments" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card className="dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-right-4">
            <CardHeader>
              <CardTitle className="dark:text-white">Monthly Revenue</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Revenue growth over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis className="text-sm" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgb(31 41 55)', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Specialization Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-bottom-4">
            <CardHeader>
              <CardTitle className="dark:text-white">Doctor Specializations</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Distribution of doctors by specialization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={specializationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {specializationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {specializationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 dark:bg-gray-800 dark:border-gray-700 animate-in slide-in-from-bottom-4" style={{animationDelay: '200ms'}}>
            <CardHeader>
              <CardTitle className="dark:text-white">Recent Activity</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Latest platform activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New doctor registration', user: 'Dr. Rajesh Kumar', time: '2 hours ago', type: 'doctor' },
                  { action: 'Appointment completed', user: 'Patient John Doe', time: '3 hours ago', type: 'appointment' },
                  { action: 'Payment received', user: 'Dr. Sarah Johnson', time: '5 hours ago', type: 'payment' },
                  { action: 'New patient registration', user: 'Jane Smith', time: '1 day ago', type: 'patient' },
                  { action: 'Prescription generated', user: 'Dr. Michael Chen', time: '1 day ago', type: 'prescription' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'doctor' ? 'bg-blue-500' :
                      activity.type === 'patient' ? 'bg-green-500' :
                      activity.type === 'appointment' ? 'bg-purple-500' :
                      activity.type === 'payment' ? 'bg-orange-500' : 'bg-gray-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
