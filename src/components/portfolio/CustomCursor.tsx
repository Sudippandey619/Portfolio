import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Separate spring for the outer ring with more lag
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-magnetic], [data-cursor-text]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          const text = el.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    };

    addHoverListeners();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [moveCursor, isMobile]);

  // Re-attach listeners when DOM changes
  useEffect(() => {
    if (isMobile) return;

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-magnetic], [data-cursor-text]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          const text = el.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorText("");
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot with gradient */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.6 : isHovering ? 0.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div 
            className={`rounded-full transition-all duration-200 ${
              isHovering 
                ? "w-3 h-3 bg-primary" 
                : "w-3 h-3 bg-foreground"
            }`}
            style={{
              boxShadow: isHovering 
                ? "0 0 20px hsl(var(--primary) / 0.5)" 
                : "0 0 10px hsl(var(--foreground) / 0.2)"
            }}
          />
        </motion.div>
      </motion.div>

      {/* Outer ring with trailing effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div 
            className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
              isHovering 
                ? "w-16 h-16 border-primary bg-primary/5 backdrop-blur-sm" 
                : "w-8 h-8 border-foreground/30"
            }`}
            animate={{
              rotate: isHovering ? 90 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Cursor text when hovering with data-cursor-text */}
            <AnimatePresence>
              {cursorText && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-medium text-primary whitespace-nowrap"
                >
                  {cursorText}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Click ripple effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
          >
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50"
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{ width: 60, height: 60, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

// Magnetic button wrapper component
export const MagneticWrapper = ({ 
  children, 
  strength = 0.3 
}: { 
  children: React.ReactNode; 
  strength?: number;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic
    >
      {children}
    </motion.div>
  );
};
