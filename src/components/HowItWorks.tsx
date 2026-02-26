import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Upload, Cpu, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: <Upload className="w-5 h-5" />,
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
    icon: <Cpu className="w-5 h-5" />,
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
    icon: <Rocket className="w-5 h-5" />,
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

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  const handleClick = (i: number) => {
    setActive(i);
    setPaused(true);
    // Resume after 10s of inactivity
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <AnimatedSection id="how-it-works" className="py-24 md:py-32 bg-background-alt">
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-12">
          <span className="font-mono-label text-primary mb-3 inline-block">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Live in under 60 minutes
          </h2>
        </AnimatedElement>

        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Stepper row */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => handleClick(i)}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer",
                    active === i
                      ? "gradient-honey text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40"
                  )}
                >
                  {step.icon}
                  <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{step.title}</span>
                  <span className="text-sm font-semibold sm:hidden">{step.step}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className={cn(
                      "h-px w-full transition-colors duration-300",
                      i < active ? "bg-primary" : "bg-border"
                    )} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Content area — fixed height to prevent layout shift */}
          <div className="relative min-h-[340px] md:min-h-[300px] rounded-2xl bg-card border border-border/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 p-6 md:p-8 flex items-center justify-center text-center"
              >
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  {steps[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HowItWorks;
