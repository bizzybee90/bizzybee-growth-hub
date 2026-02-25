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
  <AnimatedSection className="py-24 md:py-32 bg-background-alt">
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-16">
        <span className="font-mono-label text-primary mb-3 inline-block">Built for you</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Who is BizzyBee for?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Any UK service business that wants to stop losing leads and start delighting customers — without hiring a receptionist.
        </p>
      </AnimatedElement>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
        {trades.map((trade, i) => (
          <AnimatedElement key={i} variant="scaleIn">
            <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-background hover:border-border-hover transition-colors text-center">
              <div className="w-10 h-10 rounded-xl bg-primary-glow/50 flex items-center justify-center text-primary">
                {trade.icon}
              </div>
              <span className="text-sm font-medium text-foreground">{trade.label}</span>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default WhoItsFor;
