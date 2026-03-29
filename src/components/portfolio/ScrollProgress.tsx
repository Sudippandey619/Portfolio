import { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
        background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--mint)), hsl(var(--primary)))",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};
