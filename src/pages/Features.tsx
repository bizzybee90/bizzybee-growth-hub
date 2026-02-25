import DemoStage from "@/components/DemoStage";
import HowItWorks from "@/components/HowItWorks";
import InboxComparison from "@/components/InboxComparison";
import FinalCTA from "@/components/FinalCTA";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";

const Features = () => (
  <main>
    <AnimatedSection className="pt-32 pb-16 bg-background">
      <div className="container mx-auto px-6 text-center">
        <AnimatedElement>
          <span className="font-mono-label text-primary mb-3 inline-block">Features</span>
        </AnimatedElement>
        <AnimatedElement>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything you need to delight customers
          </h1>
        </AnimatedElement>
        <AnimatedElement>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BizzyBee brings together AI messaging, smart inbox management, and automated booking — all in one hub designed for UK service businesses.
          </p>
        </AnimatedElement>
      </div>
    </AnimatedSection>
    <DemoStage />
    <HowItWorks />
    <InboxComparison />
    <FinalCTA />
  </main>
);

export default Features;
