/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Props {
  children?: React.ReactNode;
  customCssContainer?: any;
  className?: string;
}

export const Card: React.FC<Props> = ({ children, customCssContainer, className = '' }) => {
  return (
    <div
      style={customCssContainer ? customCssContainer : {}}
      className={`group flex flex-col gap-2 rounded-lg bg-white p-5 shadow-custom ${className}`}
    >
      {children}
    </div>
  );
};
