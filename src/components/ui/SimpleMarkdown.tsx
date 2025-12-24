import React from 'react';

interface SimpleMarkdownProps {
    content: string;
}

export const SimpleMarkdown: React.FC<SimpleMarkdownProps> = ({ content }) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];

    let currentList: string[] = [];
    let key = 0;

    const flushList = () => {
        if (currentList.length > 0) {
            elements.push(
                <ul key={`list-${key++}`} className="list-disc pl-5 space-y-1 mb-2">
                    {currentList.map((item, index) => (
                        <li key={index}>
                            <FormatText text={item} />
                        </li>
                    ))}
                </ul>
            );
            currentList = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmed = line.trim();

        // Empty line -> flush list
        if (!trimmed) {
            flushList();
            return;
        }

        // List item
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            currentList.push(trimmed.replace(/^[\*\-]\s*/, ''));
            return;
        }

        // Not a list item -> flush list if exists
        flushList();

        // Blockquote
        if (trimmed.startsWith('>')) {
            const quoteContent = trimmed.replace(/^>\s*/, '');
            elements.push(
                <blockquote key={`quote-${key++}`} className="border-l-4 border-slate-300 dark:border-slate-600 pl-4 py-1 my-2 italic text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg">
                    <FormatText text={quoteContent} />
                </blockquote>
            );
            return;
        }

        // Standard paragraph line (or header)
        // Check for formatting like **Header:**
        elements.push(
            <p key={`p-${key++}`} className="mb-1">
                <FormatText text={trimmed} />
            </p>
        );
    });

    // Final flush
    flushList();

    return (
        <div className="space-y-1 text-slate-600 dark:text-slate-300 font-medium text-[13px]">
            {elements}
        </div>
    );
};

const FormatText: React.FC<{ text: string }> = ({ text }) => {
    // Split by bold markers (**text**) then italic (*text*)
    const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g);

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-slate-800 dark:text-slate-200">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                    return <em key={index} className="italic text-slate-500">{part.slice(1, -1)}</em>;
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
};
