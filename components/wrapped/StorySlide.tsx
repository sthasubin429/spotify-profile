import React from 'react';

interface StorySlideProps {
  isActive: boolean;
  gradient?: string;
  children: React.ReactNode;
}

export default function StorySlide({
  isActive,
  gradient = 'from-gray-900 to-black',
  children
}: StorySlideProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center p-8 
                  bg-gradient-to-br ${gradient} transition-all duration-500
                  ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
    >
      {children}
    </div>
  );
}
