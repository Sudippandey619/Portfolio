import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Star, Send, Terminal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SlideUpText, AnimatedWords } from "./TextAnimations";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  date: string;
}

export const Testimonials = () => {
  const ref = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    quote: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cardsRef.current && isInView && testimonials.length > 0) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, [isInView, testimonials.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      ...formData,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ name: "", role: "", company: "", quote: "", rating: 5 });
    setShowForm(false);
    setIsSubmitting(false);

    toast({
      title: "Thank you for your feedback!",
      description: "Your testimonial has been added successfully.",
    });
  };

  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-lavender-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-peach/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <SlideUpText className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <AnimatedWords text="What People Say" delay={0.2} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Real feedback from people I've worked with — leave yours below!
          </p>

          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white font-mono text-sm transition-colors"
          >
            <Terminal className="h-4 w-4" />
            {showForm ? "$ cancel" : "$ write_testimonial"}
          </button>
        </SlideUpText>

        {/* Terminal Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="max-w-xl mx-auto mb-12"
          >
            <form onSubmit={handleSubmit} className="bg-[#0d1117] rounded-2xl p-6 border border-[#30363d] shadow-card font-mono">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[#8b949e] text-xs ml-2">submit_testimonial.sh</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1 text-xs text-[#8b949e] mb-2">
                      <span className="text-[#58a6ff]">$</span> echo $NAME
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="rounded-lg bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-[#8b949e] mb-2">
                      <span className="text-[#58a6ff]">$</span> echo $ROLE
                    </label>
                    <Input
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="Developer"
                      className="rounded-lg bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff]"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">$</span> echo $COMPANY
                  </label>
                  <Input
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="rounded-lg bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">$</span> cat {">"} feedback.txt
                  </label>
                  <Textarea
                    required
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    placeholder="Share your experience..."
                    className="rounded-lg min-h-[100px] resize-none bg-[#161b22] border-[#30363d] text-[#c9d1d9] placeholder:text-[#484f58] font-mono text-sm focus:border-[#58a6ff]"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1 text-xs text-[#8b949e] mb-2">
                    <span className="text-[#58a6ff]">$</span> set_rating --stars
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating
                              ? "text-[#febc2e] fill-[#febc2e]"
                              : "text-[#484f58]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-mono rounded-lg border-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span className="text-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      <span className="text-sm">$ submit_testimonial</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Testimonials Grid or Empty State */}
        {testimonials.length > 0 ? (
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#0d1117] rounded-2xl p-6 border border-[#30363d] hover:border-[#58a6ff]/30 transition-all font-mono"
              >
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#30363d]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[#8b949e] text-[10px] ml-2">testimonial_{testimonial.id}.log</span>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  <span className="text-[#8b949e] text-xs mr-1">rating:</span>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-[#febc2e] fill-[#febc2e]" />
                  ))}
                </div>

                {/* Quote */}
                <div className="mb-4">
                  <span className="text-[#7ee787] text-xs">$ cat feedback.txt</span>
                  <p className="text-[#c9d1d9] text-sm leading-relaxed mt-1 italic">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="pt-3 border-t border-[#30363d]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center">
                      <span className="text-sm font-bold text-[#58a6ff]">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-[#c9d1d9] text-sm font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-[#8b949e] text-xs">
                        {testimonial.role} @ {testimonial.company}
                      </div>
                      <div className="text-[#484f58] text-[10px] mt-0.5">
                        {testimonial.date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-[#0d1117] rounded-2xl p-8 border border-[#30363d] font-mono text-center">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-[#30363d] justify-center">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[#8b949e] text-xs ml-2">testimonials.log</span>
              </div>
              <div className="text-[#8b949e] text-sm mb-2">
                <span className="text-[#58a6ff]">$</span> cat testimonials.log
              </div>
              <p className="text-[#484f58] text-sm mb-4">
                // No entries found
              </p>
              <p className="text-[#7ee787] text-sm mb-6">
                Be the first to share your experience!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#238636] hover:bg-[#2ea043] text-white text-sm transition-colors"
              >
                <Send className="h-4 w-4" />
                $ write_testimonial
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
