"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationDirection = "up" | "down" | "left" | "right";
type AnimationType = "fade" | "slide" | "zoom" | "none";

interface RevealAnimationProps {
  children: ReactNode;
  direction?: AnimationDirection;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function RevealAnimation({
  children,
  direction = "up",
  type = "fade",
  delay = 0,
  duration = 500,
  className,
  once = true,
  threshold = 0.1,
}: RevealAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInView(entry.isIntersecting);

        if (entry.isIntersecting && once && observerRef.current) {
          observerRef.current.unobserve(element);
        }
      },
      { threshold },
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [once, threshold]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (inView) {
      element.style.opacity = "1";
      element.style.transform = "translate(0, 0)";
    } else {
      let transform = "";
      switch (direction) {
        case "up":
          transform = "translateY(50px)";
          break;
        case "down":
          transform = "translateY(-50px)";
          break;
        case "left":
          transform = "translateX(50px)";
          break;
        case "right":
          transform = "translateX(-50px)";
          break;
      }

      if (type === "zoom") {
        transform += " scale(0.8)";
      }

      element.style.opacity = "0";
      element.style.transform = transform;
    }
  }, [inView, direction, type]);

  return (
    <div
      ref={elementRef}
      className={cn(className)}
      style={{
        opacity: 0,
        transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
