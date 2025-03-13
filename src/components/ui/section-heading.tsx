import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  badge?: string;
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
  titleClassName,
  subtitleClassName,
  badge,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {badge && (
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {badge}
          </span>
        </div>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground max-w-3xl",
            center && "mx-auto",
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
