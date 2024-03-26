import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

export interface SkeletonBaseProps {
  children: React.ReactNode;
}

export const SkeletonBase: React.FC<SkeletonBaseProps> = ({ children }) => {
  return (
    <SkeletonTheme baseColor="#6e6e6e40" highlightColor="#44444440">
      {children}
    </SkeletonTheme>
  );
};
