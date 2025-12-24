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
                const trimmed = paragraph.trim();

                // Handle lists
                if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => {
                        const t = line.trim();
                        return t.startsWith('* ') || t.startsWith('- ');
                    });
                    return (
                        <ul key={pIndex} className="list-disc pl-5 space-y-1">
                            {items.map((item, iIndex) => (
                                <li key={iIndex}>
                                    <FormatText text={item.replace(/^[\*\-]\s*/, '')} />
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Handle blockquotes
                if (trimmed.startsWith('>')) {
                    const quoteContent = paragraph.replace(/^>\s*/gm, '').replace(/\n/g, ' ');
                    return (
                        <blockquote key={pIndex} className="border-l-4 border-primary/30 pl-4 py-2 my-3 text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-r-lg italic shadow-sm">
                            <FormatText text={quoteContent} />
                        </blockquote>
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
    // Split by bold markers (**text**) then italic (*text*)
    // A simplified parser. For nested, we'd need recursion or a better parser, 
    // but for this specific file, simple splitting works if we prioritize bold.

    // We can't just split by regex easily for both without overlapping logic in a simple map.
    // Let's stick to the previous logic but ensure it handles italics correctly too.
    // The previous implementation handled both but sequentially in the map? No, it used split(/(\*\*.*?\*\*)/).
    // To handle *italic* as well, we can refine the regex to match both.

    const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*)/g); // Match **bold** OR *italic*

    return (
        <>
            {parts.map((part, index) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index} className="font-bold text-slate-800 dark:text-slate-200">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
                    return <em key={index} className="italic text-slate-500 font-serif">{part.slice(1, -1)}</em>;
                }
                return <span key={index}>{part}</span>;
            })}
        </>
    );
};
