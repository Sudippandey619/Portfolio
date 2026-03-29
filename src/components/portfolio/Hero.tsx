import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { useRef } from "react";
import profileImage from "@/assets/profile-hero.png";
import { Button } from "@/components/ui/button";
import { 
  TypewriterText, 
  WavingHand, 
  SlideUpText, 
  AnimatedLetters,
  RotatingWords,
  GlowingUnderline 
} from "./TextAnimations";

export const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for background elements
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgY3 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
    >
      {/* Parallax decorative blobs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: bgOpacity }}
      >
        <motion.div
          style={{ y: bgY1, scale: bgScale }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgY2 }}
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-mint/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgY3, scale: bgScale }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl"
        />
        
        {/* Additional parallax layers for depth */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -60]) }}
          className="absolute bottom-32 right-32 w-48 h-48 bg-mint/10 rounded-full blur-2xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 120]) }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
        />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <SlideUpText delay={0.2}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Available for opportunities
              </div>
            </SlideUpText>

            {/* Headline */}
            <SlideUpText delay={0.3} className="mb-2">
              <p className="text-lg sm:text-xl text-muted-foreground font-medium tracking-wide">
                Hello, I'm
              </p>
            </SlideUpText>

            <SlideUpText delay={0.35} className="mb-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <GlowingUnderline>
                  <span className="text-gradient">Sudip Pandey</span>
                </GlowingUnderline>
              </h1>
            </SlideUpText>

            {/* Role with terminal typing */}
            <SlideUpText delay={0.4} className="mb-4">
              <p className="text-xl sm:text-2xl font-semibold">
                <RotatingWords 
                  words={["Full-Stack Developer", "MERN Developer", "React Specialist", "Problem Solver"]} 
                />
              </p>
            </SlideUpText>

            {/* Description */}
            <SlideUpText delay={0.5} className="mb-8">
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                I craft fast, scalable, and user-friendly web applications with modern technologies — turning ideas into polished digital experiences.
              </p>
            </SlideUpText>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("#projects")}
              >
                View Projects
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                asChild
              >
                <a
                  href="/SudipPandey_Resume.pdf"
                  download="SudipPandey_Resume.pdf"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Terminal-style stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 max-w-md mx-auto lg:mx-0"
            >
              <div className="bg-[#0d1117] rounded-xl border border-[#30363d] overflow-hidden font-mono shadow-card">
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#30363d] bg-[#161b22]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[#8b949e] text-xs ml-2">sudip@portfolio:~</span>
                </div>
                {/* Terminal content */}
                <div className="p-4 space-y-1.5 text-sm">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    <span className="text-[#7ee787]">❯</span>{" "}
                    <span className="text-[#c9d1d9]">whoami</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                    <span className="text-[#8b949e]">→ Full-Stack Developer | MERN Specialist</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="pt-1">
                    <span className="text-[#7ee787]">❯</span>{" "}
                    <span className="text-[#c9d1d9]">cat stats.json</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-[#8b949e] pl-2">
                    {"{"}<br />
                    &nbsp;&nbsp;<span className="text-[#58a6ff]">"experience"</span>: <span className="text-[#7ee787]">"1+ years"</span>,<br />
                    &nbsp;&nbsp;<span className="text-[#58a6ff]">"projects"</span>: <span className="text-[#7ee787]">"5+"</span>,<br />
                    &nbsp;&nbsp;<span className="text-[#58a6ff]">"technologies"</span>: <span className="text-[#7ee787]">"10+"</span>,<br />
                    &nbsp;&nbsp;<span className="text-[#58a6ff]">"status"</span>: <span className="text-[#7ee787]">"open_to_work"</span><br />
                    {"}"}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="pt-1 flex items-center gap-1"
                  >
                    <span className="text-[#7ee787]">❯</span>{" "}
                    <motion.span
                      className="inline-block w-2 h-4 bg-[#58a6ff]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-mint/20 to-secondary/20 rounded-full blur-xl" />
              
              {/* Image container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-card"
              >
                <img
                  src={profileImage}
                  alt="Sudip Pandey"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Static tech stack badges below image */}
              <div className="flex gap-3 mt-6 justify-center">
                {[
                  { emoji: "⚛️", label: "React" },
                  { emoji: "🚀", label: "Next.js" },
                  { emoji: "🌿", label: "Node.js" },
                ].map((tech, i) => (
                  <motion.div
                    key={tech.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="bg-card shadow-card rounded-xl px-3 py-1.5 border border-border flex items-center gap-1.5"
                  >
                    <span className="text-lg">{tech.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{tech.label}</span>
                  </motion.div>
                ))
                }
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
