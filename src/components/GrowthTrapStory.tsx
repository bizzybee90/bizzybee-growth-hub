import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ease = [0.16, 1, 0.3, 1] as const;

const stages = [
  {
    title: "You started with a phone and a promise",
    description:
      "Every call answered on the first ring. Every quote sent within the hour. You remembered customers' names, their dog's name, which tap leaked last winter. That personal touch was your superpower — and word spread fast.",
    tension: false,
  },
  {
    title: "Then the enquiries started flooding in",
    description:
      "WhatsApp, Facebook, email, voicemail — your inbox became a war zone. You'd reply to one message and three more would land. You started losing track. The very thing you wanted — growth — was slowly burying you.",
    tension: false,
  },
  {
    title: "Growth = chaos.",
    description:
      "More leads should be exciting. Instead, each new customer adds more chaos to your plate.",
    tension: true,
  },
  {
    title: "Busier — not better.",
    description: `People ask, "You busy?"

You say, "Yeah — flat out."

Because busy means you can't complain.
Busy means demand.
Busy means success.

But behind that?

Unread messages.
Late-night replies.
That constant mental load.

You reply "No problem 👍"
while everything feels like it is.

More jobs.
Same bottleneck.

You're working harder than ever —
and building nothing new.`,
    tension: true,
  },
  {
    title: "The buzz runs out.",
    description:
      "One slow reply. One missed booking. One bad review. It only takes one to undo months of hard work.",
    tension: true,
  },
  {
    title: "Missed messages = missed honey",
    description:
      "Every unanswered enquiry is a job going to a competitor. And they're replying faster than you.",
    tension: false,
  },
  {
    title: "Admin that steals your evenings",
    description:
      "You started a business to do great work — not to spend your nights copy-pasting quotes.",
    tension: false,
  },
];

const meetBizzyBee = {
  title: "BizzyBee gives you your buzz back.",
  description:
    "No more 10pm email marathons.\nNo more lost leads.\n\nJust fast, professional replies that sound like you wrote them — because the AI learned from you.\n\nYour customers get instant answers.\nYou get your evenings back.",
};

// Background colours that shift warmer/darker for tension slides
const getBg = (index: number, isTension: boolean, isFinal: boolean) => {
  if (isFinal) return "hsl(44, 80%, 95%)";
  if (isTension) {
    const darkBgs = [
      "hsl(20, 44%, 14%)",
      "hsl(22, 40%, 12%)",
      "hsl(25, 48%, 16%)",
    ];
    return darkBgs[index % darkBgs.length];
  }
  return index % 2 === 0 ? "hsl(48, 14%, 98%)" : "hsl(0, 0%, 100%)";
};

const getTextColor = (isTension: boolean, isFinal: boolean) =>
  isTension && !isFinal ? "hsl(40, 20%, 92%)" : "hsl(0, 0%, 10%)";

const getSubColor = (isTension: boolean, isFinal: boolean) =>
  isTension && !isFinal ? "hsl(40, 20%, 68%)" : "hsl(220, 9%, 46%)";

// ─── Desktop: alternating left-right slides ───
const DesktopGrowthTrap = () => (
  <div>
    {/* Intro */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true, margin: "-80px" }}
      className="py-32 text-center"
      style={{ backgroundColor: "hsl(48, 14%, 98%)" }}
    >
      <h2
        className="text-2xl md:text-4xl font-bold px-6 max-w-2xl mx-auto"
        style={{ color: "hsl(0, 0%, 10%)" }}
      >
        You didn't start a business to answer emails at 10pm.
      </h2>
    </motion.div>

    {/* Alternating slides */}
    {stages.map((stage, i) => {
      const isOdd = i % 2 === 0; // slides 1,3,5,7 from left
      const bg = getBg(i, stage.tension, false);
      const isDark = stage.tension;

      return (
        <div
          key={i}
          className="py-24 md:py-32"
          style={{ backgroundColor: bg }}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: isOdd ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease, type: "tween" }}
              viewport={{ once: true, margin: "-80px" }}
              className={`max-w-2xl ${isOdd ? "mr-auto" : "ml-auto"}`}
            >
              <h3
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{
                  color: getTextColor(isDark, false),
                  lineHeight: stage.tension ? 1.3 : 1.6,
                  fontWeight: stage.tension ? 700 : 600,
                }}
              >
                {stage.title}
              </h3>
              <p
                className="text-lg md:text-xl whitespace-pre-line"
                style={{
                  color: getSubColor(isDark, false),
                  lineHeight: stage.tension ? 1.5 : 1.8,
                  fontWeight: stage.tension ? 500 : 400,
                }}
              >
                {stage.description}
              </p>
            </motion.div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {[...stages, meetBizzyBee].map((_, j) => (
              <div
                key={j}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: j === i ? 32 : 8,
                  backgroundColor:
                    j === i
                      ? "hsl(35, 58%, 55%)"
                      : isDark
                        ? "hsla(40, 20%, 60%, 0.3)"
                        : "hsla(0, 0%, 10%, 0.15)",
                }}
              />
            ))}
          </div>
        </div>
      );
    })}

    {/* Final: Meet BizzyBee — full width, centred */}
    <div
      className="py-32 md:py-40"
      style={{ backgroundColor: "hsl(44, 80%, 95%)" }}
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, type: "tween" }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3
            className="text-3xl md:text-5xl font-bold mb-8"
            style={{
              color: "hsl(0, 0%, 10%)",
              lineHeight: 1.3,
            }}
          >
            {meetBizzyBee.title}
          </h3>
          <p
            className="text-lg md:text-xl whitespace-pre-line"
            style={{
              color: "hsl(220, 9%, 46%)",
              lineHeight: 1.8,
            }}
          >
            {meetBizzyBee.description}
          </p>
        </motion.div>

        {/* Final dot */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {[...stages, meetBizzyBee].map((_, j) => (
            <div
              key={j}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: j === stages.length ? 32 : 8,
                backgroundColor:
                  j === stages.length
                    ? "hsl(35, 58%, 55%)"
                    : "hsla(0, 0%, 10%, 0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ─── Mobile: stacked cards with gentle fade-up ───
const MobileGrowthTrap = () => (
  <div className="py-20 px-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true }}
      className="text-2xl font-bold text-center mb-16 max-w-md mx-auto"
      style={{ color: "hsl(0, 0%, 10%)" }}
    >
      You didn't start a business to answer emails at 10pm.
    </motion.h2>

    {stages.map((stage, i) => {
      const isDark = stage.tension;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-lg mx-auto mb-12 text-center rounded-2xl p-8"
          style={{
            backgroundColor: isDark ? "hsl(20, 44%, 14%)" : "hsl(48, 14%, 98%)",
          }}
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{
              color: getTextColor(isDark, false),
              lineHeight: stage.tension ? 1.3 : 1.6,
            }}
          >
            {stage.title}
          </h3>
          <p
            className="text-base whitespace-pre-line"
            style={{
              color: getSubColor(isDark, false),
              lineHeight: stage.tension ? 1.5 : 1.8,
            }}
          >
            {stage.description}
          </p>
        </motion.div>
      );
    })}

    {/* Meet BizzyBee */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true, margin: "-60px" }}
      className="max-w-lg mx-auto text-center rounded-2xl p-8"
      style={{ backgroundColor: "hsl(44, 80%, 95%)" }}
    >
      <h3
        className="text-2xl font-bold mb-4"
        style={{ color: "hsl(0, 0%, 10%)", lineHeight: 1.3 }}
      >
        {meetBizzyBee.title}
      </h3>
      <p
        className="text-base whitespace-pre-line"
        style={{ color: "hsl(220, 9%, 46%)", lineHeight: 1.8 }}
      >
        {meetBizzyBee.description}
      </p>
    </motion.div>
  </div>
);

const GrowthTrapStory = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGrowthTrap /> : <DesktopGrowthTrap />;
};

export default GrowthTrapStory;
