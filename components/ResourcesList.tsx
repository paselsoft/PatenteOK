
import React from 'react';
import { RESOURCES } from '../constants';
import { ScrollArea } from './ui/ScrollArea';

const ResourcesList: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="material-symbols-rounded text-primary dark:text-blue-400">library_books</span>
                    Materiale Informativo
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Documentazione ufficiale e guide utili per la tua patente.
                </p>
            </div>

            <ScrollArea className="h-[400px]">
                <div className="p-4 grid gap-3">
                    {RESOURCES.map((resource) => (
                        <a
                            key={resource.id}
                            href={`/docs/${encodeURIComponent(resource.filename)}`}
                            download={resource.filename}
                            className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-rounded text-primary dark:text-blue-400 text-2xl">
                                    {resource.icon}
                                </span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800">
                                        {resource.category}
                                    </span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                                    {resource.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                    {resource.filename}
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                                <span className="material-symbols-rounded text-xl">download</span>
                            </div>
                        </a>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ResourcesList;
