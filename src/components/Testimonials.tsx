import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "BizzyBee changed everything. I used to spend 3 hours a night replying to enquiries. Now my AI handles 90% of them and my bookings have doubled.",
    name: "James T.",
    role: "Plumbing & Heating, Surrey",
    rating: 5,
  },
  {
    quote: "The AI sounds exactly like me. Customers can't tell the difference. I've gone from missing leads to converting them in minutes — even at 2 AM.",
    name: "Sarah M.",
    role: "Dog Grooming, Bristol",
    rating: 5,
  },
  {
    quote: "Set-up took about 45 minutes. That evening, BizzyBee booked three jobs while I was at my daughter's football match. Absolute game-changer.",
    name: "David R.",
    role: "Electrical Services, Manchester",
    rating: 5,
  },
];

const Testimonials = () => (
  <AnimatedSection className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-6">
      <AnimatedElement className="text-center mb-16">
        <span className="font-mono-label text-primary mb-3 inline-block">Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Trusted by UK service businesses
        </h2>
      </AnimatedElement>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <AnimatedElement key={i} variant="scaleIn">
            <div className="p-8 rounded-2xl border border-border bg-background hover:border-border-hover transition-colors h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-6 flex-1">"{t.quote}"</p>
              <div>
                <span className="text-sm font-bold text-foreground block">{t.name}</span>
                <span className="font-mono-label text-muted-foreground">{t.role}</span>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  </AnimatedSection>
);

export default Testimonials;
