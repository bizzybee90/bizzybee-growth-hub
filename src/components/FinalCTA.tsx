import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-glow)/0.3),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedElement className="max-w-2xl mx-auto text-center">
          {/* Bee resting near CTA */}
          <div className="relative inline-block mb-6">
            <span className="text-5xl block">🐝</span>
            <AnimatePresence>
              {hovered && !clicked && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 140, damping: 14 }}
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 20px hsl(35 58% 55% / 0.3)" }}
                />
              )}
            </AnimatePresence>

            {/* Fly-off particles on click */}
            <AnimatePresence>
              {clicked && Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 120,
                    y: -(Math.random() * 80 + 20),
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-1/2 text-xs pointer-events-none"
                  style={{ color: "hsl(35, 58%, 55%)" }}
                >
                  ✦
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

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
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setClicked(true)}
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
};

export default FinalCTA;
