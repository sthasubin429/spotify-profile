import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface TopSongsSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function TopSongsSlide({ data, isActive }: TopSongsSlideProps) {
  return (
    <StorySlide isActive={isActive} gradient="from-pink-900 via-black to-black">
      <div className="w-full max-w-md">
        <h2
          className={`text-3xl md:text-4xl font-black text-center mb-8 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          Your Top <span className="text-pink-400">Songs</span>
        </h2>

        <div className="space-y-3">
          {data.topTracks.map((track, index) => (
            <a
              key={track.id}
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 
                         transition-all duration-500 cursor-pointer group ${
                           isActive
                             ? 'opacity-100 translate-x-0'
                             : 'opacity-0 -translate-x-8'
                         }`}
              style={{ transitionDelay: isActive ? `${index * 100}ms` : '0ms' }}
            >
              {/* Rank */}
              <span className="text-2xl font-black text-gray-500 w-8">
                {index + 1}
              </span>

              {/* Album Art */}
              <img
                src={track.album.images[0]?.url}
                alt={track.album.name}
                className="w-14 h-14 rounded-lg shadow-lg group-hover:scale-105 transition-transform"
              />

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate group-hover:text-pink-400 transition-colors">
                  {track.name}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {track.artists.map(a => a.name).join(', ')}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </StorySlide>
  );
}
