import React from 'react';

interface StoryProgressProps {
  totalSlides: number;
  currentSlide: number;
  progress: number; // 0-100 for current slide
}

export default function StoryProgress({
  totalSlides,
  currentSlide,
  progress
}: StoryProgressProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-3">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{
              width:
                index < currentSlide
                  ? '100%'
                  : index === currentSlide
                    ? `${progress}%`
                    : '0%'
            }}
          />
        </div>
      ))}
    </div>
  );
}
