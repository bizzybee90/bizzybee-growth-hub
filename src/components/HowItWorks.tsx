import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Upload, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    step: "01",
    title: "Connect your channels",
    description: "Link WhatsApp, Facebook, email, and your website chat in minutes. No code required.",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    step: "02",
    title: "Train your AI",
    description: "Feed BizzyBee your FAQs, price list, and booking rules. It learns your business in under an hour.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    step: "03",
    title: "Go live & grow",
    description: "Your AI starts replying instantly. You review, approve, and focus on the work that matters.",
  },
];

const HowItWorks = () => (
  <AnimatedSection className="py-24 md:py-32 bg-background-alt">
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-16">
        <span className="font-mono-label text-primary mb-3 inline-block">How it works</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Live in under 60 minutes
        </h2>
      </AnimatedElement>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <AnimatedElement key={i}>
            <div className="relative p-8 text-center">
              <span className="text-6xl font-bold text-primary/10 absolute top-0 right-4 select-none">
                {step.step}
              </span>
              <div className="w-14 h-14 rounded-2xl gradient-honey flex items-center justify-center text-primary-foreground mb-6 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default HowItWorks;
