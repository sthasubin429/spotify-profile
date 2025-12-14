import React from 'react';
import { SpotifyTrack } from '../shared/interface';

interface TrackCardProps {
  track: SpotifyTrack;
}

function formatDuration(duration_ms: number) {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
}

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col md:flex-row cursor-pointer items-center gap-4 md:gap-5 rounded 
      bg-gray-900 p-3 md:p-4 text-white transition-all duration-200 hover:bg-gray-800 
      border border-gray-800 overflow-hidden`}
    >
      <div className="shrink-0">
        <img
          src={track.album.images[0]?.url || '/vercel.svg'}
          alt={track.album.name}
          className="h-16 w-16 md:h-20 md:w-20 object-cover rounded"
        />
      </div>
      <div className="grow text-center md:text-left min-w-0">
        <div className="font-bold text-base md:text-lg truncate">
          {track.name}
        </div>
        <div className="text-sm text-gray-400 mt-1 truncate">
          {track.artists.map(artist => artist.name).join(', ')}
        </div>
        <div className="text-xs text-gray-500 mt-0.5 truncate">
          {track.album.name}
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {track.explicit && (
          <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
            E
          </span>
        )}
        <div className="text-sm text-gray-400 font-medium min-w-max">
          {formatDuration(track.duration_ms)}
        </div>
      </div>
    </a>
  );
}
