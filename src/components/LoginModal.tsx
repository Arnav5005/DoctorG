
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, User, Mail, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'doctor' | 'patient';
  onSuccess: () => void;
}

export const LoginModal = ({ isOpen, onClose, userType, onSuccess }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const loginMethod = activeTab === "email" ? email : phone;
    const methodType = activeTab === "email" ? "email" : "phone number";
    
    // Simulate MagicLink API call
    setTimeout(() => {
      toast({
        title: "Magic Link Sent! ✨",
        description: `Check your ${methodType} ${loginMethod} for the login link`,
      });
      setIsLoading(false);
      
      // Simulate successful login after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 dark:text-white">
            {userType === 'doctor' ? (
              <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            ) : (
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
            )}
            {userType === 'doctor' ? 'Doctor Login' : 'Patient Login'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
            <TabsTrigger value="email" className="dark:data-[state=active]:bg-gray-600">Email</TabsTrigger>
            <TabsTrigger value="phone" className="dark:data-[state=active]:bg-gray-600">Phone</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <TabsContent value="email" className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="phone" className="space-y-2">
              <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>
            </TabsContent>
            
            <Button 
              type="submit" 
              className={`w-full ${
                userType === 'doctor' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Sending Magic Link...
                </>
              ) : (
                'Send Magic Link'
              )}
            </Button>
            
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              We'll send you a secure login link to your {activeTab}
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
