import { Link } from "react-router-dom";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => (
  <AnimatedSection className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-glow)/0.3),transparent_70%)]" />

    <div className="container mx-auto px-6 relative z-10">
      <AnimatedElement className="max-w-2xl mx-auto text-center">
        <span className="text-5xl mb-6 block">🐝</span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Let BizzyBee give you your buzz back.
        </h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          Your evenings aren't a luxury. They're the whole point.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 gradient-honey text-primary-foreground px-8 py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Free Trial <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-xl text-base font-medium hover:border-border-hover transition-colors"
          >
            Talk to us
          </Link>
        </div>
        <p className="text-xs text-muted-foreground mt-6">
          No contracts. No catch. No sting.
        </p>
      </AnimatedElement>
    </div>
  </AnimatedSection>
);

export default FinalCTA;
