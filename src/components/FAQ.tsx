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
    <AnimatedSection className="py-24 md:py-32 bg-background-alt">
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <span className="font-mono-label text-primary mb-3 inline-block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Frequently asked questions
          </h2>
        </AnimatedElement>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedElement key={i}>
              <div className="rounded-xl border border-border bg-background overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                      open === i ? "rotate-180" : ""
                    }`}
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
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* FAQ Schema */}
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
