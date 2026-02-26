import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Mail, BellRing, Smartphone, CheckCircle2 } from "lucide-react";

export const GrowthTrapStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.56, 0.7, 0.84, 1],
    ["#fdf8f0", "#fdf8f0", "#3a2618", "#1f140d", "#4a3018", "#ffffff"]
  );

  const textColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.56, 0.84, 1],
    ["#66452a", "#66452a", "#fdf8f0", "#fdf8f0", "#66452a"]
  );

  const opacity1 = useTransform(scrollYProgress, [0, 0.04, 0.10, 0.14], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.04, 0.10, 0.14], [40, 0, 0, -40]);

  const opacity2 = useTransform(scrollYProgress, [0.14, 0.18, 0.24, 0.28], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.14, 0.18, 0.24, 0.28], [40, 0, 0, -40]);

  const opacity3 = useTransform(scrollYProgress, [0.28, 0.32, 0.38, 0.42], [0, 1, 1, 0]);
  const scale3 = useTransform(scrollYProgress, [0.28, 0.38], [0.95, 1.05]);

  const opacity4 = useTransform(scrollYProgress, [0.42, 0.46, 0.52, 0.56], [0, 1, 1, 0]);

  const opacity5 = useTransform(scrollYProgress, [0.56, 0.60, 0.66, 0.70], [0, 1, 1, 0]);
  const trapScale = useTransform(scrollYProgress, [0.56, 0.70], [1.1, 0.95]);

  const opacity6 = useTransform(scrollYProgress, [0.70, 0.74, 0.80, 0.84], [0, 1, 1, 0]);

  const opacity7 = useTransform(scrollYProgress, [0.84, 0.88, 1, 1], [0, 1, 1, 1]);
  const y7 = useTransform(scrollYProgress, [0.84, 0.88], [40, 0]);

  return (
    <div ref={containerRef} className="relative h-[700vh] w-full">
      <motion.div
        style={{ backgroundColor, color: textColor }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-200"
      >
        {/* 1️⃣ THE BEGINNING */}
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center max-w-2xl px-6">
          <h2 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">You started with a phone and a promise.</h2>
          <p className="text-lg md:text-xl font-medium opacity-80 leading-relaxed">
            Every call answered on the first ring.<br />
            Every quote sent within the hour.<br />
            You remembered customers' names — their dog's name — which tap leaked last winter.<br />
            That personal touch was your superpower.<br />
            And word spread fast.
          </p>
        </motion.div>

        {/* 2️⃣ THE GROWTH */}
        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute text-center max-w-2xl px-6 flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight">Then the enquiries started flooding in.</h2>
          <p className="text-lg md:text-xl font-medium opacity-80 leading-relaxed mb-12">
            WhatsApp. Facebook. Email. Voicemail.<br />
            You reply to one message — three more land.<br />
            The thing you wanted — growth — starts pulling at every corner of your day.
          </p>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm"><MessageCircle className="w-6 h-6" /></div>
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm"><Mail className="w-6 h-6" /></div>
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm"><Smartphone className="w-6 h-6" /></div>
          </div>
        </motion.div>

        {/* 3️⃣ THE TIPPING POINT */}
        <motion.div style={{ opacity: opacity3, scale: scale3 }} className="absolute text-center max-w-2xl px-6">
          <div className="absolute -inset-20 flex flex-wrap items-center justify-center gap-8 opacity-20 pointer-events-none blur-[2px]">
            <div className="text-red-500 font-bold text-4xl">47 Unread</div>
            <div className="text-green-500 font-bold text-4xl">18 WhatsApps</div>
            <BellRing className="w-16 h-16 text-amber-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight relative z-10">And then it tipped.</h2>
          <p className="text-xl md:text-2xl font-medium opacity-90 leading-relaxed relative z-10">
            You stop taking new work — not because the demand isn't there… but because you can't keep up.<br />
            You tell yourself you'll reply later.<br />
            Later becomes tomorrow.<br />
            Tomorrow becomes lost.
          </p>
        </motion.div>

        {/* 4️⃣ YOUR "LAST ONE" MOMENT */}
        <motion.div style={{ opacity: opacity4 }} className="absolute text-center max-w-2xl px-6">
          <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight">Busier — not better.</h2>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed text-left mx-auto max-w-md">
            People ask, "You busy?"<br />
            You say, "Yeah — flat out."<br />
            Because busy means demand. Success. You can't complain.<br /><br />
            But behind that?<br />
            Unread messages. Late-night replies. Quotes meant for yesterday.<br />
            You type "No problem 👍" while everything feels like it is.
          </p>
        </motion.div>

        {/* 5️⃣ NOW YOU'RE TRAPPED */}
        <motion.div style={{ opacity: opacity5, scale: trapScale }} className="absolute w-full h-full flex flex-col items-center justify-center px-6">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#d59543 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight text-[#d59543] z-10 drop-shadow-lg">Now you're trapped.</h2>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl text-center z-10 font-medium text-[#fdf8f0]">
            You built it from nothing. It was yours.<br />
            But now you're rushing jobs. Missing messages.<br />
            Losing leads you would've won a year ago.<br /><br />
            <span className="text-2xl opacity-100 font-serif text-[#d59543]">The business you loved starts to feel like a cage.</span>
          </p>
        </motion.div>

        {/* 6️⃣ THE REVERSAL */}
        <motion.div style={{ opacity: opacity6 }} className="absolute text-center max-w-2xl px-6">
          <div className="absolute inset-0 bg-[#d59543] opacity-20 blur-[100px] rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
          <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight relative z-10 text-[#fdf8f0]">There's a smarter way to grow.</h2>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed relative z-10 text-[#fdf8f0]">
            Growth shouldn't steal your evenings.<br />
            It should give you momentum.<br />
            You don't need more hours.<br />
            <span className="text-[#d59543] font-bold">You need support.</span>
          </p>
        </motion.div>

        {/* 7️⃣ THE WAY OUT */}
        <motion.div style={{ opacity: opacity7, y: y7 }} className="absolute text-center max-w-4xl px-6 w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-[#d59543] rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(213,149,67,0.4)] mb-8">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight text-[#66452a]">Meet BizzyBee.</h2>
          <p className="text-xl opacity-80 leading-relaxed max-w-2xl text-[#66452a] font-medium">
            BizzyBee reads your messages, understands what customers need, and drafts replies in your voice.<br /><br />
            No more 10pm email marathons. No more lost leads. Your customers get instant answers.<br />
            <span className="font-bold text-[#d59543]">You get your evenings back.</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GrowthTrapStory;
