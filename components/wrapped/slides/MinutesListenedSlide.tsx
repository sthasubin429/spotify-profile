import React, { useState, useEffect } from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface MinutesListenedSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function MinutesListenedSlide({
  data,
  isActive
}: MinutesListenedSlideProps) {
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const targetMinutes = data.estimatedMinutes;

  // Animate counter
  useEffect(() => {
    if (!isActive) {
      setDisplayMinutes(0);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetMinutes / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetMinutes) {
        setDisplayMinutes(targetMinutes);
        clearInterval(timer);
      } else {
        setDisplayMinutes(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isActive, targetMinutes]);

  // Convert to hours and remaining minutes
  const hours = Math.floor(displayMinutes / 60);
  const minutes = displayMinutes % 60;

  return (
    <StorySlide
      isActive={isActive}
      gradient="from-purple-900 via-black to-black"
    >
      <div className="text-center">
        <p
          className={`text-gray-400 text-lg mb-6 transition-all duration-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          You spent approximately
        </p>

        {/* Main counter */}
        <div
          className={`mb-6 transition-all duration-500 delay-200 ${
            isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          {hours > 0 ? (
            <div className="flex items-baseline justify-center gap-4">
              <div className="text-center">
                <span className="text-7xl md:text-9xl font-black text-white">
                  {hours.toLocaleString()}
                </span>
                <p className="text-green-400 text-xl font-bold mt-2">hours</p>
              </div>
              <div className="text-center">
                <span className="text-5xl md:text-7xl font-black text-white/80">
                  {minutes}
                </span>
                <p className="text-green-400/80 text-lg font-bold mt-2">min</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-8xl md:text-9xl font-black text-white">
                {displayMinutes.toLocaleString()}
              </span>
              <p className="text-green-400 text-2xl font-bold mt-2">minutes</p>
            </div>
          )}
        </div>

        <p
          className={`text-gray-400 text-lg transition-all duration-500 delay-400 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          listening to music
        </p>

        {/* Disclaimer */}
        <p
          className={`text-gray-600 text-xs mt-8 transition-all duration-500 delay-600 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          * Estimated based on your top tracks
        </p>
      </div>
    </StorySlide>
  );
}
