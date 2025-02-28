'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ExploreCardProps {
  title: string;
  brand: string;
  images: string[];
  onExpand?: () => void;
}

export default function ExploreCard({ title, brand, images, onExpand }: ExploreCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Function to trim long titles with a smaller limit
  const trimTitle = (text: string, maxLength: number = 18) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  // Animation variants for sliding effect - slower animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Get card styling based on theme
  const getCardStyles = () => {
    switch (resolvedTheme) {
      case 'dark':
        return 'bg-black text-white border-0';
      case 'purple':
        return 'bg-purple-100 text-purple-950 border border-purple-200';
      default:
        return 'bg-white text-black border border-gray-200';
    }
  };

  // Get button styling based on theme
  const getButtonStyles = () => {
    switch (resolvedTheme) {
      case 'dark':
        return 'bg-white/30 hover:bg-white/50 border-0';
      case 'purple':
        return 'bg-purple-300/30 hover:bg-purple-300/50 border-0';
      default:
        return 'bg-black/30 hover:bg-black/50 border-0';
    }
  };

  // Get indicator styling based on theme and active state
  const getIndicatorStyles = (isActive: boolean) => {
    switch (resolvedTheme) {
      case 'dark':
        return isActive ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60';
      case 'purple':
        return isActive ? 'bg-purple-300 scale-110' : 'bg-purple-300/40 hover:bg-purple-300/60';
      default:
        return isActive ? 'bg-black scale-110' : 'bg-black/40 hover:bg-black/60';
    }
  };

  // Get text styling based on theme
  const getTextStyles = (isTitle: boolean) => {
    switch (resolvedTheme) {
      case 'dark':
        return isTitle ? 'text-white' : 'text-gray-400';
      case 'purple':
        return isTitle ? 'text-purple-900' : 'text-purple-700';
      default:
        return isTitle ? 'text-black' : 'text-gray-600';
    }
  };

  // Get action button styling based on theme
  const getActionButtonStyles = () => {
    switch (resolvedTheme) {
      case 'dark':
        return 'bg-white text-black hover:bg-gray-200';
      case 'purple':
        return 'bg-purple-300 text-purple-950 hover:bg-purple-200';
      default:
        return 'bg-black text-white hover:bg-gray-800';
    }
  };

  // Check if title needs trimming with smaller limit
  const isTitleTrimmed = title.length > 18;
  const displayTitle = trimTitle(title);

  return (
    <Card className={`w-full max-w-[300px] overflow-hidden rounded-lg ${getCardStyles()}`}>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden" ref={containerRef}>
          {/* Left navigation button with improved visibility */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${getButtonStyles()}`}
              onClick={previousImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          {/* Right navigation button with improved visibility */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
            <Button
              variant="outline"
              size="icon"
              className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${getButtonStyles()}`}
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          {/* Animated image container with slower animation */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.4 }
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={title}
                fill
                className="object-contain p-4"
                priority={currentImageIndex === 0}
                sizes="(max-width: 300px) 100vw, 300px"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${getIndicatorStyles(index === currentImageIndex)}`}
                  onClick={() => {
                    setDirection(index > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          {isTitleTrimmed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className={`font-semibold text-lg ${getTextStyles(true)} cursor-default truncate whitespace-nowrap overflow-hidden`}>
                    {displayTitle}
                  </h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <h3 className={`font-semibold text-lg ${getTextStyles(true)} whitespace-nowrap overflow-hidden`}>{title}</h3>
          )}
          <p className={`text-sm ${getTextStyles(false)}`}>by {brand}</p>
          <Button 
            className={`w-full ${getActionButtonStyles()}`}
            variant="outline"
            onClick={onExpand}
          >
            View Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
