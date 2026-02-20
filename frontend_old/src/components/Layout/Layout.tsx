import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Home,
    Activity,
    FormInput,
    List,
    PlayCircle,
    BookOpen,
    Terminal,
    Menu,
    X
} from 'lucide-react';

import { ApiInspector } from "../ApiInspector/ApiInspector";


export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const navItems = [
        { to: '/', icon: <Home size={20} />, label: 'Home' },
        { to: '/basics', icon: <Activity size={20} />, label: 'API Basics' },
        { to: '/forms', icon: <FormInput size={20} />, label: 'Forms & Validation' },
        { to: '/lists', icon: <List size={20} />, label: 'Lists & Pagination' },
        { to: '/jobs', icon: <PlayCircle size={20} />, label: 'Async Jobs' },
        { to: '/frameworks', icon: <BookOpen size={20} />, label: 'Frameworks' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <span className={`font-bold text-indigo-600 ${isSidebarOpen ? 'block' : 'hidden'}`}>DevDocs Demo</span>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`
                            }
                        >
                            {item.icon}
                            <span className={`${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-white">
                <header className="h-16 border-b border-gray-200 flex items-center px-8 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <h1 className="text-xl font-semibold text-gray-800">Integration Demo</h1>
                </header>
                <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
                    <Outlet />
                </div>
            </main>

            {/* API Inspector Panel */}
            <div className="w-96 border-l border-gray-200 bg-gray-50/50 flex flex-col shrink-0">
                <ApiInspector />
            </div>
        </div>
    );
};
