import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Hexagon, Mic, GraduationCap, Layers, Brain, RotateCcw } from "lucide-react";

const demos = [
  {
    id: "honeycomb",
    icon: <Hexagon className="w-5 h-5" />,
    label: "Honeycomb Sort",
    title: "Smart inbox that prioritises itself",
    description: "AI-powered triage sorts every message by urgency, intent, and value. Hot leads float to the top. Spam disappears. You focus on what matters.",
    visual: (
      <div className="space-y-3">
        {[
          { tag: "🔥 Hot Lead", msg: "Hi, I need a full bathroom refit — budget £8k", time: "2m ago", priority: true },
          { tag: "📅 Booking", msg: "Can I move my appointment to Friday?", time: "5m ago", priority: false },
          { tag: "💬 Enquiry", msg: "Do you cover the SW19 area?", time: "12m ago", priority: false },
          { tag: "✅ Resolved", msg: "Thanks, the quote looks great!", time: "1h ago", priority: false },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-center gap-3 p-3 rounded-xl border ${item.priority ? "border-border-hover bg-primary-glow/20" : "border-border bg-background"}`}
          >
            <span className="text-xs shrink-0">{item.tag}</span>
            <span className="text-sm text-foreground truncate flex-1">{item.msg}</span>
            <span className="font-mono-label text-muted-foreground shrink-0">{item.time}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "voice",
    icon: <Mic className="w-5 h-5" />,
    label: "AI Draft Voice",
    title: "Replies that sound like you",
    description: "BizzyBee learns your tone of voice from past messages. Every AI draft feels personal, professional, and perfectly on-brand.",
    visual: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl border border-border bg-background-alt">
          <span className="font-mono-label text-muted-foreground block mb-2">Customer message</span>
          <p className="text-sm text-foreground">"Hi mate, got a leaky tap in the kitchen. How much to fix it and when can you come out?"</p>
        </div>
        <div className="p-4 rounded-xl border border-border-hover bg-primary-glow/10">
          <span className="font-mono-label text-primary block mb-2">AI Draft (your voice)</span>
          <p className="text-sm text-foreground">"Hiya! A leaky tap is usually a quick fix — most of the time it's just a washer. I charge £65 for the first hour including callout. I've got a slot Thursday morning or Friday afternoon. Which works best for you? 👍"</p>
        </div>
      </div>
    ),
  },
  {
    id: "training",
    icon: <GraduationCap className="w-5 h-5" />,
    label: "Training Hive",
    title: "Teach your AI in plain English",
    description: "No prompts. No code. Just tell BizzyBee your services, prices, and rules — and it learns instantly.",
    visual: (
      <div className="space-y-3">
        {[
          { label: "Services", value: "Plumbing, Heating, Bathroom Fitting", done: true },
          { label: "Service area", value: "SW London, Surrey, within 15 miles", done: true },
          { label: "Pricing rules", value: "£65/hr first hour, £45/hr after", done: true },
          { label: "Booking rules", value: "Mon-Fri 8am-6pm, emergencies 24/7", done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
            <div>
              <span className="font-mono-label text-muted-foreground block">{item.label}</span>
              <span className="text-sm text-foreground">{item.value}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${item.done ? "bg-green-100 text-green-700" : "bg-primary-glow text-primary"}`}>
              {item.done ? "Trained" : "In progress"}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "omnichannel",
    icon: <Layers className="w-5 h-5" />,
    label: "Omnichannel Flow",
    title: "Every channel, one inbox",
    description: "WhatsApp, Facebook Messenger, email, website chat, and SMS — all flowing into a single, beautiful inbox.",
    visual: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { channel: "WhatsApp", count: 12, color: "bg-green-500" },
          { channel: "Facebook", count: 8, color: "bg-blue-500" },
          { channel: "Email", count: 23, color: "bg-red-400" },
          { channel: "Website Chat", count: 5, color: "bg-primary" },
        ].map((ch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="p-4 rounded-xl border border-border bg-background text-center"
          >
            <div className={`w-3 h-3 rounded-full ${ch.color} mx-auto mb-2`} />
            <span className="text-sm font-medium text-foreground block">{ch.channel}</span>
            <span className="text-2xl font-bold text-foreground">{ch.count}</span>
            <span className="font-mono-label text-muted-foreground block">messages</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    id: "brain",
    icon: <Brain className="w-5 h-5" />,
    label: "Business Brain",
    title: "AI that truly knows your business",
    description: "BizzyBee builds a knowledge graph of your services, customers, and history — getting smarter with every conversation.",
    visual: (
      <div className="p-6 rounded-xl border border-border bg-background text-center">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Knowledge items", value: "247" },
            { label: "Accuracy", value: "96.4%" },
            { label: "Conversations", value: "1,832" },
          ].map((stat, i) => (
            <div key={i}>
              <span className="text-2xl font-bold text-foreground block">{stat.value}</span>
              <span className="font-mono-label text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "feedback",
    icon: <RotateCcw className="w-5 h-5" />,
    label: "Feedback Loop",
    title: "Every correction makes it smarter",
    description: "Approve, edit, or reject AI drafts — and BizzyBee learns from every interaction to get better over time.",
    visual: (
      <div className="space-y-3">
        <div className="p-4 rounded-xl border border-border bg-background">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-label text-muted-foreground">This week's learning</span>
            <span className="text-xs text-green-600 font-medium">↑ 4.2% accuracy</span>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-green-500/20 rounded-full h-2"><div className="bg-green-500 rounded-full h-2 w-[89%]" /></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-mono-label text-muted-foreground">89% approved</span>
            <span className="font-mono-label text-muted-foreground">11% corrected</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-lg border border-green-500 text-green-600 text-sm font-medium">✓ Approve</button>
          <button className="flex-1 py-2 rounded-lg border border-border text-foreground text-sm font-medium">✏️ Edit</button>
          <button className="flex-1 py-2 rounded-lg border border-destructive/30 text-destructive text-sm font-medium">✗ Reject</button>
        </div>
      </div>
    ),
  },
];

const DemoStage = () => {
  const [active, setActive] = useState(0);

  return (
    <AnimatedSection className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <span className="font-mono-label text-primary mb-3 inline-block">Interactive demos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See BizzyBee in action
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Six features that transform how UK service businesses handle customer communications.
          </p>
        </AnimatedElement>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {demos.map((demo, i) => (
            <button
              key={demo.id}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === i
                  ? "gradient-honey text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground bg-background-alt border border-border hover:border-border-hover"
              }`}
            >
              {demo.icon}
              <span className="hidden sm:inline">{demo.label}</span>
            </button>
          ))}
        </div>

        {/* Demo content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{demos[active].title}</h3>
                <p className="text-muted-foreground leading-relaxed">{demos[active].description}</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-background-alt">
                {demos[active].visual}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default DemoStage;
