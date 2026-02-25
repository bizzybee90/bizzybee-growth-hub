import { useEffect, useState, useRef } from "react";

const HoneyJarProgress = () => {
  const [fill, setFill] = useState(0);
  const rafRef = useRef(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setFill(docHeight > 0 ? scrollTop / docHeight : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  if (reduced) return null;

  const nearBottom = fill > 0.95;
  const glowStrength = fill > 0.9 ? (fill - 0.9) / 0.1 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-30 hidden md:flex flex-col items-center gap-1">
      {/* Jar */}
      <div
        className="relative w-9 h-14 rounded-b-xl rounded-t-lg border-2 overflow-hidden backdrop-blur-sm transition-shadow duration-700"
        style={{
          borderColor: `hsl(35 58% 55% / ${0.3 + glowStrength * 0.4})`,
          backgroundColor: "hsl(40 20% 100% / 0.85)",
          boxShadow: nearBottom
            ? `0 0 ${16 + glowStrength * 12}px hsl(35 58% 55% / ${0.25 + glowStrength * 0.3})`
            : "0 2px 8px hsl(0 0% 0% / 0.06)",
        }}
      >
        {/* Jar lid */}
        <div
          className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-7 h-[6px] rounded-t-md"
          style={{
            backgroundColor: "hsl(35 58% 55% / 0.4)",
            border: "1px solid hsl(35 58% 55% / 0.3)",
            borderBottom: "none",
          }}
        />

        {/* Honey fill */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-[height] duration-200 ease-out rounded-b-lg"
          style={{
            height: `${fill * 100}%`,
            background: "linear-gradient(to top, hsl(35, 58%, 55%), hsl(40, 78%, 68%))",
          }}
        />

        {/* Tiny bee */}
        <div className="absolute inset-0 flex items-center justify-center text-[10px] z-10 drop-shadow-sm">
          🍯
        </div>
      </div>

      {/* Percentage label */}
      <span
        className="font-mono-label transition-colors duration-500"
        style={{
          fontSize: "8px",
          color: nearBottom ? "hsl(35, 58%, 55%)" : "hsl(220, 9%, 46%)",
        }}
      >
        {Math.round(fill * 100)}%
      </span>
    </div>
  );
};

export default HoneyJarProgress;
