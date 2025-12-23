
import React from 'react';

interface GuideContainerProps {
  children: React.ReactNode;
}

export const GuideContainer: React.FC<GuideContainerProps> = ({ children }) => {
  return (
    <div className="px-5 pb-6 pt-2 animate-in slide-in-from-top-2">
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </div>
  );
};
