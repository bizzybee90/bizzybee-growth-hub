import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "£49",
    period: "/month",
    description: "Perfect for sole traders just getting started",
    features: ["1 channel (WhatsApp or web chat)", "500 AI messages/month", "Basic training", "Email support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "£99",
    period: "/month",
    description: "For growing businesses ready to scale",
    features: ["All channels", "2,000 AI messages/month", "Advanced training & voice match", "Priority support", "Auto-booking", "Custom branding"],
    popular: true,
  },
  {
    name: "Pro",
    price: "£199",
    period: "/month",
    description: "For established businesses that want it all",
    features: ["Unlimited channels", "Unlimited AI messages", "Full knowledge base", "Dedicated account manager", "API access", "Team seats", "Custom integrations"],
    popular: false,
  },
];

const PricingCards = ({ showFullPage = false }: { showFullPage?: boolean }) => {
  const [hoveredGrowth, setHoveredGrowth] = useState(false);

  return (
    <AnimatedSection className={`py-24 md:py-32 ${showFullPage ? "pt-32" : ""} bg-background`}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <span className="font-mono-label text-primary mb-3 inline-block">Pricing</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Less than what one missed quote costs you.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            No contracts. No catch. No sting.
          </p>
        </AnimatedElement>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedElement key={i} variant="scaleIn">
              <div
                className={`relative p-8 rounded-2xl border h-full flex flex-col ${
                  plan.popular
                    ? "border-border-hover shadow-lg shadow-primary/10"
                    : "border-border"
                } bg-background transition-shadow`}
                onMouseEnter={() => plan.popular && setHoveredGrowth(true)}
                onMouseLeave={() => plan.popular && setHoveredGrowth(false)}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-honey text-primary-foreground text-xs font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                {/* Bee nudge on Growth tier */}
                {plan.popular && hoveredGrowth && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 140, damping: 16 }}
                    className="absolute -top-7 -right-2 text-base pointer-events-none"
                    title="Great choice!"
                  >
                    🐝
                  </motion.span>
                )}

                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                    plan.popular
                      ? "gradient-honey text-primary-foreground shadow-md hover:shadow-lg"
                      : "border border-border text-foreground hover:border-border-hover"
                  }`}
                >
                  Start Free Trial <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PricingCards;
