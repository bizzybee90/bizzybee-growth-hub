import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "£97",
    period: "/month",
    description: "For sole traders ready to stop missing messages",
    features: [
      "1 channel (email or web chat)",
      "250 AI messages/month",
      "Voice learning from your emails",
      "Smart inbox sorting",
      "Email support",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: "£297",
    period: "/month",
    description: "For growing businesses that need every channel covered",
    features: [
      "All channels (WhatsApp, email, SMS, web chat)",
      "1,000 AI messages/month",
      "Advanced voice matching",
      "Business brain (prices, services, availability)",
      "Auto-booking & follow-ups",
      "Priority support",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "£497",
    period: "/month",
    description: "For established businesses that want the full office team",
    features: [
      "Unlimited channels",
      "Unlimited AI messages",
      "Full knowledge base training",
      "Review response drafting",
      "Custom workflows & rules",
      "Dedicated onboarding",
      "Phone support",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    price: "£997",
    period: "/month",
    description: "For multi-location or franchise businesses",
    features: [
      "Everything in Pro",
      "Multi-location support",
      "Team seats & permissions",
      "API access & custom integrations",
      "Dedicated account manager",
      "Custom SLAs",
      "White-label options",
    ],
    popular: false,
    cta: "Talk to Us",
  },
];

const PricingCards = ({ showFullPage = false }: { showFullPage?: boolean }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <AnimatedSection className={`py-24 md:py-32 ${showFullPage ? "pt-32" : ""}`} style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <span
            className="inline-block mb-4 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            Pricing
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Less than what one missed quote costs you.
          </h2>
          <p style={{ color: "hsl(220, 9%, 50%)", maxWidth: 460, margin: "0 auto" }}>
            No contracts. No catch. Cancel any time.
          </p>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedElement key={i} variant="scaleIn">
              <div
                className="relative h-full flex flex-col"
                style={{
                  background: "white",
                  border: `1px solid ${plan.popular ? "hsl(35, 55%, 55%)" : "#e5e7eb"}`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  boxShadow: plan.popular
                    ? "0 4px 24px rgba(213,149,67,0.12)"
                    : hoveredIdx === i
                      ? "0 2px 12px rgba(0,0,0,0.06)"
                      : "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    style={{
                      background: "hsl(35, 55%, 55%)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 14px",
                      borderRadius: 20,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Most Popular
                  </span>
                )}

                <h3 className="font-bold" style={{ fontSize: 16, color: "hsl(220, 9%, 15%)" }}>{plan.name}</h3>
                <div className="mt-3 mb-1">
                  <span className="font-bold" style={{ fontSize: 32, color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: 13, color: "hsl(220, 9%, 50%)" }}>{plan.period}</span>
                </div>
                <p className="mb-5" style={{ fontSize: 13, color: "hsl(220, 9%, 50%)", lineHeight: 1.5 }}>
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2" style={{ fontSize: 13, color: "hsl(220, 9%, 30%)" }}>
                      <Check
                        className="shrink-0 mt-0.5"
                        style={{ width: 14, height: 14, color: "hsl(35, 55%, 55%)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center gap-2 font-medium transition-all"
                  style={{
                    background: plan.popular ? "hsl(35, 55%, 55%)" : "transparent",
                    color: plan.popular ? "white" : "hsl(220, 9%, 30%)",
                    border: plan.popular ? "none" : "1px solid #e5e7eb",
                    borderRadius: 10,
                    padding: "10px 20px",
                    fontSize: 13,
                  }}
                >
                  {plan.cta} <ArrowRight size={14} />
                </a>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PricingCards;
