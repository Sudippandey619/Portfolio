import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000);
          }, 200);
          return 100;
        }
        return prev + Math.random() * 20 + 8;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  const letters = "SUDIP".split("");

  // Curtain reveal animation
  const curtainVariants = {
    initial: { scaleY: 1 },
    exit: { 
      scaleY: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.1
      }
    }
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-mint/5"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mint/15 rounded-full blur-[80px]"
              animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Logo / Name animation */}
          <motion.div className="relative z-10 flex flex-col items-center">
            {/* Animated letters with 3D flip effect */}
            <div className="flex gap-1 sm:gap-3 mb-6 perspective-1000">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  className="text-6xl sm:text-8xl font-bold text-gradient inline-block"
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle with typewriter-like reveal */}
            <motion.div
              className="overflow-hidden mb-10"
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
            >
              <motion.p
                className="text-muted-foreground text-lg sm:text-xl whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.3 }}
              >
                Full-Stack Developer
              </motion.p>
            </motion.div>

            {/* Sleek progress indicator */}
            <motion.div
              className="relative w-64 sm:w-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Track */}
              <div className="h-[2px] bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-mint to-primary"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Glowing dot indicator */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
                style={{ left: `${Math.min(progress, 100)}%` }}
                animate={{ 
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Progress text */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.span
                className="text-2xl sm:text-3xl font-light text-foreground tabular-nums"
                key={Math.round(Math.min(progress, 100))}
              >
                {Math.round(Math.min(progress, 100))}
              </motion.span>
              <span className="text-muted-foreground text-sm">%</span>
            </motion.div>
          </motion.div>

          {/* Decorative orbital rings */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] border border-primary/10 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ 
              scale: { delay: 0.3, duration: 0.5 },
              opacity: { delay: 0.3, duration: 0.5 },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
          />
          <motion.div
            className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] border border-mint/10 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -360 }}
            transition={{ 
              scale: { delay: 0.4, duration: 0.5 },
              opacity: { delay: 0.4, duration: 0.5 },
              rotate: { duration: 40, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              initial={{ 
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>
      ) : (
        /* Curtain reveal exit animation */
        <>
          <motion.div
            className="fixed inset-0 z-[201] bg-background origin-top"
            variants={curtainVariants}
            initial="initial"
            animate="exit"
          />
          <motion.div
            className="fixed inset-0 z-[200] bg-primary/5 origin-bottom"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
