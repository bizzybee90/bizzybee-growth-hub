import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Wrench, Scissors, Zap, PaintBucket, Dog, Truck } from "lucide-react";

const trades = [
  { icon: <Wrench className="w-5 h-5" />, label: "Plumbers" },
  { icon: <Zap className="w-5 h-5" />, label: "Electricians" },
  { icon: <PaintBucket className="w-5 h-5" />, label: "Decorators" },
  { icon: <Scissors className="w-5 h-5" />, label: "Hairdressers" },
  { icon: <Dog className="w-5 h-5" />, label: "Pet services" },
  { icon: <Truck className="w-5 h-5" />, label: "Removals" },
];

const WhoItsFor = () => (
  <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 20%, 98%)" }}>
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-14">
        <span
          className="inline-block mb-4 uppercase"
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
        >
          Built for you
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
        >
          Who is BizzyBee for?
        </h2>
        <p style={{ color: "hsl(220, 9%, 50%)", maxWidth: 480, margin: "0 auto" }}>
          Any UK service business that wants to stop losing leads and start delighting customers — without hiring a receptionist.
        </p>
      </AnimatedElement>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {trades.map((trade, i) => (
          <AnimatedElement key={i} variant="scaleIn">
            <div
              className="flex flex-col items-center gap-3 text-center"
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 14,
                padding: "24px 16px",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "hsl(35, 55%, 55%)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "rgba(213,149,67,0.08)", color: "hsl(35, 55%, 55%)",
                }}
              >
                {trade.icon}
              </div>
              <span className="font-medium" style={{ fontSize: 13, color: "hsl(220, 9%, 25%)" }}>
                {trade.label}
              </span>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default WhoItsFor;
