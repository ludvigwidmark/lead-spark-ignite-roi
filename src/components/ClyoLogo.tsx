
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
          x="15"
          y="15"
          width="25"
          height="55"
          fill="currentColor"
        />
        {/* Bottom horizontal part of L */}
        <rect
          x="40"
          y="55"
          width="30"
          height="15"
          fill="currentColor"
        />
        {/* Small tilted square in upper right */}
        <rect
          x="55"
          y="25"
          width="15"
          height="15"
          fill="currentColor"
          transform="rotate(15 62.5 32.5)"
        />
      </svg>
    </div>
  );
};

export default ClyoLogo;
