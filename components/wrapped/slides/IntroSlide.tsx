import React from 'react';
import { WrappedData } from '../../../shared/interface';
import StorySlide from '../StorySlide';

interface IntroSlideProps {
  data: WrappedData;
  isActive: boolean;
}

export default function IntroSlide({ data, isActive }: IntroSlideProps) {
  const userImage = data.user.images?.[0]?.url;

  return (
    <StorySlide
      isActive={isActive}
      gradient="from-green-900 via-black to-black"
    >
      <div className="text-center">
        {/* User Profile Image */}
        {userImage && (
          <div
            className={`mb-8 transition-all duration-700 ${
              isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <img
              src={userImage}
              alt={data.user.display_name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-green-500 shadow-2xl shadow-green-500/30"
            />
          </div>
        )}

        {/* Greeting */}
        <p
          className={`text-gray-400 text-lg mb-2 transition-all duration-500 delay-200 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Hey, {data.user.display_name}!
        </p>

        {/* Title */}
        <h1
          className={`text-4xl md:text-6xl font-black mb-4 transition-all duration-500 delay-300 ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Your {data.timeRangeLabel}
          </span>
          <br />
          <span className="text-white">Wrapped</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-gray-500 text-sm transition-all duration-500 delay-500 ${
            isActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Let&apos;s see what you&apos;ve been listening to
        </p>
      </div>
    </StorySlide>
  );
}
