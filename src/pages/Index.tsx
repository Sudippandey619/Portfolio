import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Navbar,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Blog,
  Testimonials,
  Contact,
  Footer,
  ScrollProgress,
  ParallaxSection,
  Preloader,
  CustomCursor,
  SectionIndicator,
  BackToTop,
} from "@/components/portfolio";

// Staggered content reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            className="min-h-screen bg-background"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <ScrollProgress />
            <SectionIndicator />
            <motion.div variants={itemVariants}>
              <Navbar />
            </motion.div>
            <main className="snap-y snap-mandatory">
              <motion.div variants={itemVariants} className="snap-start">
                <Hero />
              </motion.div>
              <ParallaxSection className="snap-start">
                <About />
              </ParallaxSection>
              <ParallaxSection className="snap-start">
                <Skills />
              </ParallaxSection>
              <ParallaxSection className="snap-start">
                <Projects />
              </ParallaxSection>
              <ParallaxSection className="snap-start">
                <Experience />
              </ParallaxSection>
              <ParallaxSection showShapes={false} className="snap-start">
                <Blog />
              </ParallaxSection>
              <ParallaxSection className="snap-start">
                <Testimonials />
              </ParallaxSection>
              <ParallaxSection className="snap-start">
                <Contact />
              </ParallaxSection>
            </main>
            <motion.div variants={itemVariants}>
              <Footer />
            </motion.div>
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
