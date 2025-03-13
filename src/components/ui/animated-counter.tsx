"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const timePassed = Date.now() - startTime;
        const progress = Math.min(timePassed / duration, 1);
        const currentCount = Math.floor(progress * end);

        if (countRef.current !== currentCount) {
          countRef.current = currentCount;
          setCount(currentCount);
        }

        if (progress === 1) {
          clearInterval(timer);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}
