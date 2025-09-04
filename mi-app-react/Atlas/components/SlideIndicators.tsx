import React from 'react';
import { infoSlides } from './data/homePageData';

interface SlideIndicatorsProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isAnimating?: boolean;
}

export default function SlideIndicators({ currentSlide, onSlideChange, isAnimating = false }: SlideIndicatorsProps) {
  return (
    <div className="flex justify-center py-6">
      <div className="flex justify-center space-x-3">
        {infoSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-colors disabled:cursor-not-allowed ${
              index === currentSlide 
                ? 'bg-blue-500' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Ir a información ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}