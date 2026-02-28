import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { MessageSquareX, Clock, TrendingDown, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

interface Pain {
  icon: ReactNode;
  title: string;
  description: string;
}

const pains: Pain[] = [
  {
    icon: <MessageSquareX className="w-5 h-5" />,
    title: "Missed messages = missed money",
    description: "Every unanswered enquiry is a job going to a competitor. And they're replying faster than you.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Evenings swallowed by admin",
    description: "You started a business to do great work — not to spend your nights copy-pasting quotes.",
  },
  {
    icon: <TrendingDown className="w-5 h-5" />,
    title: "Growth = chaos",
    description: "More leads should be exciting. Instead, each new customer adds more chaos to your plate.",
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "One slow reply undoes everything",
    description: "One missed booking. One bad review. It only takes one to undo months of hard work.",
  },
];

const PainPoints = () => (
  <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 20%, 98%)" }}>
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-14">
        <span
          className="inline-block mb-4 uppercase"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
        >
          Sound familiar?
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
        >
          The problems that keep you up at night
        </h2>
      </AnimatedElement>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {pains.map((pain, i) => (
          <AnimatedElement key={i} variant="scaleIn">
            <div
              className="h-full group"
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: "28px 24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "hsl(35, 55%, 55%)";
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(213,149,67,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)";
              }}
            >
              <div
                className="flex items-center justify-center mb-5"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(213,149,67,0.08)",
                  color: "hsl(35, 55%, 55%)",
                }}
              >
                {pain.icon}
              </div>
              <h3 className="font-bold mb-2" style={{ fontSize: 15, color: "hsl(220, 9%, 15%)" }}>
                {pain.title}
              </h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "hsl(220, 9%, 50%)" }}>
                {pain.description}
              </p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default PainPoints;
