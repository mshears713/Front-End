import React, { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api/client';
import { DocCallout } from '../components/DocCallout/DocCallout';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Tag,
    Layers,
    RefreshCw,
    Box
} from 'lucide-react';
import { debounce } from 'lodash';

const Lists: React.FC = () => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const pageSize = 10;

    const fetchItems = async (q: string, p: number) => {
        setLoading(true);
        try {
            const res = await apiClient.listItems({ q, page: p, page_size: pageSize });
            setItems(res.data);
            setTotal(res.meta.total);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const debouncedFetch = useCallback(
        debounce((q: string, p: number) => fetchItems(q, p), 300),
        []
    );

    useEffect(() => {
        debouncedFetch(search, page);
    }, [search, page, debouncedFetch]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">Lists & Pagination</h1>

            <p className="text-gray-600">
                Demonstrates a data table with server-side searching and pagination.
                Requests are debounced to avoid hammering the API during typing.
            </p>

            <div className="not-prose my-12 space-y-6">
                {/* Toolbar */}
                <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-2xl shadow-sm">
                    <div className="relative flex-1 max-w-md">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // Reset to first page on search
                            }}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                        />
                    </div>
                    <div className="flex items-center text-xs font-medium text-gray-500 space-x-2 px-4">
                        <Layers size={14} />
                        <span>{total} Total Items</span>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Item Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading && items.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center">
                                            <RefreshCw size={32} className="mx-auto text-indigo-500 animate-spin mb-4" />
                                            <p className="text-gray-400 text-sm">Loading items...</p>
                                        </td>
                                    </tr>
                                ) : items.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-20 text-center">
                                            <Box size={32} className="mx-auto text-gray-200 mb-4" />
                                            <p className="text-gray-400 text-sm">No items found matching your search.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-400">#{item.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.title}</div>
                                                <div className="text-xs text-gray-500 mt-1 max-w-md truncate">{item.description}</div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {item.tags.map((tag: string) => (
                                                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold">
                                                            <Tag size={10} className="mr-1" /> {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); alert(`Actions for ${item.title} coming soon!`); }}
                                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">
                            Showing page {page} of {totalPages || 1}
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all disabled:opacity-30"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading || totalPages === 0}
                                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all disabled:opacity-30"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DocCallout type="tip" title="Search Tip">
                Try searching for "Item 10" or "Item 5". Notice how the <code>q</code>, <code>page</code>, and <code>page_size</code> parameters are automatically updated in the API Inspector log.
            </DocCallout>
        </div>
    );
};

export default Lists;
