
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Clock, Plus, X } from "lucide-react";
import { format } from "date-fns";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DayAvailability {
  day: string;
  enabled: boolean;
  slots: TimeSlot[];
}

export const DoctorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availability, setAvailability] = useState<DayAvailability[]>([
    { day: 'Monday', enabled: true, slots: [{ id: '1', startTime: '09:00', endTime: '12:00' }, { id: '2', startTime: '14:00', endTime: '17:00' }] },
    { day: 'Tuesday', enabled: true, slots: [{ id: '3', startTime: '09:00', endTime: '12:00' }] },
    { day: 'Wednesday', enabled: false, slots: [] },
    { day: 'Thursday', enabled: true, slots: [{ id: '4', startTime: '10:00', endTime: '16:00' }] },
    { day: 'Friday', enabled: true, slots: [{ id: '5', startTime: '09:00', endTime: '13:00' }] },
    { day: 'Saturday', enabled: false, slots: [] },
    { day: 'Sunday', enabled: false, slots: [] }
  ]);

  const addTimeSlot = (dayIndex: number) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '10:00'
    };
    
    setAvailability(prev => 
      prev.map((day, index) => 
        index === dayIndex 
          ? { ...day, slots: [...day.slots, newSlot] }
          : day
      )
    );
  };

  const removeTimeSlot = (dayIndex: number, slotId: string) => {
    setAvailability(prev => 
      prev.map((day, index) => 
        index === dayIndex 
          ? { ...day, slots: day.slots.filter(slot => slot.id !== slotId) }
          : day
      )
    );
  };

  const toggleDay = (dayIndex: number) => {
    setAvailability(prev => 
      prev.map((day, index) => 
        index === dayIndex 
          ? { ...day, enabled: !day.enabled }
          : day
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Set Your Availability</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Configure your working hours for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availability.map((day, dayIndex) => (
            <div key={day.day} className="border rounded-lg p-4 dark:border-gray-600 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Button
                    variant={day.enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDay(dayIndex)}
                    className="transition-colors duration-200"
                  >
                    {day.day}
                  </Button>
                  {day.enabled && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                      Available
                    </Badge>
                  )}
                </div>
                {day.enabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(dayIndex)}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Slot
                  </Button>
                )}
              </div>
              
              {day.enabled && (
                <div className="grid gap-2">
                  {day.slots.map((slot) => (
                    <div key={slot.id} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded-md animate-in slide-in-from-left-1 fade-in-0">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        value={slot.startTime}
                        className="px-2 py-1 border rounded text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        onChange={(e) => {
                          // Update start time logic here
                        }}
                      />
                      <span className="text-gray-500 dark:text-gray-300">to</span>
                      <input
                        type="time"
                        value={slot.endTime}
                        className="px-2 py-1 border rounded text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        onChange={(e) => {
                          // Update end time logic here
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(dayIndex, slot.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 hover:scale-[1.02] transform">
            Save Availability
          </Button>
        </CardContent>
      </Card>

      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Block Specific Dates</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Select dates when you'll be unavailable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border dark:border-gray-600 animate-in fade-in-0 slide-in-from-top-2"
          />
        </CardContent>
      </Card>
    </div>
  );
};
