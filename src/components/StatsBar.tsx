import { AnimatedSection, AnimatedElement } from "@/lib/motion";

const stats = [
  { value: "2,400+", label: "Businesses using BizzyBee" },
  { value: "1.2M", label: "Messages handled monthly" },
  { value: "< 8s", label: "Average response time" },
  { value: "96%", label: "Customer satisfaction" },
];

const StatsBar = () => (
  <AnimatedSection className="py-16 gradient-honey">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <AnimatedElement key={i} className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-primary-foreground block">
              {stat.value}
            </span>
            <span className="text-sm text-primary-foreground/80 mt-1 block">{stat.label}</span>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default StatsBar;
