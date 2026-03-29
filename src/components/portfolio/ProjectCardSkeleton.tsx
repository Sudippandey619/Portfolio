import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export const ProjectCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className="bg-card rounded-3xl overflow-hidden border border-border"
    >
      {/* Thumbnail skeleton */}
      <Skeleton className="h-56 w-full rounded-none" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Tech tags */}
        <div className="flex gap-2">
          <Skeleton className="h-7 w-16 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-14 rounded-full" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </motion.div>
  );
};
