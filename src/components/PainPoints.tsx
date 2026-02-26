import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { MessageSquareX, Clock, TrendingDown, AlertCircle } from "lucide-react";

const pains = [
  {
    icon: <MessageSquareX className="w-6 h-6" />,
    title: "Missed messages = missed revenue",
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
    title: "Reputation at risk",
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
