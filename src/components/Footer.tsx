
import { Stethoscope, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const quickLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Careers", href: "#" },
        { name: "News & Media", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Online Consultation", href: "#" },
        { name: "Health Records", href: "#" },
        { name: "Prescription", href: "#" },
        { name: "Lab Tests", href: "#" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Live Chat", href: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Cookie Policy", href: "#" },
        { name: "Disclaimer", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "🐦", href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: "💼", href: "#", color: "hover:text-blue-700" },
    { name: "Instagram", icon: "📷", href: "#", color: "hover:text-pink-600" }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                DoctorG
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Revolutionizing healthcare through technology. Connect with verified doctors instantly and get quality healthcare from the comfort of your home.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@doctorg.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          {quickLinks.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Follow Us Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Social Media Section */}
            <div>
              <h3 className="font-semibold text-white mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 p-2"
                  >
                    <a href={social.href} aria-label={social.name}>
                      <span className="text-xl">{social.icon}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h3 className="font-semibold text-white mb-3">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-3">Get the latest health tips and updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 flex-1"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
            
            {/* Mobile App Download Section */}
            <div>
              <h3 className="font-semibold text-white mb-3">Get the DoctorG app</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                  aria-label="Download on Google Play Store"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-black">
                        <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">GET IT ON</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="inline-flex items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600"
                  aria-label="Download on App Store"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-black">
                        <path fill="currentColor" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.68 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2024 DoctorG. All rights reserved.</p>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
