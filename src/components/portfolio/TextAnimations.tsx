import { motion, useInView, Variants, Transition } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

// Audio context for typing sounds
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

const playTypingSound = () => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Soft click sound
    oscillator.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
    oscillator.type = "sine";
    
    gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Silently fail if audio isn't available
  }
};

// Typewriter effect component with typing sound
export const TypewriterText = ({ 
  text, 
  delay = 0,
  speed = 50,
  className = "",
  enableSound = true
}: { 
  text: string; 
  delay?: number;
  speed?: number;
  className?: string;
  enableSound?: boolean;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Enable sound after first user interaction
  useEffect(() => {
    const enableAudio = () => {
      setSoundEnabled(true);
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
    window.addEventListener("click", enableAudio);
    window.addEventListener("keydown", enableAudio);
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("keydown", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (isInView && !started) {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }
  }, [isInView, delay, started]);

  useEffect(() => {
    if (started && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Play typing sound
        if (enableSound && soundEnabled && text[currentIndex] !== " ") {
          playTypingSound();
        }
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [started, currentIndex, text, speed, enableSound, soundEnabled]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {started && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle"
        />
      )}
    </span>
  );
};

// Letter-by-letter reveal animation
export const AnimatedLetters = ({ 
  text, 
  delay = 0,
  className = "",
  staggerDelay = 0.03
}: { 
  text: string; 
  delay?: number;
  className?: string;
  staggerDelay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      } as Transition,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ 
            transformOrigin: "bottom",
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Word-by-word reveal animation
export const AnimatedWords = ({ 
  text, 
  delay = 0,
  className = "",
  staggerDelay = 0.1
}: { 
  text: string; 
  delay?: number;
  className?: string;
  staggerDelay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(10px)",
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      } as Transition,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Gradient text with shimmer effect
export const ShimmerText = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="text-gradient">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      />
    </span>
  );
};

// Slide up reveal animation
export const SlideUpText = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Scale and fade reveal
export const ScaleReveal = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Waving hand emoji animation
export const WavingHand = () => {
  return (
    <motion.span
      className="inline-block origin-bottom-right"
      animate={{ 
        rotate: [0, 14, -8, 14, -4, 10, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      }}
    >
      👋
    </motion.span>
  );
};

// Bouncing text effect
export const BouncingText = ({ 
  text, 
  className = "" 
}: { 
  text: string;
  className?: string;
}) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            delay: index * 0.05,
            ease: "easeOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

// Glowing underline animation
export const GlowingUnderline = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-primary"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
      />
    </span>
  );
};

// Rotating words with terminal-style typing & deleting effect
export const RotatingWords = ({ 
  words,
  className = "" 
}: { 
  words: string[];
  className?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentIndex];
    
    if (!isDeleting && displayText === currentWord) {
      // Pause before deleting
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.substring(0, displayText.length - 1)
          : currentWord.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, words]);

  return (
    <span className={`inline-block font-mono ${className}`}>
      <span className="text-primary">&gt; </span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-[2px] h-[1.1em] bg-primary ml-0.5 align-middle"
      />
    </span>
  );
};

// Mask reveal animation - text reveals from behind a mask
export const MaskRevealText = ({ 
  children, 
  delay = 0,
  className = "" 
}: { 
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {children}
      </motion.div>
      {/* Reveal mask overlay */}
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={{ y: 0 }}
        animate={isInView ? { y: "-100%" } : {}}
        transition={{
          duration: 0.6,
          delay: delay + 0.1,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </div>
  );
};

// Split line reveal - each line reveals independently
export const SplitLineReveal = ({ 
  text, 
  className = "",
  lineClassName = ""
}: { 
  text: string;
  className?: string;
  lineClassName?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const lines = text.split("\n");

  return (
    <div ref={ref} className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            className={lineClassName}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// Staggered character reveal with blur
export const BlurRevealText = ({ 
  text, 
  delay = 0,
  className = "",
  tag: Tag = "span"
}: { 
  text: string;
  delay?: number;
  className?: string;
  tag?: "span" | "h1" | "h2" | "h3" | "p";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(12px)",
      y: 10,
    },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      } as Transition,
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ 
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Section heading with animated underline
export const SectionHeading = ({ 
  badge,
  title, 
  description,
  className = "" 
}: { 
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`text-center ${className}`}>
      {badge && (
        <motion.span 
          className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {badge}
        </motion.span>
      )}
      <div className="overflow-hidden">
        <motion.h2 
          className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
          initial={{ y: "100%" }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>
      {description && (
        <motion.p 
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
      {/* Animated line */}
      <motion.div
        className="mt-6 mx-auto h-1 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 120, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      />
    </div>
  );
};
