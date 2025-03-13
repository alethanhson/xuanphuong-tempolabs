"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  placeholder = "empty",
  blurDataURL,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Only set up intersection observer if not priority
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const currentElement = document.getElementById(
      `lazy-image-${src.replace(/[^a-zA-Z0-9]/g, "")}`,
    );
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [src, priority]);

  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL =
    blurDataURL ||
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+";

  return (
    <div
      id={`lazy-image-${src.replace(/[^a-zA-Z0-9]/g, "")}`}
      className={`relative overflow-hidden ${className} ${isLoaded ? "" : "bg-gray-200 animate-pulse"}`}
      style={{
        width: "100%",
        height: "auto",
        aspectRatio: `${width}/${height}`,
      }}
    >
      {(isInView || priority) && (
        <Image
          src={error ? defaultBlurDataURL : src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}
