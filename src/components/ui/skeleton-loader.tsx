import { cn } from "@/lib/utils";

interface SkeletonLoaderProps {
  className?: string;
  variant?: "card" | "image" | "text" | "circle" | "button";
  lines?: number;
}

export const SkeletonLoader = ({ 
  className, 
  variant = "card",
  lines = 3 
}: SkeletonLoaderProps) => {
  const baseClass = "animate-pulse bg-muted rounded";
  
  if (variant === "circle") {
    return (
      <div className={cn(baseClass, "w-20 h-20 rounded-full", className)} />
    );
  }
  
  if (variant === "image") {
    return (
      <div className={cn(baseClass, "aspect-video w-full", className)} />
    );
  }
  
  if (variant === "button") {
    return (
      <div className={cn(baseClass, "h-10 w-32", className)} />
    );
  }
  
  if (variant === "text") {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              baseClass, 
              "h-4",
              i === lines - 1 ? "w-3/4" : "w-full",
              className
            )} 
          />
        ))}
      </div>
    );
  }
  
  // Card variant
  return (
    <div className={cn("glass-card rounded-xl p-4 space-y-4", className)}>
      <div className={cn(baseClass, "h-6 w-1/3")} />
      <div className={cn(baseClass, "aspect-video w-full")} />
      <div className="space-y-2">
        <div className={cn(baseClass, "h-4 w-full")} />
        <div className={cn(baseClass, "h-4 w-2/3")} />
      </div>
    </div>
  );
};

export const FaceSlotSkeleton = () => (
  <div className="flex items-center gap-4">
    {[1, 2, 3].map((i) => (
      <div 
        key={i}
        className="w-20 h-20 rounded-full animate-pulse bg-muted border-2 border-border/30"
      />
    ))}
  </div>
);

export const GeneratorSkeleton = () => (
  <div className="glass-card rounded-xl p-6 space-y-4">
    <div className="animate-pulse bg-muted h-8 w-1/2 rounded" />
    <div className="animate-pulse bg-muted aspect-video w-full rounded-lg" />
    <div className="flex gap-4">
      <div className="animate-pulse bg-muted h-12 flex-1 rounded-lg" />
      <div className="animate-pulse bg-muted h-12 w-32 rounded-lg" />
    </div>
  </div>
);
