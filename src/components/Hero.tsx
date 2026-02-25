import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, CreditCard, Clock } from "lucide-react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Subtle grid bg */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

    {/* Glow */}
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-glow/20 blur-[120px]" />

    <div className="container mx-auto px-6 relative z-10">
      <AnimatedSection className="max-w-4xl mx-auto text-center">
        <AnimatedElement>
          <span className="inline-flex items-center gap-2 font-mono-label text-primary mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary-glow/20 tracking-widest">
            Built for UK Service Businesses
          </span>
        </AnimatedElement>

        <AnimatedElement>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.08] tracking-tight mb-6 text-balance">
            Your customers handled.{" "}
            <span className="text-gradient-honey">Your evening back.</span>
          </h1>
        </AnimatedElement>

        <AnimatedElement>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            You do the work. We do the words. BizzyBee reads your emails, texts, and WhatsApp messages — understands what they need — and drafts replies in your voice. You just check and send.
          </p>
        </AnimatedElement>

        <AnimatedElement className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 gradient-honey text-primary-foreground px-8 py-4 rounded-xl text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Your Free Trial <ArrowRight size={18} />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
          >
            <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors">
              <ChevronDown size={16} />
            </span>
            See How It Works
          </a>
        </AnimatedElement>

        {/* Trust strip */}
        <AnimatedElement className="mt-14">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} className="text-primary" /> Works with Gmail & Outlook
            </span>
            <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <CreditCard size={14} className="text-primary" /> No credit card required
            </span>
            <span className="w-1 h-1 rounded-full bg-border hidden sm:block" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-primary" /> Set up in 15 minutes
            </span>
          </div>
        </AnimatedElement>

        {/* Chat preview */}
        <AnimatedElement className="mt-16">
          <div className="relative mx-auto max-w-3xl">
            <div className="rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background-alt">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="font-mono-label text-muted-foreground ml-2">BizzyBee Dashboard</span>
              </div>
              <div className="p-8 space-y-4 bg-background-alt">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full gradient-honey flex items-center justify-center text-sm shrink-0">🐝</div>
                  <div className="bg-background rounded-xl px-4 py-3 border border-border max-w-sm">
                    <p className="text-sm text-foreground">Hi! I'm BizzyBee. How can I help you today? I can book an appointment, answer questions, or get a quote ready for you. 🍯</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-primary/10 rounded-xl px-4 py-3 max-w-xs">
                    <p className="text-sm text-foreground">I need a plumber for a leaking tap — are you available tomorrow?</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full gradient-honey flex items-center justify-center text-sm shrink-0">🐝</div>
                  <div className="bg-background rounded-xl px-4 py-3 border border-border max-w-sm">
                    <p className="text-sm text-foreground">Absolutely! I've got a slot at 10 AM or 2 PM tomorrow. Which works best? I'll get everything confirmed for you straight away. ✅</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </AnimatedSection>
    </div>
  </section>
);

export default Hero;
