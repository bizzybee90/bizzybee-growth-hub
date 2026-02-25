import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Notification pills that accumulate during dark stages ───
const NOTIFICATION_PILLS = [
  { icon: "📧", text: "3 new emails", x: 6, y: 18 },
  { icon: "📞", text: "Missed call", x: 82, y: 14 },
  { icon: "💬", text: "WhatsApp (5)", x: 4, y: 42 },
  { icon: "📱", text: "Facebook (3)", x: 84, y: 40 },
  { icon: "📩", text: "Quote request", x: 7, y: 68 },
  { icon: "⭐", text: "New review", x: 80, y: 70 },
  { icon: "🔔", text: "Reminder", x: 5, y: 85 },
  { icon: "📋", text: "SMS (2)", x: 83, y: 84 },
];

const SPARKLE_EASE = [0.16, 1, 0.3, 1] as const;

// ─── Sparkle burst when bee collects a notification ───
const GoldenSparkle = ({ x, y }: { x: number; y: number }) => (
  <motion.div
    className="absolute pointer-events-none z-40"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 1, scale: 0.5 }}
    animate={{ opacity: 0, scale: 1.8 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6, ease: SPARKLE_EASE }}
  >
    <span className="text-lg" style={{ color: "hsl(44, 93%, 65%)" }}>✦</span>
  </motion.div>
);

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = () => setReduced(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const stages = [
  {
    label: "The Beginning",
    title: "You started with a phone and a promise",
    description:
      "Every call answered on the first ring. Every quote sent within the hour. You remembered customers' names, their dog's name, which tap leaked last winter. That personal touch was your superpower — and word spread fast.",
    emoji: "📞",
  },
  {
    label: "The Growth",
    title: "Then the enquiries started flooding in",
    description:
      "WhatsApp, Facebook, email, voicemail — your inbox became a war zone. You'd reply to one message and three more would land. You started losing track. The very thing you wanted — growth — was slowly burying you.",
    emoji: "📱",
  },
  {
    label: "The Tipping Point",
    title: "Growth started to break things",
    description:
      "You missed a quote on a Monday. Lost a £2,000 job on Wednesday. A loyal customer left a one-star review because you took 48 hours to reply. You weren't lazy — you were drowning. And every new enquiry made it worse.",
    emoji: "📉",
  },
  {
    label: "The Reversal",
    title: "What if your inbox worked for you?",
    description:
      "Imagine an AI that reads every message, understands the intent, and drafts a reply in your voice — instantly. Not a chatbot. Not a template. An assistant that actually sounds like you, knows your prices, and books jobs while you sleep.",
    emoji: "💡",
  },
  {
    label: "The Way Out",
    title: "Meet BizzyBee",
    description:
      "BizzyBee gives you back 20+ hours a week. No more 10 PM email marathons. No more lost leads. Just fast, professional replies that sound like you wrote them — because the AI learned from you. Your customers get instant answers. You get your evenings back.",
    emoji: "🌅",
  },
];

// ─── Desktop: pinned scroll storytelling ───
const PinnedGrowthTrap = () => {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  // Track which notifications the bee has collected (stage 5)
  const [collectedSet, setCollectedSet] = useState<Set<number>>(new Set());
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const sparkleIdRef = useRef(0);
  const lastCollectedRef = useRef(-1);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    if (v < 0.1) { setActiveStage(0); return; }
    if (v > 0.9) { setActiveStage(4); return; }
    const idx = Math.min(4, Math.floor((v - 0.1) / 0.16));
    setActiveStage(idx);
  });

  // Bee clearing logic: sequentially collect notifications during stage 5
  const isClearing = activeStage === 4 && progress >= 0.74;
  const clearProgress = isClearing ? Math.min(1, (progress - 0.74) / 0.14) : 0;
  const numCollected = Math.min(NOTIFICATION_PILLS.length, Math.floor(clearProgress * (NOTIFICATION_PILLS.length + 0.5)));

  // Fire sparkles as new pills are collected
  useEffect(() => {
    if (reducedMotion) return;
    if (numCollected > lastCollectedRef.current && numCollected > 0) {
      const idx = numCollected - 1;
      const pill = NOTIFICATION_PILLS[idx];
      sparkleIdRef.current += 1;
      setSparkles((prev) => [...prev.slice(-6), { id: sparkleIdRef.current, x: pill.x, y: pill.y }]);
      setCollectedSet((prev) => {
        const next = new Set(prev);
        next.add(idx);
        return next;
      });
    }
    if (numCollected < lastCollectedRef.current) {
      // Scrolling back — reset
      setCollectedSet(new Set());
      setSparkles([]);
    }
    lastCollectedRef.current = numCollected;
  }, [numCollected, reducedMotion]);

  // Reset collected state when leaving stage 5
  useEffect(() => {
    if (activeStage < 4) {
      setCollectedSet(new Set());
      setSparkles([]);
      lastCollectedRef.current = -1;
    }
  }, [activeStage]);

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.55, 0.75, 0.9, 1],
    [
      "hsl(0, 0%, 100%)",
      "hsl(48, 14%, 98%)",
      "hsl(30, 28%, 88%)",
      "hsl(20, 44%, 14%)",
      "hsl(25, 48%, 22%)",
      "hsl(44, 80%, 95%)",
      "hsl(0, 0%, 100%)",
    ]
  );

  const isDark = progress > 0.38 && progress < 0.82;

  // Notifications visible during stages 2–3 (progress ~0.38–0.74), and clearing during stage 4
  const notifsActive = (activeStage === 2 || activeStage === 3 || activeStage === 4) && progress >= 0.38;
  const notifFadeIn = notifsActive ? Math.min(1, (progress - 0.38) / 0.08) : 0;

  // Bee position: flies to the next uncollected pill
  const beeTargetIdx = Math.min(numCollected, NOTIFICATION_PILLS.length - 1);
  const beeTarget = NOTIFICATION_PILLS[beeTargetIdx];

  const typo = useMemo(() => {
    const styles: Record<number, { lineHeight: number; letterSpacing: string; fontWeight: number }> = {
      0: { lineHeight: 1.8, letterSpacing: "0.01em", fontWeight: 400 },
      1: { lineHeight: 1.75, letterSpacing: "0.005em", fontWeight: 400 },
      2: { lineHeight: 1.5, letterSpacing: "-0.005em", fontWeight: 500 },
      3: { lineHeight: 1.3, letterSpacing: "-0.01em", fontWeight: 600 },
      4: { lineHeight: 1.8, letterSpacing: "0.01em", fontWeight: 400 },
    };
    return styles[activeStage] || styles[0];
  }, [activeStage]);

  const stage = stages[activeStage];

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      style={{ height: "250vh", background: bgColor }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Intro headline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05, 0.1], [1, 1, 0]) }}
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-center px-6 max-w-2xl"
            style={{ color: isDark ? "hsl(40,20%,92%)" : "hsl(0,0%,10%)" }}
          >
            You didn't start a business to answer emails at 10pm.
          </h2>
        </motion.div>

        {/* Stage content */}
        <div className="relative z-10 max-w-[700px] mx-auto text-center px-6">
          <motion.span
            key={`label-${activeStage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono-label mb-3 inline-block"
            style={{ color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)" }}
          >
            {stage.label}
          </motion.span>

          <motion.span
            key={`emoji-${activeStage}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl mb-5 block"
          >
            {stage.emoji}
          </motion.span>

          <motion.h2
            key={`title-${activeStage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-bold mb-5"
            style={{
              color: isDark ? "hsl(40,20%,92%)" : "hsl(0,0%,10%)",
              lineHeight: typo.lineHeight,
              letterSpacing: typo.letterSpacing,
            }}
          >
            {stage.title}
          </motion.h2>

          <motion.p
            key={`desc-${activeStage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl"
            style={{
              color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)",
              lineHeight: typo.lineHeight,
              letterSpacing: typo.letterSpacing,
              fontWeight: typo.fontWeight,
            }}
          >
            {stage.description}
          </motion.p>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {stages.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === activeStage ? 32 : 8,
                  backgroundColor: i === activeStage
                    ? "hsl(35, 58%, 55%)"
                    : isDark
                      ? "hsla(40, 20%, 60%, 0.3)"
                      : "hsla(0, 0%, 10%, 0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* ─── Notification pills (stages 2–4) ─── */}
        {!reducedMotion && NOTIFICATION_PILLS.map((pill, i) => {
          const isCollected = collectedSet.has(i);
          const staggerDelay = i * 0.07;
          const pillOpacity = isCollected ? 0 : notifFadeIn * (i < 4 ? 1 : Math.min(1, notifFadeIn * 1.4));

          return (
            <motion.div
              key={`notif-${i}`}
              className="absolute pointer-events-none z-20"
              style={{ left: `${pill.x}%`, top: `${pill.y}%` }}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{
                opacity: pillOpacity,
                scale: pillOpacity > 0.3 ? 1 : 0.7,
                y: pillOpacity > 0.3 ? 0 : 12,
              }}
              transition={{
                duration: 0.45,
                delay: staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2"
                style={{
                  backgroundColor: isDark ? "hsla(20, 30%, 20%, 0.85)" : "hsla(0, 0%, 100%, 0.9)",
                  borderWidth: 1,
                  borderColor: isDark ? "hsla(40, 20%, 30%, 0.4)" : "hsla(220, 13%, 91%, 1)",
                }}
              >
                <span className="text-sm">{pill.icon}</span>
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: isDark ? "hsl(40,20%,80%)" : "hsl(0,0%,10%)" }}
                >
                  {pill.text}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* ─── Bee (stage 5 clearing) ─── */}
        {!reducedMotion && isClearing && numCollected < NOTIFICATION_PILLS.length && (
          <motion.div
            className="absolute z-30 pointer-events-none text-2xl"
            animate={{
              left: `${beeTarget.x + 2}%`,
              top: `${beeTarget.y - 2}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 16,
            }}
            style={{ left: `${beeTarget.x + 2}%`, top: `${beeTarget.y - 2}%` }}
          >
            🐝
          </motion.div>
        )}

        {/* ─── Golden sparkles ─── */}
        <AnimatePresence>
          {!reducedMotion && sparkles.map((sp) => (
            <GoldenSparkle key={sp.id} x={sp.x} y={sp.y} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── Mobile: stacked cards with gentle fades ───
const MobileGrowthTrap = () => (
  <div className="py-20 px-6">
    <h2 className="text-2xl font-bold text-foreground text-center mb-16 max-w-md mx-auto">
      You didn't start a business to answer emails at 10pm.
    </h2>
    {stages.map((stage, i) => {
      const typoMap: Record<number, React.CSSProperties> = {
        0: { lineHeight: 1.8 },
        1: { lineHeight: 1.75 },
        2: { lineHeight: 1.5, fontWeight: 500 },
        3: { lineHeight: 1.3, fontWeight: 600 },
        4: { lineHeight: 1.8 },
      };
      const isDark = i === 2 || i === 3;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-lg mx-auto mb-16 text-center rounded-2xl p-8"
          style={{
            backgroundColor: isDark ? "hsl(20, 44%, 14%)" : "hsl(48, 14%, 98%)",
          }}
        >
          <span className="text-4xl mb-4 block">{stage.emoji}</span>
          <span
            className="font-mono-label mb-2 inline-block"
            style={{ color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)" }}
          >
            {stage.label}
          </span>
          <h3
            className="text-2xl font-bold mb-4"
            style={{
              color: isDark ? "hsl(40,20%,92%)" : "hsl(0,0%,10%)",
              ...typoMap[i],
            }}
          >
            {stage.title}
          </h3>
          <p
            className="text-base"
            style={{
              color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)",
              ...typoMap[i],
            }}
          >
            {stage.description}
          </p>

          {/* Stage indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {stages.map((_, j) => (
              <div
                key={j}
                className="h-1 rounded-full"
                style={{
                  width: j === i ? 24 : 6,
                  backgroundColor: j === i
                    ? "hsl(35, 58%, 55%)"
                    : isDark
                      ? "hsla(40, 20%, 60%, 0.3)"
                      : "hsla(0, 0%, 10%, 0.15)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    })}
  </div>
);

const GrowthTrapStory = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGrowthTrap /> : <PinnedGrowthTrap />;
};

export default GrowthTrapStory;
