
import React from 'react';
import { cn } from '../../utils/cn';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={cn("overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent", className)}
            {...props}
        >
            {children}
        </div>
    );
};
