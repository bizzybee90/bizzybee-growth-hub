import { useState } from "react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <AnimatedSection className="pt-32 pb-24 bg-background">
        <div className="container mx-auto px-6">
          <AnimatedElement className="text-center mb-16">
            <span className="font-mono-label text-primary mb-3 inline-block">Contact</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's have a chat
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you want a demo, have questions, or just fancy a natter — we'd love to hear from you.
            </p>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <AnimatedElement>
              {submitted ? (
                <div className="p-8 rounded-2xl border border-border-hover bg-primary-glow/10 text-center">
                  <span className="text-4xl mb-4 block">🍯</span>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    We'll get back to you within 24 hours. In the meantime, why not explore our features?
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-mono-label text-muted-foreground block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-border-hover transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-mono-label text-muted-foreground block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-border-hover transition-colors"
                      placeholder="you@business.co.uk"
                    />
                  </div>
                  <div>
                    <label className="font-mono-label text-muted-foreground block mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:border-border-hover transition-colors resize-none"
                      placeholder="Tell us about your business and what you're looking for..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 gradient-honey text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all w-full justify-center"
                  >
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </AnimatedElement>

            <AnimatedElement>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-glow/50 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">Email</h3>
                    <p className="text-sm text-muted-foreground">hello@bizzybee.co.uk</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-glow/50 flex items-center justify-center text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-sm text-muted-foreground">0800 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-glow/50 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-1">Office</h3>
                    <p className="text-sm text-muted-foreground">London, United Kingdom</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-background-alt mt-8">
                  <h3 className="text-sm font-bold text-foreground mb-2">Prefer a quick demo?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Book a 15-minute call and we'll show you exactly how BizzyBee works for your type of business.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Contact;
