import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // install lucide-react for icons

const faqs = [
  {
    question: "What is an ABS control module?",
    answer:
      "The ABS control module (or ABS ECU) is the computer that monitors wheel speed sensors and controls the ABS pump to prevent wheel lockup under braking.",
  },
  {
    question: "What is the difference between an ABS pump and an ABS module?",
    answer:
      "The ABS module is the electronic brain, while the ABS pump (or HCU) is the hydraulic unit that applies or releases brake pressure. Many vehicles combine them into one assembly.",
  },
  {
    question: "How do I know if my ABS module is bad?",
    answer:
      "Common signs include ABS warning light, traction control light, brakes locking under hard braking, or diagnostic trouble codes (e.g., C0265, U0121).",
  },
  {
    question: "Do I need to program a replacement ABS module?",
    answer:
      "Yes, many vehicles require coding to the VIN. Some direct-swap modules will plug and play if the part number matches exactly.",
  },
  {
    question: "Can I drive with a faulty ABS module?",
    answer:
      "Your brakes will still work, but the ABS and traction control features will be disabled, which can increase stopping distances on slippery roads.",
  },
  {
    question: "How much does a used ABS module cost?",
    answer:
      "Prices vary between $150 and $600 depending on make/model. Requesting a VIN-specific quote ensures you get the exact unit.",
  },
  {
    question: "Do you offer warranty on used ABS parts?",
    answer:
      "Yes, all ABS modules and pumps come with a 12-month warranty and hassle-free replacement policy.",
  },
  {
    question: "How fast can you ship ABS parts?",
    answer:
      "Orders placed before 2 PM typically ship within 24 hours from U.S. warehouses.",
  },
  {
    question: "Do you sell ABS parts for all makes and models?",
    answer:
      "Yes, we stock or can source ABS modules and pumps for over 40+ brands, including Ford, Chevy, Toyota, Honda, BMW, and Mercedes.",
  },
  {
    question: "Can you test my old ABS module?",
    answer:
      "We don’t repair or test customer units, but we supply quality-tested replacements that are ready to install.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-3xl mx-auto md:px-4 md:py-28 py-10">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <h1 className='md:text-5xl text-4xl font-inter tracking-tight text-center md:pb-16 pb-8'>FREQUENTLY <span className="text-[#f6251a]">ASKED</span> QUESTION</h1>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className=""
          >
            <button
              className={`w-full flex items-start justify-between px-6 py-4 text-left md:text-lg text-sm ${index == openIndex ? 'text-[#f6251a]' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className={`w-6 h-6 ${index == openIndex ? 'text-[#f6251a]' : ''}`} />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="px-8 pb-4 text-gray-900 md:text-sm text-xs">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;