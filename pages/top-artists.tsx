import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useTopArtistsInfinite } from '../hooks/useTopArtistsInfinite';
import { TimeRange } from '../shared/interface';
import ArtistCard from '../components/ArtistCard';
import TimeRangeSelector from '../components/TimeRangeSelector';

function TopArtistsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Medium);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useTopArtistsInfinite(timeRange);

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const artists = data?.pages.flatMap(page => page.items) || [];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="px-4 md:px-12 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Top Artists
          </h1>
          <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
        </div>

        {status === 'pending' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-900 rounded h-64 animate-pulse"
                />
              ))}
          </div>
        ) : status === 'error' ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Error loading top artists.</p>
            <button
              onClick={() => router.reload()}
              className="px-4 py-2 bg-white text-black rounded-full font-bold"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {artists.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No artists found for this time range.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {artists.map((artist, index) => (
                  <ArtistCard key={`${artist.id}-${index}`} artist={artist} />
                ))}
              </div>
            )}

            {hasNextPage && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 transition-colors disabled:opacity-50"
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More Artists'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TopArtistsPage), { ssr: false });
