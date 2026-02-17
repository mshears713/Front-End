import React, { useState, useEffect } from 'react';
import { addInspectorListener, removeInspectorListener, InspectorEntry } from '../../lib/api/client';
import { Trash2, ChevronRight, ChevronDown, Clock, ArrowRightLeft } from 'lucide-react';

export const ApiInspector: React.FC = () => {
    const [entries, setEntries] = useState<InspectorEntry[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => {
        const handler = (entry: InspectorEntry) => {
            setEntries(prev => {
                // Prevent duplicates from multiple fires or re-renders
                if (prev.some(e => e.id === entry.id)) return prev;
                return [entry, ...prev].slice(0, 50);
            });
        };
        addInspectorListener(handler);
        return () => removeInspectorListener(handler);
    }, []);

    const clearHistory = () => {
        setEntries([]);
        setExpandedId(null);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center shrink-0">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Activity Log</span>
                <button
                    onClick={clearHistory}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Clear History"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400 p-8 text-center">
                        <ArrowRightLeft size={32} className="mb-2 opacity-20" />
                        <p className="text-sm">No API calls intercepted yet.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {entries.map((entry) => (
                            <div key={entry.id} className="bg-white">
                                <button
                                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                >
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${entry.status >= 400 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {entry.status}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-mono font-bold text-gray-900">{entry.method}</span>
                                            <span className="text-xs font-mono text-gray-500 truncate">{entry.url.replace(/^.*\/api\/v1/, '')}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Clock size={10} className="text-gray-400" />
                                            <span className="text-[10px] text-gray-400">{entry.latency}ms</span>
                                        </div>
                                    </div>
                                    {expandedId === entry.id ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                                </button>

                                {expandedId === entry.id && (
                                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-100 space-y-3">
                                        {entry.requestBody && (
                                            <div className="mt-3">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Request Body</span>
                                                <pre className="mt-1 p-2 bg-gray-900 text-gray-300 rounded text-[10px] overflow-x-auto">
                                                    {JSON.stringify(entry.requestBody, null, 2)}
                                                </pre>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Response Body</span>
                                            <pre className="mt-1 p-2 bg-gray-900 text-gray-300 rounded text-[10px] overflow-x-auto font-mono">
                                                {JSON.stringify(entry.responseBody, null, 2)}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
