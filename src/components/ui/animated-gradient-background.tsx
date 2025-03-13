"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const colors = ["#1e40af", "#1d4ed8", "#3b82f6", "#60a5fa"];
    let step = 0;
    const gradient = ctx.createLinearGradient(0, 0, width, height);

    const updateGradient = () => {
      gradient.addColorStop(0, colors[step % colors.length]);
      gradient.addColorStop(0.33, colors[(step + 1) % colors.length]);
      gradient.addColorStop(0.66, colors[(step + 2) % colors.length]);
      gradient.addColorStop(1, colors[(step + 3) % colors.length]);
    };

    const render = () => {
      updateGradient();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      step = (step + 1) % colors.length;
    };

    let animationFrameId: number;
    const animate = () => {
      render();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gradient.addColorStop(0, colors[step % colors.length]);
      gradient.addColorStop(0.33, colors[(step + 1) % colors.length]);
      gradient.addColorStop(0.66, colors[(step + 2) % colors.length]);
      gradient.addColorStop(1, colors[(step + 3) % colors.length]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 opacity-20"
    />
  );
}
