import React from 'react';
import { SpotifyPlaylist } from '../shared/interface';

interface PlaylistCardProps {
  playlist: SpotifyPlaylist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  return (
    <a
      href={playlist.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className={`block cursor-pointer rounded bg-gray-900 p-4 md:p-5 text-white transition-all 
      duration-200 hover:bg-gray-800 border border-gray-800`}
    >
      <div className="mb-4 flex justify-center">
        <img
          src={playlist.images[0]?.url || '/vercel.svg'}
          alt={playlist.name}
          className="h-32 w-32 md:h-40 md:w-40 object-cover rounded"
        />
      </div>
      <div className="text-center">
        <div className="font-bold text-sm md:text-base line-clamp-2">
          {playlist.name}
        </div>
        <div className="text-xs text-gray-400 md:text-sm mt-1 line-clamp-1">
          {playlist.owner.display_name}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xs text-gray-500">
            {playlist.tracks.total} tracks
          </span>
          {playlist.public !== null && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                playlist.public
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {playlist.public ? 'Public' : 'Private'}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
