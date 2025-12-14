import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useTopTracksInfinite } from '../hooks/useTopTracksInfinite';
import { TimeRange } from '../shared/interface';
import TrackCard from '../components/TrackCard';
import TimeRangeSelector from '../components/TimeRangeSelector';

function TopTracksPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Medium);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useTopTracksInfinite(timeRange);

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const tracks = data?.pages.flatMap(page => page.items) || [];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="px-4 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Top Tracks
          </h1>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
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
            <p className="text-red-500 mb-4">Error loading top tracks.</p>
            <button
              onClick={() => router.reload()}
              className="px-4 py-2 bg-white text-black rounded-full font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {tracks.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No tracks found for this time range.
              </div>
            ) : (
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <TrackCard key={`${track.id}-${index}`} track={track} />
                ))}
              </div>
            )}

            {hasNextPage && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className={`px-8 py-3 bg-green-500 text-black font-bold rounded-full 
                  hover:bg-green-400 transition-colors disabled:opacity-50`}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More Tracks'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TopTracksPage), { ssr: false });
