
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
        {/* Circle */}
        <circle
          cx="25"
          cy="25"
          r="15"
          fill="currentColor"
        />
        {/* Vertical part of L */}
        <rect
          x="15"
          y="50"
          width="20"
          height="35"
          fill="currentColor"
        />
        {/* Horizontal part of L */}
        <rect
          x="35"
          y="70"
          width="35"
          height="15"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default ClyoLogo;
