import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Briefcase, Award, Code, Image, ChevronDown, ChevronUp, Terminal } from "lucide-react";
import { SlideUpText, AnimatedWords } from "./TextAnimations";

const timeline = [
  {
    year: "2025",
    title: "Freelance Developer",
    organization: "Self-Employed",
    description: "Building web applications for clients using MERN stack, React, TypeScript, and modern frontend solutions. 1+ year of professional experience.",
    type: "work",
    icon: Briefcase,
    color: "bg-primary",
  },
  {
    year: "2024",
    title: "Learning & Growth",
    organization: "Self-Taught",
    description: "Deep dive into Next.js, TypeScript, advanced React patterns, and AI integration. Completed multiple client and personal projects.",
    type: "learning",
    icon: Code,
    color: "bg-mint-foreground",
  },
  {
    year: "2023",
    title: "Diploma in Computer Application",
    organization: "Certified",
    description: "Completed Diploma in Computer Application covering programming fundamentals, database management, and software development.",
    type: "education",
    icon: GraduationCap,
    color: "bg-peach-foreground",
  },
  {
    year: "2022",
    title: "BSc CSIT — Enrolled",
    organization: "University",
    description: "Joined Bachelor's in Computer Science & Information Technology (BSc CSIT) program. Currently pursuing the degree.",
    type: "education",
    icon: GraduationCap,
    color: "bg-sky-foreground",
  },
  {
    year: "2021",
    title: "Frontend Development Journey",
    organization: "Self-Taught",
    description: "Started learning HTML, CSS, JavaScript, and React. Built first portfolio and web projects.",
    type: "learning",
    icon: Code,
    color: "bg-blush-foreground",
  },
];

const certifications = [
  {
    name: "Diploma in Computer Application",
    hasImage: true,
    imageSlot: "diploma-computer-application",
  },
  {
    name: "Diploma in Computer Architecture",
    hasImage: true,
    imageSlot: "diploma-computer-architecture",
  },
  {
    name: "1 Year Experience Certificate",
    hasImage: true,
    imageSlot: "experience-certificate",
  },
  {
    name: "JavaScript Algorithms & Data Structures",
    hasImage: false,
    imageSlot: "",
  },
];

export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCert, setExpandedCert] = useState<string | null>(null);

  return (
    <section id="experience" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-lavender-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <SlideUpText className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            My Journey
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <AnimatedWords text="Experience & Education" delay={0.2} />
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my learning journey and professional growth
          </p>
        </SlideUpText>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {/* Timeline items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center shadow-card`}
                    >
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-card transition-shadow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                          {item.year}
                        </span>
                        <span className="text-sm text-primary font-medium">
                          {item.organization}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-3xl p-6 border border-border shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Certifications
                </h3>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <button
                      onClick={() => cert.hasImage && setExpandedCert(expandedCert === cert.imageSlot ? null : cert.imageSlot)}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left ${cert.hasImage ? 'cursor-pointer' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm text-foreground">{cert.name}</span>
                      </div>
                      {cert.hasImage && (
                        expandedCert === cert.imageSlot
                          ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                    
                    {/* Certificate Image Slot */}
                    {cert.hasImage && expandedCert === cert.imageSlot && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 rounded-xl overflow-hidden border border-border bg-muted/30"
                      >
                        <div className="aspect-[4/3] flex items-center justify-center p-4">
                          <div className="text-center text-muted-foreground">
                            <Image className="h-10 w-10 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Certificate image coming soon</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal-Style Quick Stats */}
            <div className="bg-[#0d1117] rounded-2xl p-5 border border-[#30363d] shadow-card overflow-hidden">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 mb-1 pb-3 border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[#8b949e] text-xs font-mono ml-2">system_stats.exe</span>
              </div>

              {/* Terminal output */}
              <div className="font-mono text-xs space-y-1.5 pt-3">
                <div className="text-[#8b949e]">
                  <span className="text-[#58a6ff]">sudip@dev</span>
                  <span className="text-[#8b949e]">:</span>
                  <span className="text-[#7ee787]">~</span>
                  <span className="text-[#8b949e]">$ </span>
                  <span className="text-[#c9d1d9]">cat stats.json</span>
                </div>
                <div className="text-[#8b949e] pl-2">{"{"}</div>
                {[
                  { label: "projects_completed", value: '"5+"' },
                  { label: "clients_served", value: '"10+"' },
                  { label: "experience_years", value: '"1+"' },
                  { label: "degree_status", value: '"BSc CSIT (In Progress)"' },
                  { label: "coffee_consumed", value: '"∞"' },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className="pl-4">
                    <span className="text-[#7ee787]">"{stat.label}"</span>
                    <span className="text-[#8b949e]">: </span>
                    <span className="text-[#ffa657]">{stat.value}</span>
                    {i < arr.length - 1 && <span className="text-[#8b949e]">,</span>}
                  </div>
                ))}
                <div className="text-[#8b949e] pl-2">{"}"}</div>
                <div className="text-[#8b949e] mt-2">
                  <span className="text-[#58a6ff]">sudip@dev</span>
                  <span className="text-[#8b949e]">:</span>
                  <span className="text-[#7ee787]">~</span>
                  <span className="text-[#8b949e]">$ </span>
                  <span className="animate-pulse text-[#c9d1d9]">▌</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
