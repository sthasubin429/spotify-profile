import React from 'react';
import { TimeRange } from '../shared/interface';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (timeRange: TimeRange) => void;
}

export default function TimeRangeSelector({
  value,
  onChange
}: TimeRangeSelectorProps) {
  const options = [
    { label: 'All Time', value: TimeRange.Long },
    { label: 'Last 6 Months', value: TimeRange.Medium },
    { label: 'Last Month', value: TimeRange.Short }
  ];

  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 md:pb-0 sticky top-0 bg-black z-10 py-4">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
            value === option.value
              ? 'bg-white text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
