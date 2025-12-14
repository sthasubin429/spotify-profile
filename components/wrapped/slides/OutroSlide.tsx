import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface OutroSlideProps {
  data: WrappedData;
  isActive: boolean;
  onRestart: () => void;
}

export default function OutroSlide({
  data,
  isActive,
  onRestart
}: OutroSlideProps) {
  const topArtist = data.topArtists[0];
  const topTrack = data.topTracks[0];
  const topGenre = data.topGenres[0];

  return (
    <StorySlide
      isActive={isActive}
      gradient="from-green-900 via-black to-black"
    >
      <div className="text-center max-w-md">
        <h2
          className={`text-3xl md:text-4xl font-black mb-6 transition-all duration-500 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          That&apos;s a Wrap! 🎉
        </h2>

        <p
          className={`text-gray-400 mb-8 transition-all duration-500 delay-100 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Here&apos;s a summary of your {data.timeRangeLabel.toLowerCase()}
        </p>

        {/* Summary cards */}
        <div className="space-y-3 mb-10">
          {topArtist && (
            <div
              className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all duration-500 delay-200 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
            >
              <img
                src={topArtist.images[0]?.url}
                alt={topArtist.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <p className="text-xs text-gray-500">#1 Artist</p>
                <p className="font-bold text-white">{topArtist.name}</p>
              </div>
            </div>
          )}

          {topTrack && (
            <div
              className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all duration-500 delay-300 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
            >
              <img
                src={topTrack.album.images[0]?.url}
                alt={topTrack.album.name}
                className="w-12 h-12 rounded-lg"
              />
              <div className="text-left">
                <p className="text-xs text-gray-500">#1 Song</p>
                <p className="font-bold text-white">{topTrack.name}</p>
              </div>
            </div>
          )}

          {topGenre && (
            <div
              className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all duration-500 delay-400 ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              }`}
            >
              <div
                className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600
                           rounded-full flex items-center justify-center text-xl"
              >
                🎵
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-500">#1 Genre</p>
                <p className="font-bold text-white">{topGenre.genre}</p>
              </div>
            </div>
          )}

          <div
            className={`flex items-center gap-4 p-4 bg-white/5 rounded-xl transition-all duration-500 delay-500 ${
              isActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <div
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600
                         rounded-full flex items-center justify-center text-xl"
            >
              ⏱️
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500">Est. Minutes</p>
              <p className="font-bold text-white">
                {data.estimatedMinutes.toLocaleString()} min
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div
          className={`flex flex-col gap-3 transition-all duration-500 delay-600 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={e => {
              e.stopPropagation();
              onRestart();
            }}
            className="w-full py-3 px-6 bg-green-500 text-black font-bold rounded-full 
                     hover:bg-green-400 transition-colors"
          >
            View Again
          </button>

          <a
            href={data.user.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-full py-3 px-6 bg-white/10 text-white font-bold rounded-full 
                     hover:bg-white/20 transition-colors text-center"
          >
            Open Spotify Profile
          </a>
        </div>

        {/* Footer */}
        <p
          className={`mt-8 text-xs text-gray-600 transition-all duration-500 delay-700 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Generated on{' '}
          {new Date(data.generatedAt).toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </StorySlide>
  );
}
