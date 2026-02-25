import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "24/7 instant replies", bizzy: true, before: false },
  { feature: "Consistent brand voice", bizzy: true, before: false },
  { feature: "Omnichannel inbox", bizzy: true, before: false },
  { feature: "Auto-booking", bizzy: true, before: false },
  { feature: "Smart follow-ups", bizzy: true, before: false },
  { feature: "No missed enquiries", bizzy: true, before: false },
  { feature: "Evenings & weekends free", bizzy: true, before: false },
];

const InboxComparison = () => (
  <AnimatedSection className="py-24 md:py-32 bg-background-alt">
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-16">
        <span className="font-mono-label text-primary mb-3 inline-block">Before vs After</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Your inbox, transformed
        </h2>
      </AnimatedElement>

      <AnimatedElement className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-border overflow-hidden bg-background">
          <div className="grid grid-cols-3 p-4 border-b border-border bg-background-alt">
            <span className="text-sm font-medium text-foreground" />
            <span className="text-sm font-medium text-center text-muted-foreground">Without BizzyBee</span>
            <span className="text-sm font-medium text-center text-primary">With BizzyBee 🐝</span>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-3 p-4 border-b border-border last:border-0 items-center">
              <span className="text-sm text-foreground">{row.feature}</span>
              <div className="flex justify-center">
                <X className="w-5 h-5 text-destructive/50" />
              </div>
              <div className="flex justify-center">
                <Check className="w-5 h-5 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </AnimatedElement>
    </div>
  </AnimatedSection>
);

export default InboxComparison;
