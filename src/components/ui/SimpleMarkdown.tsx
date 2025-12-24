import React from 'react';

interface SimpleMarkdownProps {
    content: string;
}

export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content }) => {
    if (!content) return null;

    // Split by double newline for paragraphs
    const paragraphs = content.split(/\n\n+/);

    return (
        <div className="space-y-2 text-slate-600 dark:text-slate-300 font-medium text-[13px]">
            {paragraphs.map((paragraph, pIndex) => {
                // Handle lists
                if (paragraph.trim().startsWith('*')) {
                    const items = paragraph.split('\n').filter(line => line.trim().startsWith('*'));
                    return (
                        <ul key={pIndex} className="list-disc pl-5 space-y-1">
                            {items.map((item, iIndex) => (
                                <li key={iIndex}>
                                    <FormatText text={item.replace(/^\*\s*/, '')} />
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Standard paragraph
                return (
                    <p key={pIndex}>
                        <FormatText text={paragraph} />
                    </p>
                );
            })}
        </div>
    );
};

const FormatText: React.FC<{ text: string }> = ({ text }) => {
    // Split by bold markers (**text**)
    const parts = text.split(/(\*\*.*?\*\*)/);

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-slate-800 dark:text-slate-200">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={index} className="italic text-slate-500">{part.slice(1, -1)}</em>;
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
};
