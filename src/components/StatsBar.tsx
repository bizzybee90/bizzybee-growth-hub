import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2400, suffix: "+", label: "Businesses using BizzyBee" },
  { value: 1.2, suffix: "M", label: "Messages handled monthly", decimals: 1 },
  { value: 8, prefix: "< ", suffix: "s", label: "Average response time" },
  { value: 96, suffix: "%", label: "Customer satisfaction" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const Counter = ({ target, suffix = "", prefix = "", decimals = 0, active }: {
  target: number; suffix?: string; prefix?: string; decimals?: number; active: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target]);

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString();
  return <span>{prefix}{display}{suffix}</span>;
};

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStat, setActiveStat] = useState(-1);
  const [beePos, setBeePos] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveStat(3); // show all immediately
      return;
    }
    // Sequential bee visits
    const timers: ReturnType<typeof setTimeout>[] = [];
    stats.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setBeePos(i);
        setTimeout(() => {
          setActiveStat(i);
        }, 300);
      }, i * 800));
    });
    // Hide bee after last
    timers.push(setTimeout(() => setBeePos(-2), stats.length * 800 + 600));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section ref={ref} className="py-16 gradient-honey relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
          {stats.map((stat, i) => (
            <div key={i} className="text-center relative">
              {/* Bee landing */}
              {beePos === i && (
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: -4, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-base z-10 pointer-events-none"
                >
                  🐝
                </motion.span>
              )}
              <span className="text-3xl md:text-4xl font-bold text-primary-foreground block">
                {activeStat >= i ? (
                  <Counter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={(stat as any).prefix || ""}
                    decimals={(stat as any).decimals || 0}
                    active={activeStat >= i}
                  />
                ) : (
                  <span className="opacity-30">0</span>
                )}
              </span>
              <span className="text-sm text-primary-foreground/80 mt-1 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
