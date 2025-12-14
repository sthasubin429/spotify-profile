import React from 'react';
import { SpotifyArtist } from '../shared/interface';

interface ArtistCardProps {
  artist: SpotifyArtist;
  onClick?: () => void;
}

export default function ArtistCard({ artist, onClick }: ArtistCardProps) {
  return (
    <div
      className={`cursor-pointer rounded bg-gray-900 p-4 md:p-5 text-white transition-all 
      duration-200 hover:bg-gray-800 border border-gray-800`}
      onClick={onClick}
    >
      <div className="mb-4 flex justify-center">
        <img
          src={artist.images[0]?.url || '/vercel.svg'}
          alt={artist.name}
          className="h-24 w-24 rounded-full object-cover md:h-32 md:w-32"
        />
      </div>
      <div className="text-center">
        <div className="font-bold text-sm md:text-base line-clamp-2">
          {artist.name}
        </div>
        <div className="text-xs text-gray-400 md:text-sm mt-1 line-clamp-1">
          {artist.genres.slice(0, 2).join(', ') || 'Artist'}
        </div>
      </div>
    </div>
  );
}
