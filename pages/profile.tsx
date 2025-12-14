import React from 'react';
import { useMe } from '../hooks/useMe';
import { useTopArtists } from '../hooks/useTopArtists';
import { useTopTracks } from '../hooks/useTopTracks';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const ProfilePage = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const { data: user, isLoading: userLoading, error: userError } = useMe();
  const {
    data: artists,
    isLoading: artistsLoading,
    error: artistsError
  } = useTopArtists();
  const {
    data: tracks,
    isLoading: tracksLoading,
    error: tracksError
  } = useTopTracks();

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      router.push('/');
    }
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isLoading = userLoading || artistsLoading || tracksLoading;
  const hasError = userError || artistsError || tracksError;

  return (
    <div className="min-h-screen bg-black">
      {/* Profile Header Section */}
      <div className="px-4 md:px-12 py-12 md:py-16 border-b border-gray-800">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="space-y-4 text-center">
              <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full animate-pulse" />
              <p className="text-gray-500 text-sm">Loading your profile...</p>
            </div>
          </div>
        ) : hasError ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-400 font-semibold mb-4">
                Error loading profile data
              </p>
              <button
                onClick={() => router.reload()}
                className="px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-black font-medium transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Info - Centered */}
            <div className="flex flex-col items-center text-center gap-6">
              {/* Profile Picture */}
              <img
                src={user?.images[0]?.url || '/vercel.svg'}
                alt={user?.display_name}
                className="h-40 w-40 md:h-48 md:w-48 rounded-full object-cover"
              />

              {/* Username */}
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {user?.display_name}
              </h1>

              {/* Followers & Following Pills */}
              <div className="flex items-center gap-4 justify-center flex-wrap">
                <div className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800">
                  <span className="text-gray-400 text-sm">
                    <span className="font-bold text-white">
                      {user?.followers.total || 0}
                    </span>{' '}
                    Followers
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full bg-gray-900 border border-gray-800">
                  <span className="text-gray-400 text-sm">
                    <span className="font-bold text-white">
                      {user?.product || 'free'}
                    </span>{' '}
                    Plan
                  </span>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors duration-200 mt-4"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>

      {/* Top Artists and Tracks Section */}
      <div className="px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Artists Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Top Artists
              </h2>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-6">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="rounded bg-gray-800 animate-pulse h-48"
                    />
                  ))}
              </div>
            ) : artists && artists.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {artists.map(artist => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm">
                No top artists found. Listen to more music!
              </div>
            )}
          </div>

          {/* Top Tracks Section */}
          <div>
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Top Tracks
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="rounded bg-gray-800 animate-pulse h-16"
                    />
                  ))}
              </div>
            ) : tracks && tracks.length > 0 ? (
              <div className="space-y-3">
                {tracks.map(track => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm">
                No top tracks found. Listen to more music!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
