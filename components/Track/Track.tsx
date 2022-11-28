import React, { ReactElement } from 'react';
import { TrackObjectFull } from 'interface';

export default function Track({
  track
}: {
  track: TrackObjectFull;
}): ReactElement {
  return (
    <div>
      {track.id} - {track.name} - {track.artists[0].name}
    </div>
  );
}
