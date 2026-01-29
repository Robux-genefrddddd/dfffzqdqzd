import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type LogoItem = {
  src: string;
  alt?: string;
  title?: string;
  href?: string;
};

interface LogoCarouselProps {
  logos: LogoItem[];
  autoPlayInterval?: number;
  logoHeight?: number;
  ariaLabel?: string;
  className?: string;
}

export const LogoCarousel = React.memo<LogoCarouselProps>(
  ({
    logos,
    autoPlayInterval = 3000,
    logoHeight = 56,
    ariaLabel = "Technology stack",
    className,
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [nextIndex, setNextIndex] = useState(1 % logos.length);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
      if (isHovered || logos.length === 0) return;

      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % logos.length);
          setNextIndex((prev) => (prev + 1) % logos.length);
          setIsTransitioning(false);
        }, 250);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }, [isHovered, logos.length, autoPlayInterval]);

    if (logos.length === 0) return null;

    const currentLogo = logos[currentIndex];

    const handleDotClick = (index: number) => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setNextIndex((index + 1) % logos.length);
        setIsTransitioning(false);
      }, 250);
    };

    return (
      <div
        className={cn("flex flex-col items-center gap-8", className)}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Display */}
        <div
          className="relative flex items-center justify-center transition-opacity duration-300"
          style={{ minHeight: `${logoHeight + 8}px` }}
        >
          {currentLogo.href ? (
            <a
              href={currentLogo.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2"
              aria-label={currentLogo.title || currentLogo.alt}
            >
              <img
                src={currentLogo.src}
                alt={currentLogo.alt || ""}
                title={currentLogo.title}
                style={{ height: `${logoHeight}px` }}
                className="w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
          ) : (
            <img
              src={currentLogo.src}
              alt={currentLogo.alt || ""}
              title={currentLogo.title}
              style={{ height: `${logoHeight}px` }}
              className="w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>

        {/* Logo Title */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-sm text-white/60 transition-opacity duration-300">
            {currentLogo.title || currentLogo.alt}
          </p>
        </div>

        {/* Indicators */}
        {logos.length > 1 && (
          <div className="flex gap-2 items-center">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-white/20 w-1.5 hover:bg-white/40"
                )}
                aria-label={`Show ${logos[index].title || logos[index].alt}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

LogoCarousel.displayName = "LogoCarousel";

export default LogoCarousel;
