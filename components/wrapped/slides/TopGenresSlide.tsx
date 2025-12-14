import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface TopGenresSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function TopGenresSlide({
  data,
  isActive
}: TopGenresSlideProps) {
  const maxPercentage = data.topGenres[0]?.percentage || 100;

  return (
    <StorySlide isActive={isActive} gradient="from-blue-900 via-black to-black">
      <div className="w-full max-w-md">
        <h2
          className={`text-3xl md:text-4xl font-black text-center mb-8 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          Your Top <span className="text-blue-400">Genres</span>
        </h2>

        <div className="space-y-4">
          {data.topGenres.map((genre, index) => (
            <div
              key={genre.genre}
              className={`transition-all duration-700 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: isActive ? `${index * 150}ms` : '0ms' }}
            >
              {/* Genre name and percentage */}
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">{genre.genre}</span>
                <span className="text-blue-400 font-bold">
                  {genre.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full 
                           transition-all duration-1000 ease-out"
                  style={{
                    width: isActive
                      ? `${(genre.percentage / maxPercentage) * 100}%`
                      : '0%',
                    transitionDelay: isActive ? `${index * 150 + 200}ms` : '0ms'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {data.topGenres.length === 0 && (
          <p className="text-center text-gray-500">
            Not enough data to determine your top genres
          </p>
        )}
      </div>
    </StorySlide>
  );
}
