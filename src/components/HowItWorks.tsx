import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Upload, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-6 h-6" />,
    step: "01",
    title: "Connect your email",
    description: (
      <>
        Link your Gmail or Outlook in one click.
        <br /><br />
        BizzyBee reads your sent emails to learn how you write — your tone, your phrasing, your sign-off.
        <br /><br />
        <span className="font-semibold text-foreground">It doesn't guess your voice.</span>
        <br />
        <span className="font-semibold text-foreground">It learns it.</span>
      </>
    ),
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    step: "02",
    title: "Learn your business",
    description: (
      <>
        BizzyBee reads your website.
        <br /><br />
        It analyses your services, pricing, service areas, and booking process — turning your site into a structured knowledge base.
        <br /><br />
        It also studies your industry to understand common questions and standard answers.
        <br /><br />
        <span className="font-semibold text-foreground">Within minutes, it knows what you offer — and how to talk about it.</span>
      </>
    ),
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    step: "03",
    title: "Reply with confidence",
    description: (
      <>
        Now BizzyBee knows:
        <br />
        <span className="inline-block mt-1 ml-1">• How you write</span>
        <br />
        <span className="inline-block ml-1">• What you charge</span>
        <br />
        <span className="inline-block ml-1">• Where you work</span>
        <br />
        <span className="inline-block ml-1">• How your industry responds</span>
        <br /><br />
        When a message comes in, it drafts a reply that sounds like you wrote it.
        <br /><br />
        <span className="font-semibold text-foreground">You review.</span>
        <br />
        <span className="font-semibold text-foreground">You send.</span>
        <br />
        <span className="font-semibold text-foreground">You move on.</span>
      </>
    ),
  },
];

const HowItWorks = () => (
  <AnimatedSection id="how-it-works" className="py-24 md:py-32 bg-background-alt">
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
