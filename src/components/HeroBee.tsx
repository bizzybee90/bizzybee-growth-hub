import { useEffect, useState } from "react";

const HeroBee = () => {
  const [phase, setPhase] = useState<"hidden" | "flying" | "landed">("hidden");
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      const dot = document.getElementById("bee-landing-dot");
      if (dot) {
        const rect = dot.getBoundingClientRect();
        setTargetPos({ x: rect.left + rect.width / 2 - 6, y: rect.top - 8 });
        setPhase("flying");
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "flying") {
      const t = setTimeout(() => setPhase("landed"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <div
      className="fixed z-[60] pointer-events-none"
      style={{
        left: phase === "flying" ? undefined : targetPos.x,
        top: phase === "flying" ? undefined : targetPos.y,
        ...(phase === "flying"
          ? {
              animation: "bee-fly-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              // CSS custom properties for the target
              ["--bee-tx" as string]: `${targetPos.x}px`,
              ["--bee-ty" as string]: `${targetPos.y}px`,
            }
          : {}),
      }}
    >
      <span className={`text-xs transition-transform duration-300 inline-block ${phase === "landed" ? "scale-90" : ""}`}>
        🐝
      </span>
    </div>
  );
};

export default HeroBee;
