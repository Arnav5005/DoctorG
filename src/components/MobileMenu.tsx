
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Stethoscope, Users, Calendar, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "@/contexts/I18nContext";

interface MobileMenuProps {
  onLogin: (type: 'doctor' | 'patient') => void;
}

export const MobileMenu = ({ onLogin }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useI18n();

  const menuItems = [
    { label: t('header.findDoctor'), action: () => onLogin('patient'), icon: Users },
    { label: t('header.joinAsDoctor'), action: () => onLogin('doctor'), icon: Stethoscope },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 dark:bg-gray-900">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                DoctorG
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 py-6">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-12 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
