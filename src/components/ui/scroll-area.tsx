"use client";

import * as React from "react";

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={
      className
        ? `relative overflow-auto ${className}`
        : "relative overflow-auto"
    }
    {...props}
  >
    <div className="h-full w-full rounded-[inherit]">{children}</div>
  </div>
));
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "vertical" | "horizontal";
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <div ref={ref} className={className ? className : ""} {...props} />
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
