
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
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Geometric shapes */}
        <rect x="8" y="8" width="12" height="12" fill="currentColor" rx="2" />
        <rect x="28" y="8" width="12" height="12" fill="currentColor" rx="2" />
        <circle cx="14" cy="34" r="6" fill="currentColor" />
        <polygon points="34,28 40,34 34,40 28,34" fill="currentColor" />
      </svg>
    </div>
  );
};

export default GeometricLogo;
