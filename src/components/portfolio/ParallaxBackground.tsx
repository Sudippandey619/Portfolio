import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export const ParallaxLayer = ({ children, speed = 0.5, className = "" }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface FloatingShapeProps {
  className?: string;
  delay?: number;
  duration?: number;
  size?: string;
  color?: string;
}

export const FloatingShape = ({ 
  className = "", 
  delay = 0, 
  duration = 6,
  size = "w-32 h-32",
  color = "bg-primary/10"
}: FloatingShapeProps) => {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${size} ${color} ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  showShapes?: boolean;
}

// Section transition variants for smooth animations
const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

export const ParallaxSection = ({ 
  children, 
  className = "",
  showShapes = true 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <div ref={ref} className={`relative overflow-hidden scroll-mt-16 ${className}`}>
      {showShapes && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY, opacity }}
        >
          <FloatingShape 
            className="top-1/4 -left-20" 
            delay={0} 
            size="w-64 h-64"
            color="bg-primary/10"
          />
          <FloatingShape 
            className="top-1/2 -right-20" 
            delay={1} 
            size="w-48 h-48"
            color="bg-mint/20"
          />
          <FloatingShape 
            className="bottom-1/4 left-1/3" 
            delay={2} 
            size="w-40 h-40"
            color="bg-secondary/30"
          />
        </motion.div>
      )}
      <motion.div 
        className="relative z-10"
        variants={sectionVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const ScrollReveal = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Smooth scroll navigation hook
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return { scrollToSection };
};
