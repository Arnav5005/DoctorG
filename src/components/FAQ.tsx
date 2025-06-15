
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/contexts/I18nContext";

export const FAQ = () => {
  const { t } = useI18n();

  const faqs = [
    {
      question: "What payment methods are available?",
      answer: "" // Will be added manually later
    },
    {
      question: "How does online consultation work?",
      answer: "" // Will be added manually later
    },
    {
      question: "Can I choose my doctor?",
      answer: "" // Will be added manually later
    },
    {
      question: "Can I reschedule my appointment?",
      answer: "" // Will be added manually later
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about our services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div className="text-gray-600 dark:text-gray-300">
                  {faq.answer || "Answer will be added soon..."}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
