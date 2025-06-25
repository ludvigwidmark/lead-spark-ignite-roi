
import React from 'react';

interface GeometricLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GeometricLogo = ({ size = 'md', className = '' }: GeometricLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main geometric shapes inspired by the logo in the image */}
        <rect x="4" y="4" width="16" height="16" fill="currentColor" rx="2" />
        <rect x="28" y="4" width="16" height="16" fill="currentColor" rx="2" transform="rotate(45 36 12)" />
        <circle cx="12" cy="36" r="8" fill="currentColor" />
        <polygon points="36,28 44,36 36,44 28,36" fill="currentColor" />
      </svg>
    </div>
  );
};

export default GeometricLogo;
