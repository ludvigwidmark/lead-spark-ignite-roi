
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
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main L shape - vertical part */}
        <rect
          x="20"
          y="20"
          width="20"
          height="45"
          fill="currentColor"
        />
        {/* Bottom horizontal part of L */}
        <rect
          x="20"
          y="45"
          width="35"
          height="20"
          fill="currentColor"
        />
        {/* Tilted square in upper right */}
        <rect
          x="55"
          y="15"
          width="18"
          height="18"
          fill="currentColor"
          transform="rotate(45 64 24)"
        />
      </svg>
    </div>
  );
};

export default ClyoLogo;
