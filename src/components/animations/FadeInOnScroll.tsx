"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number; // duration in ms
  threshold?: number; // 0-1, percentage of element visible before triggering
  once?: boolean; // only animate once
}

/**
 * FadeInOnScroll - Wraps content to fade in when scrolled into view
 *
 * Uses Intersection Observer for performant scroll-based animations.
 *
 * @example
 * <FadeInOnScroll direction="up" delay={100}>
 *   <div>Content that fades in from below</div>
 * </FadeInOnScroll>
 */
export default function FadeInOnScroll({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 600,
  threshold = 0.1,
  once = true,
}: FadeInOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element is fully in view
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, once]);

  // Calculate initial transform based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)";
      case "down":
        return "translateY(-30px)";
      case "left":
        return "translateX(30px)";
      case "right":
        return "translateX(-30px)";
      case "none":
      default:
        return "none";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getInitialTransform(),
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Staggered container for multiple fade-in children
 * Automatically adds increasing delays to children
 */
interface StaggeredFadeInProps {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function StaggeredFadeIn({
  children,
  className = "",
  baseDelay = 0,
  staggerDelay = 100,
  direction = "up",
}: StaggeredFadeInProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <FadeInOnScroll
          key={index}
          delay={baseDelay + index * staggerDelay}
          direction={direction}
        >
          {child}
        </FadeInOnScroll>
      ))}
    </div>
  );
}
