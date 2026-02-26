import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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

const NOTIFICATION_ITEMS = [
  { icon: "📧", text: "3 unread emails", x: 8, y: 15 },
  { icon: "📞", text: "Missed call", x: 78, y: 10 },
  { icon: "💬", text: "WhatsApp (7)", x: 5, y: 40 },
  { icon: "⭐", text: "New review", x: 82, y: 45 },
  { icon: "📱", text: "Facebook (4)", x: 10, y: 70 },
  { icon: "📩", text: "Quote request", x: 75, y: 72 },
  { icon: "🔔", text: "Reminder", x: 3, y: 55 },
  { icon: "📋", text: "Job cancelled", x: 85, y: 28 },
];

const SPARKLE_POSITIONS = [
  { x: 30, y: 20 }, { x: 50, y: 35 }, { x: 70, y: 25 },
  { x: 40, y: 60 }, { x: 60, y: 50 }, { x: 25, y: 45 },
];

// ─── Desktop: pinned view that cycles through stages ───
const PinnedGrowthTrap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    // Stages split evenly across scroll distance
    // 0–0.08 = intro, 0.08–0.88 = 5 stages, 0.88–1 = outro
    if (v < 0.08) { setActiveStage(0); return; }
    if (v > 0.88) { setActiveStage(4); return; }
    const stageIndex = Math.min(4, Math.floor((v - 0.08) / 0.16));
    setActiveStage(stageIndex);
  });

  // Background colour shift
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.52, 0.72, 0.9, 1],
    [
      "hsl(40, 20%, 100%)",   // warm white
      "hsl(40, 18%, 97%)",    // barely tinted
      "hsl(30, 28%, 85%)",    // warming
      "hsl(20, 44%, 14%)",    // deep brown (tipping point)
      "hsl(25, 48%, 22%)",    // still dark (reversal)
      "hsl(44, 80%, 95%)",    // sunrise
      "hsl(44, 96%, 97%)",    // glow
    ]
  );

  const isDark = progress > 0.35 && progress < 0.8;

  // Notification pile-up: visible during stages 2-3 (progress ~0.35–0.72)
  const notifVisible = progress > 0.32 && progress < 0.75;
  const notifIntensity = notifVisible
    ? Math.min(1, (progress - 0.32) / 0.12) * (progress < 0.65 ? 1 : Math.max(0, 1 - (progress - 0.65) / 0.1))
    : 0;

  // Bee clearing + sparkles at stage 5 (progress ~0.72–0.85)
  const beeClearing = progress > 0.7 && progress < 0.88;
  const sparkleOpacity = beeClearing ? Math.min(1, (progress - 0.7) / 0.06) * Math.max(0, 1 - (progress - 0.78) / 0.1) : 0;

  // Typography styles per stage
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
      // 5 stages × 100vh each + extra space for intro/outro
      style={{ height: "600vh", background: bgColor }}
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Section intro headline — fades out */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.04, 0.08], [1, 1, 0]) }}
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
          {/* Stage label */}
          <motion.span
            key={`label-${activeStage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono-label mb-3 inline-block"
            style={{ color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)" }}
          >
            {stage.label}
          </motion.span>

          {/* Stage emoji */}
          <motion.span
            key={`emoji-${activeStage}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl mb-5 block"
          >
            {stage.emoji}
          </motion.span>

          {/* Stage title */}
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

          {/* Stage description */}
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

        {/* Notification pile-up */}
        {NOTIFICATION_ITEMS.map((n, i) => (
          <div
            key={i}
            className="absolute pointer-events-none transition-all duration-500"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              opacity: notifIntensity * (i < 4 ? 1 : Math.min(1, notifIntensity * 1.5)),
              transform: `scale(${notifIntensity > 0.5 ? 1 : 0.7}) translateY(${notifIntensity > 0.5 ? 0 : 12}px)`,
              transitionDelay: `${i * 60}ms`,
            }}
          >
            <div className="bg-background/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
              <span className="text-base">{n.icon}</span>
              <span className="text-xs font-medium text-foreground whitespace-nowrap">{n.text}</span>
            </div>
          </div>
        ))}

        {/* Bee clearing animation */}
        {beeClearing && (
          <motion.div
            className="absolute z-30 text-2xl pointer-events-none"
            initial={{ left: "10%", top: "50%" }}
            animate={{ left: "90%", top: "30%" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: sparkleOpacity > 0 ? 1 : 0 }}
          >
            🐝
          </motion.div>
        )}

        {/* Golden sparkles */}
        {SPARKLE_POSITIONS.map((sp, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute pointer-events-none transition-all duration-700"
            style={{
              left: `${sp.x}%`,
              top: `${sp.y}%`,
              opacity: sparkleOpacity,
              transform: `scale(${sparkleOpacity})`,
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <span className="text-primary text-lg">✦</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Mobile: simple stacked cards, no pinning ───
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
            backgroundColor: isDark ? "hsl(20, 44%, 14%)" : "hsl(40, 20%, 98%)",
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
