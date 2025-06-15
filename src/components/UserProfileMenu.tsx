import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  HelpCircle, 
  Shield, 
  FileText, 
  LogOut, 
  ChevronDown,
  Globe,
  Wallet
} from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface UserProfileMenuProps {
  user: {
    name: string;
    email: string;
    type: 'doctor' | 'patient';
  };
  onLogout: () => void;
}

export const UserProfileMenu = ({ user, onLogout }: UserProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2500); // Mock wallet balance
  const menuRef = useRef<HTMLDivElement>(null);
  const { t, language, setLanguage } = useI18n();

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as const, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ja' as const, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const menuItems = [
    { icon: User, label: 'Manage My Account', action: () => console.log('Manage account') },
    { icon: Wallet, label: `Wallet (₹${walletBalance})`, action: () => console.log('Open wallet'), special: true },
    { icon: Settings, label: 'Settings', action: () => console.log('Settings') },
    { icon: HelpCircle, label: 'Help', action: () => console.log('Help') },
    { icon: Shield, label: 'Privacy Policy', action: () => console.log('Privacy') },
    { icon: FileText, label: 'Terms', action: () => console.log('Terms') }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
      >
        <Avatar className="w-10 h-10 ring-2 ring-blue-500 hover:ring-blue-600 transition-all duration-200">
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      </Button>

      {isOpen && (
        <Card className={`absolute right-0 top-full mt-2 w-80 z-50 shadow-2xl border-0 animate-in slide-in-from-top-2 fade-in-0 duration-200 dark:bg-gray-800`}>
          <CardContent className="p-0">
            {/* User Info Section */}
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16 ring-4 ring-white/20">
                  <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-blue-100 text-sm">{user.email}</p>
                  <Badge className="mt-1 bg-white/20 text-white border-white/20 hover:bg-white/30">
                    {user.type === 'doctor' ? 'Doctor' : 'Patient'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Wallet Section */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Wallet Balance</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600 dark:text-green-400">₹{walletBalance}</div>
                  <Button size="sm" className="mt-1 bg-green-600 hover:bg-green-700 text-xs">
                    Add Money
                  </Button>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={item.action}
                  className={`w-full justify-start px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    item.special ? 'text-green-600 dark:text-green-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              ))}
            </div>

            <Separator className="dark:bg-gray-700" />

            {/* Language Selector */}
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Language</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLanguage(lang.code)}
                    className={`justify-start ${
                      language === lang.code 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="dark:bg-gray-700" />

            {/* Logout */}
            <div className="p-2">
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
