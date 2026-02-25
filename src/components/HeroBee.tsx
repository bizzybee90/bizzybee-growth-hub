import { useEffect, useState } from "react";

const HeroBee = () => {
  const [phase, setPhase] = useState<"hidden" | "flying" | "landed" | "gone">("hidden");
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setTimeout(() => {
      const dot = document.getElementById("bee-landing-dot");
      if (dot) {
        const rect = dot.getBoundingClientRect();
        // Position bee so it sits on top of the "d"
        setTargetPos({ x: rect.left + rect.width / 2 - 6, y: rect.top - 14 });
        setPhase("flying");
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  // Transition from flying → landed
  useEffect(() => {
    if (phase === "flying") {
      const t = setTimeout(() => setPhase("landed"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Fade out on scroll
  useEffect(() => {
    if (phase !== "landed") return;
    const onScroll = () => {
      if (window.scrollY > 60) setPhase("gone");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [phase]);

  if (phase === "hidden" || phase === "gone") return null;

  return (
    <div
      className="fixed z-[60] pointer-events-none"
      style={{
        ...(phase === "flying"
          ? {
              animation: "bee-fly-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              ["--bee-tx" as string]: `${targetPos.x}px`,
              ["--bee-ty" as string]: `${targetPos.y}px`,
            }
          : {
              left: targetPos.x,
              top: targetPos.y,
              transition: "opacity 0.4s ease",
            }),
      }}
    >
      <span className="text-xs inline-block" style={{ transform: "scaleX(-1)" }}>
        🐝
      </span>
    </div>
  );
};

export default HeroBee;
