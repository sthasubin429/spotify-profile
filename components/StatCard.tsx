import React from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatCard({
  value,
  label,
  icon,
  size = 'md'
}: StatCardProps) {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div
      className={`rounded bg-gray-900 border border-gray-800 text-white transition-all 
      duration-200 hover:border-gray-700 ${sizeClasses[size]}`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-green-500">{icon}</div>}
        <div>
          <div className="text-lg font-bold md:text-2xl text-white">
            {value}
          </div>
          <div className="text-xs md:text-sm text-gray-400 font-medium">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
