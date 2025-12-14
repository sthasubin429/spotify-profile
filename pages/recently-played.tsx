import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useRecentlyPlayed } from '../hooks/useRecentlyPlayed';
import TrackCard from '../components/TrackCard';

function formatPlayedAt(playedAt: string) {
  const date = new Date(playedAt);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} min ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function RecentlyPlayedPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { data, status } = useRecentlyPlayed();

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const recentlyPlayed = data?.items || [];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="px-4 md:px-12 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Recently Played</h1>
          <p className="text-gray-400 mt-2">Your last 50 played tracks</p>
        </div>

        {status === 'pending' ? (
          <div className="space-y-3">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900 rounded h-20 animate-pulse"
                />
              ))}
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error loading recently played.</p>
            <button
              onClick={() => router.reload()}
              className="px-4 py-2 bg-white text-black rounded-full font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {recentlyPlayed.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No recently played tracks found. Start listening on Spotify!
              </div>
            ) : (
              <div className="space-y-3">
                {recentlyPlayed.map((item, index) => (
                  <div key={`${item.track.id}-${item.played_at}-${index}`}>
                    <div className="text-xs text-gray-500 mb-1 ml-1">
                      {formatPlayedAt(item.played_at)}
                    </div>
                    <TrackCard track={item.track} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(RecentlyPlayedPage), {
  ssr: false
});
