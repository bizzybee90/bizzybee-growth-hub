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

// ─── Desktop: pinned scroll storytelling ───
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
    if (v < 0.1) { setActiveStage(0); return; }
    if (v > 0.9) { setActiveStage(4); return; }
    const idx = Math.min(4, Math.floor((v - 0.1) / 0.16));
    setActiveStage(idx);
  });

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
