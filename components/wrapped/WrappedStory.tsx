import React, { useState, useEffect, useCallback } from 'react';
import { WrappedData, SlideType } from '../../shared/interface';
import StoryProgress from './StoryProgress';
import IntroSlide from './slides/IntroSlide';
import MinutesListenedSlide from './slides/MinutesListenedSlide';
import TopSongsSlide from './slides/TopSongsSlide';
import TopArtistsSlide from './slides/TopArtistsSlide';
import TopGenresSlide from './slides/TopGenresSlide';
import TopAlbumsSlide from './slides/TopAlbumsSlide';
import OutroSlide from './slides/OutroSlide';

interface WrappedStoryProps {
  data: WrappedData;
  onClose: () => void;
  onRestart: () => void;
}

const SLIDES: SlideType[] = [
  'intro',
  'minutes',
  'top-songs',
  'top-artists',
  'top-genres',
  'top-albums',
  'outro'
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export default function WrappedStory({
  data,
  onClose,
  onRestart
}: WrappedStoryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
    }
  }, [currentSlide]);

  // Progress timer
  useEffect(() => {
    if (isPaused || currentSlide === SLIDES.length - 1) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 100 / (SLIDE_DURATION / 100);
        if (newProgress >= 100) {
          nextSlide();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, nextSlide]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      else if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'Escape') onClose();
      else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(p => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, onClose]);

  const slideProps = { data, isActive: true };

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* Progress bars */}
      <StoryProgress
        totalSlides={SLIDES.length}
        currentSlide={currentSlide}
        progress={progress}
      />

      {/* Close button */}
      <button
        onClick={e => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <div className="bg-black/50 rounded-full p-4">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </div>
        </div>
      )}

      {/* Slides */}
      <div className="relative w-full h-full">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          const commonProps = { ...slideProps, isActive };

          switch (slide) {
            case 'intro':
              return <IntroSlide key={slide} {...commonProps} />;
            case 'minutes':
              return <MinutesListenedSlide key={slide} {...commonProps} />;
            case 'top-songs':
              return <TopSongsSlide key={slide} {...commonProps} />;
            case 'top-artists':
              return <TopArtistsSlide key={slide} {...commonProps} />;
            case 'top-genres':
              return <TopGenresSlide key={slide} {...commonProps} />;
            case 'top-albums':
              return <TopAlbumsSlide key={slide} {...commonProps} />;
            case 'outro':
              return (
                <OutroSlide
                  key={slide}
                  {...commonProps}
                  onRestart={onRestart}
                />
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Left edge navigation (previous) - thin strip full height */}
      <div
        className="absolute left-0 top-0 w-12 h-full z-40 cursor-pointer
                   hover:bg-white/5 transition-colors"
        onClick={e => {
          e.stopPropagation();
          prevSlide();
        }}
      />

      {/* Right edge navigation (next) - thin strip full height */}
      <div
        className="absolute right-0 top-0 w-12 h-full z-40 cursor-pointer
                   hover:bg-white/5 transition-colors"
        onClick={e => {
          e.stopPropagation();
          nextSlide();
        }}
      />
    </div>
  );
}
