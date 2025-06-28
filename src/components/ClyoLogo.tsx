
import React from 'react';

interface ClyoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ClyoLogo: React.FC<ClyoLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main L shape - larger rectangle */}
        <rect
          x="4"
          y="4"
          width="12"
          height="20"
          fill="currentColor"
          rx="1"
        />
        {/* Smaller rectangle at bottom right */}
        <rect
          x="16"
          y="16"
          width="12"
          height="8"
          fill="currentColor"
          rx="1"
        />
        {/* Small accent square at top right */}
        <rect
          x="20"
          y="4"
          width="8"
          height="8"
          fill="currentColor"
          rx="1"
          transform="rotate(15 24 8)"
        />
      </svg>
    </div>
  );
};

export default ClyoLogo;
