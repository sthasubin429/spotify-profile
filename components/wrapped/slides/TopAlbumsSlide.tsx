import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface TopAlbumsSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function TopAlbumsSlide({
  data,
  isActive
}: TopAlbumsSlideProps) {
  return (
    <StorySlide isActive={isActive} gradient="from-teal-900 via-black to-black">
      <div className="w-full max-w-lg">
        <h2
          className={`text-3xl md:text-4xl font-black text-center mb-8 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          Your Top <span className="text-teal-400">Albums</span>
        </h2>

        {/* Album grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.topAlbums.map((albumCount, index) => (
            <a
              key={albumCount.album.id}
              href={albumCount.album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`relative group cursor-pointer transition-all duration-500 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              } ${index === 0 ? 'col-span-2 md:col-span-1' : ''}`}
              style={{ transitionDelay: isActive ? `${index * 100}ms` : '0ms' }}
            >
              {/* Album art */}
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                <img
                  src={albumCount.album.images[0]?.url}
                  alt={albumCount.album.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent
                             to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />

                {/* Rank badge */}
                <div
                  className="absolute top-2 left-2 w-8 h-8 bg-teal-500 rounded-full
                             flex items-center justify-center font-bold text-black"
                >
                  {index + 1}
                </div>
              </div>

              {/* Album info */}
              <div className="mt-2">
                <p className="font-bold text-white text-sm truncate group-hover:text-teal-400 transition-colors">
                  {albumCount.album.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {albumCount.album.artists[0]?.name}
                </p>
                <p className="text-xs text-teal-500 mt-1">
                  {albumCount.count}{' '}
                  {albumCount.count === 1 ? 'track' : 'tracks'} in your top 50
                </p>
              </div>
            </a>
          ))}
        </div>

        {data.topAlbums.length === 0 && (
          <p className="text-center text-gray-500">
            Not enough data to determine your top albums
          </p>
        )}
      </div>
    </StorySlide>
  );
}
