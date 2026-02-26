import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { MessageSquareX, Clock, TrendingDown, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

/* Classy "money → honey" treatment:
   The "m" is shown struck-through with a small "H" above it,
   so it reads as "honey" while revealing it was "money". */
const HoneyWordMark = () => (
  <span className="relative inline-block" aria-label="honey">
    {/* Gold H correction mark – slightly rotated, raised */}
    <span
      className="absolute -top-[0.85em] left-[0.05em] text-[0.6em] font-extrabold text-primary select-none leading-none"
      style={{ transform: "rotate(6deg)" }}
      aria-hidden="true"
    >
      H
    </span>
    {/* Intentional thin black strike on just the m */}
    <span className="relative inline-block text-foreground">
      m
      <span
        className="absolute left-0 right-0 top-1/2 h-[1.2px] bg-foreground pointer-events-none"
        aria-hidden="true"
      />
    </span>
    <span>oney</span>
  </span>
);

interface Pain {
  icon: ReactNode;
  title: string | ReactNode;
  description: string;
}

const pains: Pain[] = [
  {
    icon: <MessageSquareX className="w-6 h-6" />,
    title: (
      <>
        Missed messages = missed <HoneyWordMark />
      </>
    ),
    description: "Every unanswered enquiry is a job going to a competitor. And they're replying faster than you.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Evenings swallowed by admin",
    description: "You started a business to do great work — not to spend your nights copy-pasting quotes.",
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: "Growth = chaos.",
    description: "More leads should be exciting.\nInstead, each new customer adds more chaos to your plate.",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "The buzz runs out.",
    description: "One slow reply. One missed booking. One bad review. It only takes one to undo months of hard work.",
  },
];

const PainPoints = () => (
  <AnimatedSection className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-16">
        <span className="font-mono-label text-primary mb-3 inline-block">Sound familiar?</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          The problems that keep you up at night
        </h2>
      </AnimatedElement>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {pains.map((pain, i) => (
          <AnimatedElement key={i} variant="scaleIn">
            <div className="p-8 rounded-2xl border border-border bg-background hover:border-border-hover transition-colors group h-full">
              <div className="w-12 h-12 rounded-xl bg-primary-glow/50 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {pain.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{pain.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pain.description}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default PainPoints;
