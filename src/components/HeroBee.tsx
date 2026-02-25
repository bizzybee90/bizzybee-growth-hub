import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroBee = () => {
  const [phase, setPhase] = useState<"hidden" | "flying" | "landed">("hidden");
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced.current) return;

    const timer = setTimeout(() => {
      const dot = document.getElementById("bee-landing-dot");
      if (dot) {
        const rect = dot.getBoundingClientRect();
        setTarget({ x: rect.left + rect.width / 2, y: rect.top - 2 });
      }
      setPhase("flying");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "flying") {
      const t = setTimeout(() => setPhase("landed"), 1400);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "hidden") return null;

  const startX = window.innerWidth + 40;
  const startY = -40;

  return (
    <AnimatePresence>
      {phase === "flying" && (
        <motion.div
          className="fixed z-[60] pointer-events-none text-sm"
          initial={{ x: startX, y: startY, opacity: 0, scale: 1.2 }}
          animate={{
            x: [startX, startX * 0.6, target.x * 1.3, target.x - 4],
            y: [startY, 80, target.y * 0.6, target.y],
            opacity: [0, 1, 1, 1],
            scale: [1.2, 1, 0.9, 0.7],
            rotate: [0, -15, 10, 0],
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.3, 0.7, 1],
          }}
          style={{ left: 0, top: 0 }}
        >
          <span className="relative">
            🐝
            {/* Wing flutter */}
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary/30"
              animate={{ opacity: [0.8, 0, 0.8], scale: [1, 1.5, 1] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
          </span>
        </motion.div>
      )}

      {phase === "landed" && (
        <motion.div
          className="fixed z-[60] pointer-events-none text-[10px]"
          style={{ left: target.x - 5, top: target.y - 6 }}
          initial={{ scale: 0.7, opacity: 1 }}
          animate={{ scale: [0.7, 0.8, 0.65], y: [0, -1, 0] }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          🐝
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeroBee;
