
import React from 'react';

interface GuideStepProps {
  number: number | string | React.ReactNode;
  title?: string;
  isLast?: boolean;
  colorClass?: string;
  children: React.ReactNode;
}

export const GuideStep: React.FC<GuideStepProps> = ({ 
  number, 
  title, 
  isLast = false, 
  colorClass = "bg-blue-100 text-primary border-blue-200",
  children 
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${colorClass}`}>
          {number}
        </div>
        {!isLast && <div className="w-0.5 bg-slate-200 h-full mt-2"></div>}
      </div>
      <div className={`flex flex-col gap-1 ${!isLast ? 'pb-2' : ''} w-full`}>
        {title && <h4 className="font-bold text-text-dark text-sm">{title}</h4>}
        {children}
      </div>
    </div>
  );
};
