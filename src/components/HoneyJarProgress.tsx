import { motion, useScroll, useTransform } from "framer-motion";

const HoneyJarProgress = () => {
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowOpacity = useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 0.6, 1]);

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden md:block">
      <motion.div
        className="relative w-8 h-12 rounded-lg border-2 border-primary/30 overflow-hidden bg-background/80 backdrop-blur-sm"
        style={{
          boxShadow: useTransform(
            glowOpacity,
            (v) => `0 0 ${v * 20}px hsl(35 58% 55% / ${v * 0.4})`
          ),
        }}
      >
        {/* Jar top */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-2 rounded-t-md bg-primary/30 border border-primary/30 border-b-0" />
        {/* Honey fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 gradient-honey rounded-b-sm"
          style={{ height: fillHeight }}
        />
        {/* Bee icon */}
        <div className="absolute inset-0 flex items-center justify-center text-[10px] z-10">🐝</div>
      </motion.div>
    </div>
  );
};

export default HoneyJarProgress;
