import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      // Find active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll with easing
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Update active section immediately for responsive feel
      setActiveSection(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3"
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group flex items-center gap-3"
          aria-label={`Navigate to ${section.label}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md border border-border/50"
          >
            {section.label}
          </motion.span>

          {/* Dot */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Active glow */}
            {activeSection === section.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -inset-1.5 bg-primary/30 rounded-full blur-sm"
                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
              />
            )}
            
            {/* Progress ring for active section */}
            {activeSection === section.id && (
              <motion.div
                className="absolute -inset-2 border-2 border-primary/50 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
            
            {/* Dot */}
            <motion.div
              className={`relative w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                activeSection === section.id
                  ? "bg-primary"
                  : "bg-muted-foreground/40 group-hover:bg-muted-foreground"
              }`}
              animate={{
                scale: activeSection === section.id ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </motion.div>
        </motion.button>
      ))}
    </motion.div>
  );
};
