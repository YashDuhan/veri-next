'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Check, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Progress } from '@/components/ui/progress';

interface SuitabilityItem {
  text: string;
  positive: boolean;
}

interface NutrientHighlight {
  text: string;
  positive: boolean;
}

interface ExploreCardExpandedProps {
  title: string;
  brand: string;
  images: string[];
  overview?: string;
  nutrition?: string;
  ingredients?: string;
  claims?: string;
  personalizedOverview?: string;
  suitability?: SuitabilityItem[];
  safeConsumption?: string;
  nutrientHighlights?: NutrientHighlight[];
  matchScore?: number;
  onClose: () => void;
}

export default function ExploreCardExpanded({
  title,
  brand,
  images,
  overview = '',
  nutrition = '',
  ingredients = '',
  claims = '',
  personalizedOverview = '',
  suitability = [],
  safeConsumption = '',
  nutrientHighlights = [],
  matchScore = 0,
  onClose
}: ExploreCardExpandedProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const nextImage = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Handle background click to close the modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only close if the click is directly on the backdrop element
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Animation variants for sliding effect
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

  // Get tab styling based on theme
  const getTabStyles = () => {
    switch (resolvedTheme) {
      case 'dark':
        return 'bg-gray-900';
      case 'purple':
        return 'bg-purple-200';
      default:
        return 'bg-gray-100';
    }
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="mt-4">
            {personalizedOverview && (
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${getTextStyles(true)}`}>
                  Personalized Overview
                </h3>
                <p className={`text-sm mb-2 ${getTextStyles(false)}`}>
                  This is generated based on your health profile and preferences.
                </p>
                <p className={getTextStyles(false)}>{personalizedOverview}</p>
              </div>
            )}
            
            {/* Suitability Section */}
            {suitability.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-3 ${getTextStyles(true)}`}>
                  Suitability
                </h3>
                <div className="space-y-2">
                  {suitability.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {item.positive ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <p className={getTextStyles(false)}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Safe Consumption Guideline */}
            {safeConsumption && (
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${getTextStyles(true)}`}>
                  Safe Consumption Guideline
                </h3>
                <p className={`text-lg font-medium ${getTextStyles(false)}`}>
                  {safeConsumption}
                </p>
              </div>
            )}
            
            {/* Nutrient Highlights */}
            {nutrientHighlights.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-3 ${getTextStyles(true)}`}>
                  Nutrient Highlights
                </h3>
                <div className="space-y-2">
                  {nutrientHighlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {item.positive ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <p className={getTextStyles(false)}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {overview && (
              <div>
                <h3 className={`text-xl font-semibold mb-2 ${getTextStyles(true)}`}>
                  Product Overview
                </h3>
                <p className={getTextStyles(false)}>{overview}</p>
              </div>
            )}
          </div>
        );
      case 'nutrition':
        return (
          <div className="mt-4">
            {nutrition ? (
              <div className="space-y-2">
                {nutrition.split('\n').map((line, index) => (
                  <p key={index} className={getTextStyles(false)}>
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <p className={getTextStyles(false)}>Nutrition information not available.</p>
            )}
          </div>
        );
      case 'ingredients':
        return (
          <div className="mt-4">
            {ingredients ? (
              <p className={getTextStyles(false)}>{ingredients}</p>
            ) : (
              <p className={getTextStyles(false)}>Ingredients information not available.</p>
            )}
          </div>
        );
      case 'claims':
        return (
          <div className="mt-4">
            {claims ? (
              <p className={getTextStyles(false)}>{claims}</p>
            ) : (
              <p className={getTextStyles(false)}>Claims information not available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl cursor-default"
      >
        <Card className={`overflow-hidden rounded-lg ${getCardStyles()}`}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Image section */}
              <div className="relative aspect-square w-full md:w-1/2">
                {/* Close button */}
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute right-2 top-2 z-30 h-8 w-8 rounded-full shadow-lg backdrop-blur-sm ${getButtonStyles()}`}
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </Button>

                {/* Left navigation button */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm ${getButtonStyles()}`}
                    onClick={previousImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </Button>
                </div>
                
                {/* Right navigation button */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-full shadow-lg backdrop-blur-sm ${getButtonStyles()}`}
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </Button>
                </div>
                
                {/* Animated image container */}
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
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Image indicators */}
                {images.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-white scale-110'
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
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

              {/* Content section */}
              <div className="w-full md:w-1/2 p-6 flex flex-col h-[600px] max-h-[600px]">
                <h1 className={`text-3xl font-bold mb-1 ${getTextStyles(true)}`}>{title}</h1>
                <h2 className={`text-xl mb-4 ${getTextStyles(false)}`}>By: {brand}</h2>
                
                {/* Match Score */}
                {matchScore > 0 && (
                  <div className="mb-4">
                    <h3 className={`text-xl font-semibold mb-2 ${getTextStyles(true)}`}>
                      Match Score
                    </h3>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={matchScore} 
                        max={100} 
                        className="h-3 bg-gray-200 w-full progress-green"
                      />
                      <span className={`font-semibold ${getTextStyles(true)}`}>
                        {matchScore}/100
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Custom tabs */}
                <div className="mb-4">
                  <div className={`w-full grid grid-cols-4 rounded-md ${getTabStyles()}`}>
                    <button
                      className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'nutrition'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => setActiveTab('nutrition')}
                    >
                      Nutrition
                    </button>
                    <button
                      className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'ingredients'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => setActiveTab('ingredients')}
                    >
                      Ingredients
                    </button>
                    <button
                      className={`py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                        activeTab === 'claims'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10'
                      }`}
                      onClick={() => setActiveTab('claims')}
                    >
                      Claims
                    </button>
                  </div>
                </div>
                
                {/* Tab content with fixed height and no scrollbar */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
