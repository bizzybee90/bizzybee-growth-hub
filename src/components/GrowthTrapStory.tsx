import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

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

// Typography feel per stage: line-height, letter-spacing, font-weight emphasis
const typographyStyles: Record<number, React.CSSProperties> = {
  0: { lineHeight: 1.8, letterSpacing: "0.01em" },
  1: { lineHeight: 1.8, letterSpacing: "0.01em" },
  2: { lineHeight: 1.5, letterSpacing: "-0.005em" },
  3: { lineHeight: 1.3, letterSpacing: "-0.01em", fontWeight: 600 },
  4: { lineHeight: 1.8, letterSpacing: "0.01em" },
};

const GrowthTrapStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [
      "hsl(40, 20%, 100%)",
      "hsl(40, 20%, 98%)",
      "hsl(30, 30%, 90%)",
      "hsl(20, 44%, 12%)",
      "hsl(25, 50%, 25%)",
      "hsl(44, 96%, 97%)",
    ]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.8, 1],
    ["hsl(0,0%,10%)", "hsl(0,0%,10%)", "hsl(40,20%,92%)", "hsl(40,20%,92%)", "hsl(0,0%,10%)"]
  );

  const mutedColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.45, 0.8, 1],
    ["hsl(220,9%,46%)", "hsl(220,9%,46%)", "hsl(40,20%,68%)", "hsl(40,20%,68%)", "hsl(220,9%,46%)"]
  );

  // Notification clutter for stages 2-3 (scroll-linked)
  const [notifProgress, setNotifProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setNotifProgress(v));

  const showNotifs = notifProgress > 0.3 && notifProgress < 0.72;
  const notifOpacity = showNotifs
    ? Math.min(1, (notifProgress - 0.3) / 0.15) * (notifProgress < 0.62 ? 1 : Math.max(0, 1 - (notifProgress - 0.62) / 0.1))
    : 0;

  const notifications = [
    { icon: "📧", text: "3 unread emails", pos: "top-20 left-4 md:left-12" },
    { icon: "📞", text: "Missed call", pos: "top-32 right-4 md:right-16" },
    { icon: "💬", text: "WhatsApp (7)", pos: "top-1/3 left-2 md:left-8" },
    { icon: "⭐", text: "New review", pos: "bottom-1/3 right-2 md:right-10" },
    { icon: "📱", text: "Facebook (4)", pos: "bottom-40 left-4 md:left-20" },
    { icon: "📩", text: "Quote request", pos: "top-1/2 right-4 md:right-6" },
  ];

  return (
    <motion.div ref={containerRef} className="relative" style={{ background: bgColor }}>
      {/* Section header - sticky */}
      <div className="sticky top-0 min-h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: textColor, opacity: useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]) }}
            >
              You didn't start a business to answer emails at 10pm.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Notification clutter overlay */}
      <div className="fixed inset-0 pointer-events-none z-20" style={{ opacity: notifOpacity }}>
        {notifications.map((n, i) => (
          <motion.div
            key={i}
            className={`absolute ${n.pos} bg-background/90 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg flex items-center gap-2`}
            initial={false}
            animate={{
              opacity: notifOpacity,
              scale: notifOpacity > 0.5 ? 1 : 0.8,
              y: notifOpacity > 0.5 ? 0 : 10,
            }}
            transition={{ delay: i * 0.05 }}
          >
            <span className="text-base">{n.icon}</span>
            <span className="text-xs font-medium text-foreground whitespace-nowrap">{n.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Stages */}
      {stages.map((stage, i) => (
        <div key={i} className="min-h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-200px" }}
            className="max-w-[700px] mx-auto text-center px-6"
          >
            <span className="text-5xl mb-6 block">{stage.emoji}</span>
            <motion.span className="font-mono-label mb-3 inline-block" style={{ color: mutedColor }}>
              {stage.label}
            </motion.span>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-5"
              style={{
                color: textColor,
                lineHeight: typographyStyles[i]?.lineHeight,
                letterSpacing: typographyStyles[i]?.letterSpacing,
              }}
            >
              {stage.title}
            </motion.h2>
            <motion.p
              className="text-lg"
              style={{
                color: mutedColor,
                lineHeight: typographyStyles[i]?.lineHeight,
                letterSpacing: typographyStyles[i]?.letterSpacing,
                fontWeight: typographyStyles[i]?.fontWeight,
              }}
            >
              {stage.description}
            </motion.p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default GrowthTrapStory;
