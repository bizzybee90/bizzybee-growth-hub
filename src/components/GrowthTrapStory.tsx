import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const stages = [
  {
    label: "The Beginning",
    icon: "📞",
    description:
      "You started this business and it was your baby. Just you, doing great work. You picked up the phone every time. You replied to every message that evening. Quotes went out the same day. Customers chose you because the last company they called never got back to them — but you did. You were the one with the great reviews. The one people recommended.",
  },
  {
    label: "The Growth",
    icon: "📱",
    description:
      "Word spread. More customers came. More calls, more emails, more WhatsApps. You got busier and busier. That was the dream, right?\n\nBut the messages didn't grow with the work — they grew faster than it.",
  },
  {
    label: "The Tipping Point",
    icon: "📉",
    description:
      "Now you're so busy doing the work that you can't keep up with the noise around it. Quote requests sit for two days. Missed calls go unreturned. That message from a new customer on Monday? You don't see it until Thursday.\n\nBy then, they've booked someone else — and you never even knew you lost the job.",
  },
  {
    label: "The Reversal",
    icon: "🪤",
    description:
      "And suddenly… you've become the company you replaced. The one customers can't get hold of. The one with the slow replies.\n\nA customer isn't happy with a job — they message you, but you're buried in other work and you can't respond fast enough. One bad review turns into two. Your reputation starts taking hits for something that isn't your work… it's your time.\n\nThe business that was your baby starts to feel like a trap.",
  },
  {
    label: "The Way Out",
    icon: "🌅",
    description:
      "BizzyBee exists because this story shouldn't have to end that way. It gives you back the thing you lost when you got busy: time.\n\nNot by doing the work for you — by handling everything around it. The emails, the texts, the missed calls, the follow-ups. The \"just checking…\" messages. The back-and-forth.\n\nIt's like having a full office team — for less than the cost of one.\n\nYou keep doing the work you love. BizzyBee makes sure no customer ever feels ignored again.",
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

  // Each stage gets exactly 20% of scroll. No dead zones.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
    setActiveStage(Math.min(4, Math.floor(v * 5)));
  });

  // Background colour: warm → dark at stage 2-3 → sunrise at stage 4
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5, 0.6, 0.75, 0.9],
    [
      "hsl(40, 20%, 98%)",
      "hsl(40, 18%, 95%)",
      "hsl(25, 30%, 18%)",
      "hsl(20, 44%, 12%)",
      "hsl(22, 42%, 14%)",
      "hsl(40, 60%, 90%)",
      "hsl(44, 80%, 95%)",
    ]
  );

  const isDark = progress > 0.35 && progress < 0.78;

  // Notifications visible during stages 2-3
  const notifVisible = progress > 0.35 && progress < 0.78;
  const notifIntensity = notifVisible
    ? Math.min(1, (progress - 0.35) / 0.1) *
      (progress < 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.08))
    : 0;

  // Bee clearing + sparkles at stage 4 transition
  const beeClearing = progress > 0.74 && progress < 0.9;
  const sparkleOpacity = beeClearing
    ? Math.min(1, (progress - 0.74) / 0.05) *
      Math.max(0, 1 - (progress - 0.82) / 0.08)
    : 0;

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

  // Intro fades out completely before stage content appears
  const introOpacity = useTransform(scrollYProgress, [0, 0.06, 0.1], [1, 0.5, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.1], [0, -40]);
  // Stage content fades in after intro is gone
  const stageOpacity = useTransform(scrollYProgress, [0.06, 0.12], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="relative"
      style={{ height: "400vh", background: bgColor }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Intro headline — fades out before stage content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{ opacity: introOpacity, y: introY }}
        >
          <h2
            className="text-2xl md:text-4xl font-bold text-center px-6 max-w-2xl"
            style={{ color: isDark ? "hsl(40,20%,92%)" : "hsl(0,0%,10%)" }}
          >
            You didn't start a business to answer emails at 10pm.
          </h2>
        </motion.div>

        {/* Stage content — fades in after intro */}
        <motion.div
          className="relative z-10 max-w-[700px] mx-auto text-center px-6"
          style={{ opacity: stageOpacity }}
        >
          <motion.span
            key={`label-${activeStage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 inline-block"
            style={{ color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)" }}
          >
            {stage.label}
          </motion.span>

          <motion.span
            key={`icon-${activeStage}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl mb-5 block"
          >
            {stage.icon}
          </motion.span>

          <motion.p
            key={`desc-${activeStage}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl whitespace-pre-line"
            style={{
              color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)",
              lineHeight: typo.lineHeight,
              letterSpacing: typo.letterSpacing,
              fontWeight: typo.fontWeight,
            }}
          >
            {stage.description}
          </motion.p>

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
        </motion.div>

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
          <span className="text-4xl mb-4 block">{stage.icon}</span>
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 inline-block"
            style={{ color: isDark ? "hsl(40,20%,68%)" : "hsl(220,9%,46%)" }}
          >
            {stage.label}
          </span>
          <p
            className="text-base whitespace-pre-line"
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
