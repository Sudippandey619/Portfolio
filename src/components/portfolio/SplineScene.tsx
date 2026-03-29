import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export const SplineScene = ({ scene, className = "" }: SplineSceneProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl animate-pulse flex items-center justify-center">
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full mx-auto"
              />
              <p className="text-muted-foreground text-sm">Loading 3D Scene...</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Spline scene */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-3xl" />
            </div>
          }
        >
          <Spline
            scene={scene}
            onLoad={() => setIsLoaded(true)}
          />
        </Suspense>
      </motion.div>
    </div>
  );
};
