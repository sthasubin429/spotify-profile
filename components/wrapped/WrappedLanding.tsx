import React from 'react';
import { TimeRange } from '../../shared/interface';
import { TIME_RANGE_LABELS } from '../../utils/wrappedUtils';

interface WrappedLandingProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onCreateWrapped: () => void;
  isLoading: boolean;
}

export default function WrappedLanding({
  timeRange,
  onTimeRangeChange,
  onCreateWrapped,
  isLoading
}: WrappedLandingProps) {
  const timeRangeOptions = [
    { value: TimeRange.Short, label: 'Last 4 Weeks' },
    { value: TimeRange.Medium, label: 'Last 6 Months' },
    { value: TimeRange.Long, label: 'All Time' }
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
                 bg-gradient-to-br from-black via-gray-900 to-green-900 text-white p-6"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Your Wrapped
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your listening journey with personalized stats and insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-4">Choose your time period</p>
          <div className="flex flex-wrap justify-center gap-3">
            {timeRangeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => onTimeRangeChange(option.value)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                  timeRange === option.value
                    ? 'bg-green-500 text-black scale-105'
                    : 'bg-gray-800/80 text-white hover:bg-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateWrapped}
          disabled={isLoading}
          className="group relative px-10 py-4 bg-green-500 text-black font-bold text-lg rounded-full 
                   hover:bg-green-400 hover:scale-105 transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span className="flex items-center gap-3">
              <svg
                className="animate-spin h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating Your Wrapped...
            </span>
          ) : (
            'Create Your Wrapped'
          )}
        </button>

        {/* Description */}
        <p className="mt-8 text-gray-500 text-sm max-w-sm mx-auto">
          See your top songs, artists, genres, and listening mood from{' '}
          {TIME_RANGE_LABELS[timeRange].toLowerCase()}
        </p>
      </div>
    </div>
  );
}
