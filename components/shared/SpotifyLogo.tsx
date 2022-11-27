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
        src="/assets/spotify-logo.svg"
        alt="Spotify"
        width={width}
        height={height}
      />
    </div>
  );
}
