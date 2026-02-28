import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How quickly can I get set up?",
    a: "Most businesses are live within 60 minutes. Connect your channels, train the AI with your FAQs and pricing, and you're good to go. No technical knowledge required.",
  },
  {
    q: "Will the AI sound like a robot?",
    a: "Not at all. BizzyBee learns your tone of voice from your past messages. Customers genuinely can't tell the difference between you and your AI assistant.",
  },
  {
    q: "What happens if the AI can't answer something?",
    a: "It flags it for you immediately. You'll get a notification, and the customer gets a friendly 'I'll get back to you shortly' message. You're always in control.",
  },
  {
    q: "Which channels does BizzyBee support?",
    a: "WhatsApp Business, Facebook Messenger, email, website live chat, and SMS. All messages flow into one unified inbox.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. We're GDPR compliant, data is encrypted at rest and in transit, and we never share your data with third parties. Your business data stays yours.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes — no long contracts, no cancellation fees. You can cancel your subscription at any time from your dashboard.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 20%, 98%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-14">
          <span
            className="inline-block mb-4 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Frequently asked questions
          </h2>
        </AnimatedElement>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedElement key={i}>
              <div
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s ease",
                  borderColor: open === i ? "hsl(35, 55%, 55%)" : "#e5e7eb",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 font-medium" style={{ fontSize: 14, color: "hsl(220, 9%, 15%)" }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="shrink-0 transition-transform"
                    style={{
                      width: 18, height: 18,
                      color: "hsl(220, 9%, 55%)",
                      transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5" style={{ fontSize: 13, lineHeight: 1.7, color: "hsl(220, 9%, 45%)" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </div>
    </AnimatedSection>
  );
};

export default FAQ;
