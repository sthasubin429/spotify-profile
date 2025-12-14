import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface TopArtistsSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function TopArtistsSlide({
  data,
  isActive
}: TopArtistsSlideProps) {
  const [first, second, third, fourth, fifth] = data.topArtists;

  return (
    <StorySlide
      isActive={isActive}
      gradient="from-orange-900 via-black to-black"
    >
      <div className="w-full max-w-lg">
        <h2
          className={`text-3xl md:text-4xl font-black text-center mb-8 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          Your Top <span className="text-orange-400">Artists</span>
        </h2>

        {/* Podium for top 3 */}
        <div className="flex items-end justify-center gap-4 mb-8">
          {/* 2nd place */}
          {second && (
            <a
              href={second.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex flex-col items-center transition-all duration-700 delay-200 cursor-pointer group ${
                isActive
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src={second.images[0]?.url}
                alt={second.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gray-400 
                         shadow-lg group-hover:scale-110 transition-transform"
              />
              <span className="text-2xl font-bold text-gray-400 mt-2">2</span>
              <p className="text-sm text-gray-300 text-center mt-1 max-w-[100px] truncate">
                {second.name}
              </p>
            </a>
          )}

          {/* 1st place */}
          {first && (
            <a
              href={first.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex flex-col items-center transition-all duration-700 delay-100 cursor-pointer group ${
                isActive
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="relative">
                <img
                  src={first.images[0]?.url}
                  alt={first.name}
                  className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-yellow-500 
                           shadow-2xl shadow-yellow-500/30 group-hover:scale-110 transition-transform"
                />
                <span className="absolute -top-2 -right-2 text-3xl">👑</span>
              </div>
              <span className="text-3xl font-bold text-yellow-500 mt-2">1</span>
              <p className="text-base font-bold text-white text-center mt-1 max-w-[120px] truncate">
                {first.name}
              </p>
            </a>
          )}

          {/* 3rd place */}
          {third && (
            <a
              href={third.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex flex-col items-center transition-all duration-700 delay-300 cursor-pointer group ${
                isActive
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <img
                src={third.images[0]?.url}
                alt={third.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-amber-700 
                         shadow-lg group-hover:scale-110 transition-transform"
              />
              <span className="text-xl font-bold text-amber-700 mt-2">3</span>
              <p className="text-sm text-gray-400 text-center mt-1 max-w-[80px] truncate">
                {third.name}
              </p>
            </a>
          )}
        </div>

        {/* 4th and 5th */}
        <div className="flex justify-center gap-6">
          {[fourth, fifth].map(
            (artist, index) =>
              artist && (
                <a
                  key={artist.id}
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={`flex items-center gap-3 bg-white/5 rounded-full pr-4 
                           hover:bg-white/10 transition-all duration-500 cursor-pointer ${
                             isActive
                               ? 'opacity-100 translate-y-0'
                               : 'opacity-0 translate-y-4'
                           }`}
                  style={{
                    transitionDelay: isActive ? `${(index + 4) * 100}ms` : '0ms'
                  }}
                >
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <span className="text-gray-500 text-sm font-bold">
                      #{index + 4}
                    </span>
                    <p className="text-sm text-white truncate max-w-[80px]">
                      {artist.name}
                    </p>
                  </div>
                </a>
              )
          )}
        </div>
      </div>
    </StorySlide>
  );
}
