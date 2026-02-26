import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Message cards (the raw inbox) ───
const MESSAGE_CARDS = [
  { id: 1, type: "email", from: "Sarah Mitchell", subject: "Quote for 3-bed clean?", preview: "Hi, wondering if you could give me a quote for a 3-bed semi in Luton...", time: "10:32 AM", channel: "Email", urgent: false, unread: true },
  { id: 2, type: "whatsapp", from: "Jim Henderson", subject: "Emergency leak", preview: "Got a leak under the kitchen sink, any chance you can come today?", time: "11:15 AM", channel: "WhatsApp", urgent: true, unread: true },
  { id: 11, type: "email", from: "Google Reviews", subject: "New 5-star review", preview: "★★★★★ Brilliant service, came same day and fixed it perfectly. Highly recommend!", time: "11:45 AM", channel: "Review", urgent: false, unread: true },
  { id: 3, type: "sms", from: "07734 882991", subject: "Booking change", preview: "Need to move Thursday to Friday if poss", time: "9:48 AM", channel: "SMS", urgent: false, unread: true },
  { id: 4, type: "email", from: "Tom Baker", subject: "Re: Re: Re: Quote", preview: "Sorry to chase again but did you get my email about the...", time: "Yesterday", channel: "Email", urgent: false, unread: true },
  { id: 5, type: "whatsapp", from: "Karen Price", subject: "Not happy", preview: "I've been waiting 3 days for a reply. This isn't good enough.", time: "2 days ago", channel: "WhatsApp", urgent: true, unread: true },
  { id: 6, type: "call", from: "Missed Call", subject: "Unknown Number", preview: "Voicemail: Hi, I got your number from Google, wondering if you could...", time: "Yesterday", channel: "Phone", urgent: false, unread: true },
  { id: 7, type: "facebook", from: "Dave's Plumbing FB", subject: "New message", preview: "Hi do you cover the MK area? Need a plumber ASAP", time: "3 days ago", channel: "Facebook", urgent: false, unread: true },
  { id: 8, type: "email", from: "Google Reviews", subject: "New 1-star review", preview: "★☆☆☆☆ Called twice, never got back to me. Went with someone else.", time: "Yesterday", channel: "Review", urgent: true, unread: true },
  { id: 9, type: "whatsapp", from: "Lisa Chen", subject: "Photo attached", preview: "Here's the photo of the tap I mentioned — can you fix this type?", time: "Monday", channel: "WhatsApp", urgent: false, unread: true },
  { id: 10, type: "email", from: "NO REPLY", subject: "Special offer!!!", preview: "UNBEATABLE DEALS ON PLUMBING SUPPLIES — CLICK NOW", time: "Today", channel: "Spam", urgent: false, unread: false },
];

// ─── BizzyBee organised inbox ───
const ORGANISED_CARDS = [
  { id: 1, label: "Hot Lead", summary: "Sarah wants a quote for a 3-bed in Luton. Asked twice — seems frustrated.", status: "Draft reply ready", color: "#ef4444" },
  { id: 2, label: "Emergency", summary: "Jim has a kitchen leak. Needs same-day visit.", status: "Draft reply ready", color: "#f97316" },
  { id: 5, label: "Complaint", summary: "Karen's been waiting 3 days. Needs immediate attention.", status: "Apology drafted", color: "#ef4444" },
  { id: 3, label: "Booking", summary: "Thursday → Friday reschedule request.", status: "Auto-handled ✓", color: "#eab308" },
  { id: 9, label: "Enquiry", summary: "Lisa sent a photo of a tap for assessment.", status: "Draft reply ready", color: "#eab308" },
  { id: 6, label: "Voicemail", summary: "New enquiry from Google — MK area, wants a quote.", status: "Draft reply ready", color: "#6b7280" },
  { id: 7, label: "Social", summary: "Facebook enquiry — MK area coverage question.", status: "Auto-handled ✓", color: "#6b7280" },
  { id: 10, label: "Cleared", summary: "Spam email auto-filtered.", status: "Auto-cleared", color: "#d1d5db" },
];

// ─── Exact approved copy ───
// Stage -1 = intro headline, stages 0-4 = the five story stages
const STAGES = [
  {
    label: "The Beginning",
    description:
      "You started this business and it was your baby. Just you, doing great work. You picked up the phone every time. You replied to every email that evening. You gave quotes the same day. Customers chose you because the last company they called never got back to them — but you did. You were the one with the great reviews. The one people recommended.",
    closingLine: "",
  },
  {
    label: "The Growth",
    description:
      "Word spread. More customers came. More calls, more emails, more WhatsApps. You got busier and busier. That was the dream, right?",
    closingLine: "",
  },
  {
    label: "The Tipping Point",
    description:
      "Except now you're so busy doing the work that you can't keep up with the messages. Quote requests sit for two days. Missed calls go unreturned. That email from a new customer on Monday? You didn't see it until Thursday. By then, they'd booked someone else.",
    closingLine: "",
  },
  {
    label: "The Reversal",
    description:
      "You've become the company you replaced. The one customers couldn't get hold of. The one with the slow replies. A customer isn't happy with a job — they message you, but you're too buried in other work to get back to them. One bad review turns into two. The business that was your baby starts to feel like a trap.",
    closingLine: "",
  },
  {
    label: "The Way Out",
    description:
      "BizzyBee exists because this story shouldn't have to end that way. It gives you back the thing you lost when you got busy: time. Not by doing the work for you — by handling everything around it. The emails, the texts, the missed calls, the follow-ups. It's like hiring a full office team for less than the cost of one.",
    closingLine:
      "You keep doing the work you love. BizzyBee makes sure no customer ever feels ignored again.",
  },
];

const CHANNEL_ICONS: Record<string, string> = {
  email: "✉️",
  whatsapp: "💬",
  sms: "📱",
  call: "📞",
  facebook: "👤",
};

// ─── Card chaos positions per visual stage ───
// visualStage: -1=intro, 0=beginning, 1=growth, 2=tipping, 3=reversal, 4=wayout
const getCardTransform = (visualStage: number, i: number) => {
  if (visualStage <= 0) {
    // Intro + Beginning: 3 clean cards
    return { x: 0, y: i * 72, rotate: 0, scale: i < 3 ? 1 : 0, opacity: i < 3 ? (visualStage === -1 ? 0.4 : 1) : 0 };
  }
  switch (visualStage) {
    case 1: // Growth: 7 cards, grid filling
      return { x: 0, y: i * 64, rotate: 0, scale: i < 7 ? 1 : 0, opacity: i < 7 ? (i < 5 ? 1 : 0.7) : 0 };
    case 2: // Tipping: overlapping, tilted
      return {
        x: (i % 2 === 0 ? -1 : 1) * (6 + i * 3),
        y: i * 48 - (i > 5 ? 35 : 0),
        rotate: (i % 2 === 0 ? -1 : 1) * (1.5 + i * 0.7),
        scale: 1, opacity: 1,
      };
    case 3: // Reversal: max chaos
      return {
        x: Math.sin(i * 1.8) * 24,
        y: i * 40 - 15 + Math.cos(i * 2.1) * 12,
        rotate: Math.sin(i * 1.3) * 5,
        scale: 0.96, opacity: 1,
      };
    default: // Way out (shouldn't render chaos cards)
      return { x: 0, y: i * 58, rotate: 0, scale: 1, opacity: 1 };
  }
};

// ─── Typography per stage ───
const TYPO_STYLES = [
  { lineHeight: 1.85, letterSpacing: "0.01em", fontWeight: 400 },  // Beginning
  { lineHeight: 1.75, letterSpacing: "0.005em", fontWeight: 400 }, // Growth
  { lineHeight: 1.55, letterSpacing: "-0.005em", fontWeight: 450 },// Tipping
  { lineHeight: 1.35, letterSpacing: "-0.01em", fontWeight: 500 }, // Reversal
  { lineHeight: 1.85, letterSpacing: "0.01em", fontWeight: 400 },  // Way Out
];

// ─── Background + text colours per visual stage ───
const BG_COLORS: Record<number, string> = {
  [-1]: "hsl(40, 30%, 99%)",  // intro
  0: "hsl(40, 30%, 99%)",     // beginning
  1: "hsl(40, 20%, 97%)",     // growth
  2: "hsl(25, 30%, 16%)",     // tipping
  3: "hsl(20, 44%, 11%)",     // reversal
  4: "hsl(44, 70%, 96%)",     // wayout
};

const TEXT_COLORS: Record<number, string> = {
  [-1]: "hsl(220, 9%, 15%)",
  0: "hsl(220, 9%, 30%)",
  1: "hsl(220, 9%, 30%)",
  2: "hsl(40, 20%, 75%)",
  3: "hsl(40, 20%, 75%)",
  4: "hsl(220, 9%, 30%)",
};

const LABEL_COLORS: Record<number, string> = {
  [-1]: "hsl(35, 50%, 45%)",
  0: "hsl(35, 50%, 45%)",
  1: "hsl(35, 50%, 45%)",
  2: "hsl(35, 58%, 55%)",
  3: "hsl(35, 58%, 55%)",
  4: "hsl(35, 50%, 45%)",
};

// ─── Floating notification badges ───
const NOTIF_ITEMS = [
  { icon: "📧", text: "3 unread", x: 2, y: 6 },
  { icon: "📞", text: "Missed call", x: 76, y: 3 },
  { icon: "💬", text: "WhatsApp (7)", x: 0, y: 88 },
  { icon: "⭐", text: "1★ review", x: 70, y: 90 },
];
const EXTRA_NOTIFS = [
  { icon: "📱", text: "Facebook (4)", x: 78, y: 45 },
  { icon: "🔔", text: "Reminder", x: 4, y: 50 },
];

const FEATURE_CHIPS = ["Multi-channel", "AI Drafts", "Voice Learning", "Business Brain", "Smart Sort"];

// ─── Sub-components ───

interface CardTransform {
  x: number; y: number; rotate: number; scale: number; opacity: number;
}

const ChaosCard = ({
  card, transform, isDark, stage,
}: {
  card: (typeof MESSAGE_CARDS)[0];
  transform: CardTransform;
  isDark: boolean;
  stage: number;
}) => {
  const showBadge = stage >= 2 && card.urgent;
  const showDot = stage >= 1 && card.unread && !showBadge;

  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg) scale(${transform.scale})`,
        opacity: transform.opacity,
        zIndex: 10 - MESSAGE_CARDS.indexOf(card) + (card.urgent && stage >= 2 ? 5 : 0),
        transition: "all 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className="relative rounded-xl"
        style={{
          background: isDark ? "rgba(255,255,255,0.06)" : "white",
          border: `1px solid ${showBadge ? "rgba(252,165,165,0.5)" : isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
          padding: "10px 12px",
          boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
          backdropFilter: isDark ? "blur(8px)" : "none",
        }}
      >
        {showBadge && (
          <div className="absolute -top-1.5 -right-1.5 uppercase" style={{ background: "#ef4444", color: "white", fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: 5, letterSpacing: "0.05em" }}>
            URGENT
          </div>
        )}
        {showDot && (
          <div className="absolute rounded-full" style={{ top: 10, right: 10, width: 7, height: 7, background: "#d59543" }} />
        )}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span style={{ fontSize: 12 }}>{CHANNEL_ICONS[card.type] || "📧"}</span>
          <span className="flex-1 truncate" style={{ fontSize: 11, fontWeight: 600, color: isDark ? "rgba(255,255,255,0.85)" : "#1a1a1a" }}>{card.from}</span>
          <span className="shrink-0" style={{ fontSize: 9, color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{card.time}</span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 500, color: isDark ? "rgba(255,255,255,0.7)" : "#374151", marginBottom: 1 }}>{card.subject}</div>
        <div className="truncate" style={{ fontSize: 10, color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{card.preview}</div>
        <div className="inline-block mt-1 rounded" style={{ fontSize: 8, fontWeight: 600, color: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", background: isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6", padding: "1px 6px", letterSpacing: "0.03em" }}>
          {card.channel}
        </div>
      </div>
    </div>
  );
};

const OrganisedCard = ({ card, index }: { card: (typeof ORGANISED_CARDS)[0]; index: number }) => (
  <motion.div
    className="absolute top-0 left-0 w-full"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    style={{ transform: `translateY(${index * 56}px)` }}
  >
    <div className="flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 12px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
      <div className="shrink-0 rounded" style={{ width: 4, height: 28, background: card.color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="uppercase rounded" style={{ fontSize: 8, fontWeight: 700, color: card.color, background: `${card.color}14`, padding: "1px 5px", letterSpacing: "0.05em" }}>{card.label}</span>
        </div>
        <div className="truncate" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.summary}</div>
      </div>
      <div className="shrink-0 whitespace-nowrap" style={{
        fontSize: 9, fontWeight: 600,
        color: card.status.includes("✓") || card.status.includes("cleared") ? "#4a7c59" : "#d59543",
        background: card.status.includes("✓") || card.status.includes("cleared") ? "rgba(74,124,89,0.06)" : "rgba(213,149,67,0.06)",
        padding: "2px 7px", borderRadius: 5,
      }}>{card.status}</div>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════
// DESKTOP: Wheel-hijack stage stepper
// ═══════════════════════════════════════════════════
// Instead of mapping scroll position → progress, we CAPTURE wheel events
// when the section is in view and step exactly one stage per gesture.
// This eliminates ALL scroll inconsistency across devices.
// ═══════════════════════════════════════════════════

const TOTAL_STAGES = 6; // -1 (intro) + 0,1,2,3,4

const DesktopGrowthTrap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visualStage, setVisualStage] = useState(-1); // -1=intro, 0-4=story
  const [isLocked, setIsLocked] = useState(false);     // are we hijacking scroll?
  const [exitDirection, setExitDirection] = useState<"up" | "down" | null>(null);
  const cooldownRef = useRef(false);
  const touchStartRef = useRef(0);

  // ─── Lock/unlock logic ───
  // We lock scroll when the section enters the viewport center.
  // We unlock when user scrolls past the last stage (down) or before the first (up).

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLocked(true);
          setExitDirection(null);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Step stage with cooldown to prevent over-scrolling
  const step = useCallback((direction: "up" | "down") => {
    if (cooldownRef.current) return;

    setVisualStage((prev) => {
      if (direction === "down") {
        if (prev >= 4) {
          // Past last stage → release scroll, let page continue
          setIsLocked(false);
          setExitDirection("down");
          return prev;
        }
        return prev + 1;
      } else {
        if (prev <= -1) {
          // Before first stage → release scroll, let page scroll up
          setIsLocked(false);
          setExitDirection("up");
          return prev;
        }
        return prev - 1;
      }
    });

    // Cooldown: 600ms prevents rapid-fire from trackpad momentum
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 600);
  }, []);

  // ─── Wheel handler ───
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isLocked) return;

      e.preventDefault();
      const direction = e.deltaY > 0 ? "down" : "up";
      step(direction);
    };

    // Must use { passive: false } to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isLocked, step]);

  // ─── Touch handler (mobile-like touch on laptop trackpads aren't wheel events on all browsers) ───
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (!isLocked) return;
      touchStartRef.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLocked) return;
      const delta = touchStartRef.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return; // ignore small touches
      e.preventDefault();
      step(delta > 0 ? "down" : "up");
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isLocked, step]);

  // ─── Keyboard support ───
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isLocked) return;
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); step("down"); }
      if (e.key === "ArrowUp") { e.preventDefault(); step("up"); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLocked, step]);

  // ─── Re-lock when scrolling back into view ───
  useEffect(() => {
    if (exitDirection === null) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;

      if (inView && !isLocked) {
        setIsLocked(true);
        setExitDirection(null);
        // Reset to edge stage
        if (exitDirection === "down") setVisualStage(4);
        if (exitDirection === "up") setVisualStage(-1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [exitDirection, isLocked]);

  // ─── Derived state ───
  const isIntro = visualStage === -1;
  const isDark = visualStage === 2 || visualStage === 3;
  const isWayout = visualStage === 4;
  const stageData = isIntro ? null : STAGES[visualStage];
  const typo = isIntro ? TYPO_STYLES[0] : TYPO_STYLES[visualStage];
  const bgColor = BG_COLORS[visualStage] || BG_COLORS[-1];
  const textColor = TEXT_COLORS[visualStage] || TEXT_COLORS[-1];
  const labelColor = LABEL_COLORS[visualStage] || LABEL_COLORS[-1];
  const showNotifs = visualStage === 2 || visualStage === 3;
  const cardStage = isIntro ? -1 : visualStage;

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{
        // Give the section actual height so it participates in page flow
        // but the content is always viewport-height
        minHeight: "100vh",
      }}
    >
      <div
        className="flex overflow-hidden"
        style={{
          height: "100vh",
          position: isLocked ? "fixed" : "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: isLocked ? 50 : 1,
          background: bgColor,
          transition: "background 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* ─── LEFT: Story text ─── */}
        <div className="flex-1 flex flex-col justify-center relative z-10" style={{ padding: "0 48px 0 64px" }}>
          {/* Intro headline */}
          <AnimatePresence>
            {isIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[480px]"
              >
                <h2
                  className="font-bold"
                  style={{
                    fontSize: "clamp(28px, 3vw, 38px)",
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  You didn't start a business to answer emails at 10pm.
                </h2>
                <div className="flex items-center gap-2 mt-6" style={{ color: "#9ca3af", fontSize: 13 }}>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.div>
                  <span style={{ fontStyle: "italic" }}>Scroll to read the story</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage content */}
          <AnimatePresence mode="wait">
            {stageData && (
              <motion.div
                key={visualStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[460px]"
              >
                <div
                  className="uppercase"
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: labelColor,
                    marginBottom: 16,
                  }}
                >
                  {stageData.label}
                </div>

                <div
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    lineHeight: typo.lineHeight,
                    letterSpacing: typo.letterSpacing,
                    fontWeight: typo.fontWeight,
                    color: textColor,
                    transition: "color 0.6s ease",
                  }}
                >
                  {stageData.description}
                </div>

                {stageData.closingLine && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      lineHeight: 1.85,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginTop: 20,
                    }}
                  >
                    {stageData.closingLine}
                  </motion.div>
                )}

                {/* Progress dots */}
                <div className="flex gap-1.5 mt-8">
                  {STAGES.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        height: 5,
                        width: i === visualStage ? 32 : 8,
                        background: i === visualStage ? "#d59543" : isDark ? "rgba(200,180,150,0.2)" : "rgba(0,0,0,0.1)",
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT: Card visualisation ─── */}
        <div className="flex-1 flex items-center justify-center relative" style={{ padding: "0 48px" }}>
          <div
            className="relative w-full"
            style={{
              maxWidth: 360,
              height: isWayout ? 470 : 540,
              transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* BizzyBee header */}
            <motion.div
              className="absolute -top-10 left-0 right-0 flex items-center justify-between"
              animate={{ opacity: isWayout ? 1 : 0, y: isWayout ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 16 }}>🐝</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>BizzyBee Inbox</span>
              </div>
              <div className="rounded-md" style={{ fontSize: 10, fontWeight: 600, color: "#4a7c59", background: "rgba(74,124,89,0.07)", padding: "3px 8px" }}>
                All handled ✓
              </div>
            </motion.div>

            {/* Feature chips */}
            <AnimatePresence>
              {isWayout && (
                <motion.div
                  className="absolute -bottom-9 left-0 right-0 flex gap-1.5 justify-center flex-wrap"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {FEATURE_CHIPS.map((f, i) => (
                    <span key={i} className="whitespace-nowrap rounded-md" style={{ fontSize: 9, fontWeight: 600, color: "#d59543", background: "rgba(213,149,67,0.06)", padding: "3px 8px" }}>
                      {f}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chaotic cards (stages -1 to 3) */}
            {!isWayout &&
              MESSAGE_CARDS.map((card, i) => (
                <ChaosCard key={card.id} card={card} transform={getCardTransform(cardStage, i)} isDark={isDark} stage={cardStage} />
              ))}

            {/* Organised cards (stage 4) */}
            <AnimatePresence>
              {isWayout &&
                ORGANISED_CARDS.map((card, i) => (
                  <OrganisedCard key={card.id} card={card} index={i} />
                ))}
            </AnimatePresence>
          </div>

          {/* Floating notification badges */}
          {showNotifs && (
            <>
              {[...NOTIF_ITEMS, ...(visualStage === 3 ? EXTRA_NOTIFS : [])].map((n, i) => (
                <div
                  key={`notif-${i}`}
                  className="absolute pointer-events-none z-[5]"
                  style={{
                    left: `${n.x}%`, top: `${n.y}%`,
                    opacity: visualStage === 3 ? 0.9 : 0.55,
                    transform: `scale(${visualStage === 3 ? 1 : 0.85})`,
                    transition: `all 0.5s ease ${i * 0.06}s`,
                  }}
                >
                  <div className="flex items-center gap-1.5 rounded-lg" style={{
                    background: "rgba(255,255,255,0.07)", backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.1)", padding: "4px 8px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                  }}>
                    <span style={{ fontSize: 11 }}>{n.icon}</span>
                    <span className="whitespace-nowrap" style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>{n.text}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Golden glow */}
          {isWayout && (
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                top: "50%", left: "50%", width: 380, height: 380,
                x: "-50%", y: "-50%",
                background: "radial-gradient(circle, rgba(213,149,67,0.07) 0%, transparent 70%)",
              }}
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MOBILE: Stacked cards, no scroll hijack ───
const MobileGrowthTrap = () => (
  <div className="py-16 px-5">
    <h2 className="text-2xl font-bold text-center mb-12 max-w-sm mx-auto" style={{ color: "#1a1a1a" }}>
      You didn't start a business to answer emails at 10pm.
    </h2>

    {STAGES.map((stage, i) => {
      const isDark = i === 2 || i === 3;
      const isWayout = i === 4;
      const typo = TYPO_STYLES[i];
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-md mx-auto mb-12 rounded-2xl p-6"
          style={{ backgroundColor: isDark ? "hsl(20, 44%, 12%)" : isWayout ? "hsl(44, 70%, 96%)" : "hsl(40, 20%, 98%)" }}
        >
          <span className="uppercase inline-block mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 58%, 55%)" }}>
            {stage.label}
          </span>
          <p style={{ fontSize: 15, lineHeight: typo.lineHeight, letterSpacing: typo.letterSpacing, fontWeight: typo.fontWeight, color: isDark ? "hsl(40,20%,75%)" : "hsl(220,9%,30%)" }}>
            {stage.description}
          </p>
          {stage.closingLine && (
            <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.85, fontWeight: 700, color: "#1a1a1a" }}>
              {stage.closingLine}
            </p>
          )}
          {i === 0 && (
            <div className="mt-5 space-y-2">
              {MESSAGE_CARDS.slice(0, 3).map((card) => (
                <div key={card.id} className="rounded-lg flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", padding: "8px 10px" }}>
                  <span style={{ fontSize: 12 }}>{CHANNEL_ICONS[card.type] || "📧"}</span>
                  <span className="truncate" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.subject}</span>
                </div>
              ))}
            </div>
          )}
          {isWayout && (
            <div className="mt-5 space-y-2">
              {ORGANISED_CARDS.slice(0, 4).map((card) => (
                <div key={card.id} className="rounded-lg flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", padding: "8px 10px" }}>
                  <div className="rounded shrink-0" style={{ width: 3, height: 22, background: card.color }} />
                  <span className="truncate flex-1" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.summary}</span>
                  <span className="shrink-0 rounded" style={{ fontSize: 8, fontWeight: 600, color: card.status.includes("✓") ? "#4a7c59" : "#d59543", background: card.status.includes("✓") ? "rgba(74,124,89,0.06)" : "rgba(213,149,67,0.06)", padding: "2px 6px" }}>
                    {card.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
);

// ─── Export ───
const GrowthTrapStory = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGrowthTrap /> : <DesktopGrowthTrap />;
};

export default GrowthTrapStory;
