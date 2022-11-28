import React, { ReactElement, useEffect, useState } from 'react';
import Track from './Track';
import {
  PlayHistoryObject,
  UsersRecentlyPlayedTracksResponse
} from 'interface';
import { getRecentlyPlayedTracks } from 'spotify';

export default function RecentTracks(): ReactElement {
  const [recentTracks, setRecentTracks] = useState([] as PlayHistoryObject[]);
  useEffect(() => {
    getRecentlyPlayedTracks().then(
      (tracks: UsersRecentlyPlayedTracksResponse) => {
        setRecentTracks(tracks.items);
      }
    );
  }, []);
  return (
    <>
      {recentTracks?.map((recentTrack: PlayHistoryObject, index: number) => (
        <Track
          key={`${recentTrack.track.id}-${index}`}
          track={recentTrack.track}
        />
      ))}
    </>
  );
}
