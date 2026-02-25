import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stages = [
  {
    label: "The Trap",
    title: "You're drowning in messages",
    description: "WhatsApp, Facebook, email, voicemail — your inbox is a war zone. Every missed message is a missed job. You're replying at 11 PM and still falling behind.",
    emoji: "📱",
  },
  {
    label: "The Cost",
    title: "Your growth is killing you",
    description: "More customers should mean more revenue. Instead, it means more chaos. You're stuck answering the same questions, quoting the same jobs, chasing the same leads.",
    emoji: "📉",
  },
  {
    label: "The Shift",
    title: "What if your inbox worked for you?",
    description: "Imagine an AI assistant that knows your business inside out — answering enquiries, booking jobs, and following up with customers while you sleep.",
    emoji: "💡",
  },
  {
    label: "The Sunrise",
    title: "Welcome to BizzyBee",
    description: "Your AI customer service hub handles the busywork. You focus on the craft. Customers get instant, professional replies. You get your life back.",
    emoji: "🌅",
  },
];

const GrowthTrapStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [
      "hsl(40, 20%, 98%)",
      "hsl(30, 30%, 90%)",
      "hsl(20, 44%, 16%)",
      "hsl(25, 50%, 30%)",
      "hsl(44, 96%, 95%)",
    ]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.85, 1],
    ["hsl(0,0%,10%)", "hsl(0,0%,10%)", "hsl(40,20%,90%)", "hsl(40,20%,90%)", "hsl(0,0%,10%)"]
  );

  const mutedColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.85, 1],
    ["hsl(220,9%,46%)", "hsl(220,9%,46%)", "hsl(40,20%,70%)", "hsl(40,20%,70%)", "hsl(220,9%,46%)"]
  );

  return (
    <motion.div ref={containerRef} className="relative" style={{ background: bgColor }}>
      <div className="sticky top-0 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.span className="font-mono-label mb-6 inline-block" style={{ color: mutedColor }}>
              The Growth Trap
            </motion.span>
          </div>
        </div>
      </div>

      {stages.map((stage, i) => (
        <div key={i} className="min-h-screen flex items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-200px" }}
            className="max-w-lg mx-auto text-center px-6"
          >
            <span className="text-5xl mb-6 block">{stage.emoji}</span>
            <motion.span className="font-mono-label mb-3 inline-block" style={{ color: mutedColor }}>
              {stage.label}
            </motion.span>
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
              {stage.title}
            </motion.h2>
            <motion.p className="text-lg leading-relaxed" style={{ color: mutedColor }}>
              {stage.description}
            </motion.p>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default GrowthTrapStory;
