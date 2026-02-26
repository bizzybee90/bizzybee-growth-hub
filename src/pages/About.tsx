import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import FinalCTA from "@/components/FinalCTA";
import StatsBar from "@/components/StatsBar";

const About = () => (
  <main>
    <AnimatedSection className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement>
            <span className="font-mono-label text-primary mb-3 inline-block">Our Story</span>
          </AnimatedElement>
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              We built BizzyBee because we lived the problem
            </h1>
          </AnimatedElement>
          <AnimatedElement>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                BizzyBee was born from frustration. Our founders ran service businesses across the UK — plumbing, electrical, cleaning — and every single one hit the same wall: more customers meant more chaos.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Messages from five different channels. Quotes typed out on the sofa at 10 PM. Leads going cold because you couldn't reply fast enough. Sound familiar?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We knew AI could fix this — but every solution on the market was built for enterprise. None of them understood the reality of a sole trader or small team juggling tools, vans, and a million WhatsApp messages.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                So we built BizzyBee: an AI customer service hub designed from the ground up for UK service businesses. It's simple enough to set up in an hour, smart enough to sound exactly like you, and affordable enough for any business.
              </p>
              <p className="text-foreground leading-relaxed font-medium">
                Today, thousands of UK businesses trust BizzyBee to handle their customer communications — so they can focus on the work they love.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </AnimatedSection>
    <StatsBar />
    <FinalCTA />
  </main>
);

export default About;
