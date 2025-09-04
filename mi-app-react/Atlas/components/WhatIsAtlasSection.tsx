import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { infoSlides } from './data/homePageData';
import firstImage from 'figma:asset/6d53841b48535e4329f1495b74db07ffeb79a975.png';
import secondImage from 'figma:asset/e8cbdf2380ad65388310ee0d7e2da0fd31bec34d.png';

interface WhatIsAtlasSectionProps {
  onSlideChange?: (currentSlide: number) => void;
}

export default function WhatIsAtlasSection({ onSlideChange }: WhatIsAtlasSectionProps) {
  const [currentInfoSlide, setCurrentInfoSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getImageSrc = (slide: typeof infoSlides[0]) => {
    if (slide.image === "figma:asset/6d53841b48535e4329f1495b74db07ffeb79a975.png") {
      return firstImage;
    }
    if (slide.image === "figma:asset/e8cbdf2380ad65388310ee0d7e2da0fd31bec34d.png") {
      return secondImage;
    }
    return slide.image;
  };

  const changeSlide = (newSlide: number) => {
    setCurrentInfoSlide(newSlide);
    onSlideChange?.(newSlide);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newSlide = (currentInfoSlide + 1) % infoSlides.length;
      changeSlide(newSlide);
      setIsAnimating(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const newSlide = (currentInfoSlide - 1 + infoSlides.length) % infoSlides.length;
      changeSlide(newSlide);
      setIsAnimating(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentInfoSlide) return;
    setIsAnimating(true);
    setTimeout(() => {
      changeSlide(index);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="bg-gradient-to-br from-card/80 to-card/60 border-y border-border/50 backdrop-blur-sm">
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Información anterior"
          >
            <ChevronLeftIcon />
          </button>

          {/* Main Content Container */}
          <div className="flex items-center min-h-[450px]">
            {/* Image - Left half */}
            <div className="w-1/2 h-[450px] relative">
              <div className={`transition-all duration-300 h-full ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <ImageWithFallback 
                  src={getImageSrc(infoSlides[currentInfoSlide])}
                  alt={infoSlides[currentInfoSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20"></div>
            </div>

            {/* Content - Right half */}
            <div className="w-1/2 px-16 py-8">
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {infoSlides[currentInfoSlide].title}
                </h2>
                <div className="text-base text-muted-foreground leading-relaxed space-y-4">
                  {infoSlides[currentInfoSlide].content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button 
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Siguiente información"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* External indicators data for parent component */}
      <div className="hidden">
        {JSON.stringify({
          currentSlide: currentInfoSlide,
          totalSlides: infoSlides.length,
          goToSlide,
          isAnimating
        })}
      </div>
    </div>
  );
}