import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./TextAnimations";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

// Import project thumbnails
import portfolioThumbnail from "@/assets/projects/portfolio-thumbnail.jpg";
import mrsagentThumbnail from "@/assets/projects/mrsagent-thumbnail.png";
import autoluxThumbnail from "@/assets/projects/autolux-thumbnail.png";
import kisanconnectThumbnail from "@/assets/projects/kisanconnect-thumbnail.png";
import joobportalThumbnail from "@/assets/projects/joobportal-thumbnail.png";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    shortDescription: "Modern portfolio showcasing projects, skills, and professional journey",
    thumbnail: portfolioThumbnail,
    problem: "Needed a professional online presence to showcase skills and attract recruiters and clients",
    solution: "Built a modern, responsive portfolio with smooth GSAP animations, dark mode, and optimized performance",
    techStack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "GSAP"],
    role: "Full-Stack Developer",
    contribution: "Designed and developed the entire website from scratch with custom animations",
    liveUrl: "https://sudippandey.info.np",
    githubUrl: "https://github.com/Sudippandey619",
    color: "from-primary/20 to-secondary/20",
  },
  {
    id: 2,
    title: "Mr S Agent",
    shortDescription: "AI-powered chatbot assistant with coding, learning, writing, and research capabilities",
    thumbnail: mrsagentThumbnail,
    problem: "Users needed an intelligent AI assistant for coding help, learning, writing, and research tasks",
    solution: "Built an interactive AI chatbot with chat history, user authentication, and multi-category assistance",
    techStack: ["React", "Node.js", "AI/ML", "Tailwind CSS", "Authentication"],
    role: "Full-Stack Developer",
    contribution: "Developed the full chatbot interface, AI integration, and user authentication system",
    liveUrl: "https://mr-s-agent.vercel.app/",
    githubUrl: "https://github.com/Sudippandey619/mr-s-agent",
    color: "from-mint/30 to-sky/30",
  },
  {
    id: 3,
    title: "AutoLux",
    shortDescription: "Premium automobiles marketplace with AI-powered car buying experience",
    thumbnail: autoluxThumbnail,
    problem: "Car buyers needed a modern, feature-rich platform to discover and purchase premium vehicles",
    solution: "Created a luxury car marketplace with search, filtering, 3D visualization, and seller dashboard",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    role: "Full-Stack Developer",
    contribution: "Built the complete marketplace with car listings, search, seller dashboard, and authentication",
    liveUrl: "https://auto-lux-lyart.vercel.app/",
    githubUrl: "https://github.com/Sudippandey619/auto-lux",
    color: "from-peach/30 to-blush/30",
  },
  {
    id: 4,
    title: "Kisan Connect",
    shortDescription: "Farm-to-home fresh produce marketplace connecting farmers directly with consumers",
    thumbnail: kisanconnectThumbnail,
    problem: "Farmers lacked a direct channel to sell fresh produce, while consumers paid high prices to middlemen",
    solution: "Built a Nepali marketplace connecting certified farmers directly with consumers for fair-priced fresh produce",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Supabase", "i18n"],
    role: "Full-Stack Developer",
    contribution: "Developed the bilingual platform with farmer verification, product listings, and order management",
    liveUrl: "https://kisanconnect-nine.vercel.app/",
    githubUrl: "https://github.com/Sudippandey619/kisan-connect",
    color: "from-lavender-light to-mint/30",
  },
  {
    id: 5,
    title: "Joob Portal",
    shortDescription: "AI-powered job search platform with smart recommendations and company listings",
    thumbnail: joobportalThumbnail,
    problem: "Job seekers in Nepal needed a modern, AI-powered platform to find relevant job opportunities efficiently",
    solution: "Built a comprehensive job portal with AI search, category browsing, company profiles, and user dashboards",
    techStack: ["React", "TypeScript", "Tailwind CSS", "AI/ML", "Supabase"],
    role: "Full-Stack Developer",
    contribution: "Developed the job search engine, company listings, AI recommendations, and responsive UI",
    liveUrl: "https://joobpotral.vercel.app/",
    githubUrl: "https://github.com/Sudippandey619/joob-portal",
    color: "from-sky/30 to-primary/20",
  },
];

// 3D Tilt Card Component
const TiltCard = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Shine effect position
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.15) 0%, transparent 50%)`,
        }}
      />
    </motion.div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  // Show skeleton while not in view or image not loaded
  if (!isInView) {
    return (
      <div ref={cardRef}>
        <ProjectCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          ease: [0.25, 0.4, 0.25, 1]
        }}
        className="perspective-1000"
      >
        <TiltCard className="group">
          <div className="relative bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:shadow-hover transition-all duration-300">
            {/* Thumbnail with loading skeleton */}
            <div className="relative h-56 overflow-hidden" style={{ transform: "translateZ(20px)" }}>
              {/* Skeleton placeholder */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse" />
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay z-10`} />
              <motion.img
                src={project.thumbnail}
                alt={project.title}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 z-20" />
              
              {/* Floating badge on hover */}
              <motion.div
                className="absolute top-4 right-4 z-30"
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                whileHover={{ opacity: 1, scale: 1, y: 0 }}
              >
                <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full shadow-lg">
                  {project.role}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6" style={{ transform: "translateZ(30px)" }}>
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">{project.shortDescription}</p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="heroOutline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="group/btn"
                >
                  <span className="relative overflow-hidden">
                    <motion.span 
                      className="inline-block"
                      whileHover={{ y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      View Case Study
                    </motion.span>
                  </span>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="hover:scale-110 transition-transform">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Border glow effect on hover */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none" />
          </div>
        </TiltCard>
      </motion.div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay z-10`} />
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-primary font-medium">{project.role}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  The Problem
                </h4>
                <p className="text-muted-foreground">{project.problem}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  The Solution
                </h4>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                  My Contribution
                </h4>
                <p className="text-muted-foreground">{project.contribution}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="hero" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="heroOutline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header with scroll-triggered animation */}
        <SectionHeading
          badge="My Projects"
          title="Featured Work"
          description="A selection of projects that showcase my skills and problem-solving approach"
          className="mb-16"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
