
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Building, Stethoscope } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export const SubscriptionPlans = () => {
  const { t } = useI18n();

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      description: "Basic healthcare access",
      features: [
        "1 consultation per month",
        "Basic health tracker",
        "Emergency contact",
        "Standard support"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      color: "gray",
      icon: Stethoscope,
      popular: false
    },
    {
      name: "Plus",
      price: "₹499",
      period: "/month",
      description: "Enhanced healthcare for regular users",
      features: [
        "5 consultations per month",
        "AI doctor recommendations",
        "Prescription history",
        "Priority support",
        "Health progress tracking",
        "Symptom checker"
      ],
      buttonText: "Choose Plus",
      buttonVariant: "default" as const,
      color: "blue",
      icon: Star,
      popular: true
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      description: "Unlimited healthcare access",
      features: [
        "Unlimited consultations",
        "Emergency mode access",
        "Complete EHR integration",
        "Medicine delivery",
        "24/7 priority support",
        "Family health management",
        "Advanced analytics"
      ],
      buttonText: "Choose Premium",
      buttonVariant: "default" as const,
      color: "purple",
      icon: Zap,
      popular: false
    },
    {
      name: "Clinic/Enterprise",
      price: "Custom",
      period: "",
      description: "For healthcare providers and organizations",
      features: [
        "Multi-user access",
        "Advanced analytics dashboard",
        "API integration",
        "Custom branding",
        "Dedicated support",
        "Compliance tools",
        "Bulk consultation packages"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      color: "green",
      icon: Building,
      popular: false
    }
  ];

  const getColorClasses = (color: string, popular: boolean) => {
    const baseClasses = {
      gray: popular ? "border-gray-500 bg-gray-50 dark:bg-gray-800" : "border-gray-200 dark:border-gray-700",
      blue: popular ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500" : "border-blue-200 dark:border-blue-700",
      purple: popular ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-purple-200 dark:border-purple-700",
      green: popular ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-green-200 dark:border-green-700"
    };
    return baseClasses[color as keyof typeof baseClasses];
  };

  const getIconColor = (color: string) => {
    const colorMap = {
      gray: "text-gray-600 dark:text-gray-400",
      blue: "text-blue-600 dark:text-blue-400",
      purple: "text-purple-600 dark:text-purple-400",
      green: "text-green-600 dark:text-green-400"
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-4 py-2">
            Healthcare Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These are the plans available for your healthcare needs. Pick a plan and start your journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative flex flex-col h-full ${getColorClasses(plan.color, plan.popular)} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 dark:bg-gray-800 overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-8' : 'pt-6'}`}>
                <div className={`w-16 h-16 bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                  <plan.icon className={`w-8 h-8 text-white`} />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline justify-center">
                  <span className={`text-4xl font-bold ${getIconColor(plan.color)}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className={`w-5 h-5 ${getIconColor(plan.color)} flex-shrink-0`} />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full mt-auto ${plan.buttonVariant === 'default' ? `bg-gradient-to-r from-${plan.color}-500 to-${plan.color}-600 hover:from-${plan.color}-600 hover:to-${plan.color}-700` : `border-${plan.color}-200 hover:bg-${plan.color}-50 dark:border-${plan.color}-700 dark:hover:bg-${plan.color}-900/20`} hover:scale-105 transition-all duration-200`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            All plans include secure payments, data protection, and 24/7 technical support
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <span>✓ No hidden fees</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 7-day free trial</span>
          </div>
        </div>
      </div>
    </section>
  );
};
