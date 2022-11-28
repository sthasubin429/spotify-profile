import Image from 'next/image';
import React from 'react';

export default function SpotifyLogo({
  width = 220,
  height = 440
}: {
  width?: number;
  height?: number;
}): React.ReactElement {
  return (
    <div>
      <Image
        src="/assets/spotify-logo.png"
        alt="Spotify"
        width={width}
        height={height}
        className="w-auto h-auto p-6 my-6"
        priority={true}
      />
    </div>
  );
}