import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./TextAnimations";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that follows best practices",
    color: "bg-lavender-light",
    iconColor: "text-primary",
  },
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Finding creative solutions to complex technical challenges",
    color: "bg-mint",
    iconColor: "text-mint-foreground",
  },
  {
    icon: Rocket,
    title: "Fast Delivery",
    description: "Building and shipping features quickly without compromising quality",
    color: "bg-peach",
    iconColor: "text-peach-foreground",
  },
  {
    icon: Users,
    title: "Team Player",
    description: "Collaborating effectively with designers, PMs, and fellow developers",
    color: "bg-sky",
    iconColor: "text-sky-foreground",
  },
];

export const About = () => {
  const ref = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (cardsRef.current && isInView) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [isInView]);

  return (
    <section id="about" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-lavender-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-mint/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header with scroll-triggered animation */}
        <SectionHeading
          badge="About Me"
          title="Get to Know Me Better"
          description="A passionate developer focused on creating impactful digital experiences"
          className="mb-16"
        />

        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 mb-12"
          >
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-muted-foreground leading-relaxed text-lg">
                I'm a{" "}
                <span className="text-foreground font-semibold">
                  self-motivated developer
                </span>{" "}
                who loves solving problems and building powerful web applications.
                With experience across the full stack, I specialize in modern
                technologies like{" "}
                <span className="text-primary font-medium">
                  React, Next.js, Node.js, and MongoDB
                </span>
                .
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                My goal is to create{" "}
                <span className="text-foreground font-semibold">
                  meaningful digital experiences
                </span>{" "}
                that make people's lives better. I'm passionate about clean code,
                user-centric design, and continuous learning.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                I'm currently looking for{" "}
                <span className="text-primary font-medium">
                  internship opportunities, freelance projects, or full-time roles
                </span>{" "}
                where I can contribute my skills and grow as a developer.
              </p>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-4 bg-card shadow-card rounded-2xl px-8 py-4 border border-border">
                <div className="text-4xl font-bold text-primary">3+</div>
                <div className="text-left">
                  <div className="text-foreground font-medium">Years of Experience</div>
                  <div className="text-sm text-muted-foreground">Building web applications</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="group p-5 rounded-2xl border border-border bg-card hover:shadow-card transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}
                >
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
