import React, { useState } from 'react';
import { TimeRange, WrappedData } from '../../shared/interface';
import { useWrappedData } from '../../hooks/useWrappedData';
import WrappedLanding from './WrappedLanding';
import WrappedStory from './WrappedStory';

type ViewState = 'landing' | 'loading' | 'viewing';

export default function WrappedContainer() {
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.Medium);
  const [wrappedData, setWrappedData] = useState<WrappedData | null>(null);

  const { data, isLoading, isError } = useWrappedData(timeRange);

  const handleCreateWrapped = () => {
    setViewState('loading');
  };

  // Transition to viewing once data is ready
  React.useEffect(() => {
    if (viewState === 'loading' && data && !isLoading) {
      setWrappedData(data);
      setViewState('viewing');
    }
  }, [viewState, data, isLoading]);

  const handleClose = () => {
    setViewState('landing');
    setWrappedData(null);
  };

  const handleRestart = () => {
    setViewState('landing');
    setWrappedData(null);
  };

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load your Wrapped data.</p>
          <button
            onClick={() => setViewState('landing')}
            className="px-6 py-3 bg-green-500 text-black font-bold rounded-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (viewState === 'viewing' && wrappedData) {
    return (
      <WrappedStory
        data={wrappedData}
        onClose={handleClose}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <WrappedLanding
      timeRange={timeRange}
      onTimeRangeChange={setTimeRange}
      onCreateWrapped={handleCreateWrapped}
      isLoading={viewState === 'loading'}
    />
  );
}
