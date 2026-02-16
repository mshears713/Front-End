import React from 'react';
import { DocCallout } from '../components/DocCallout/DocCallout';
import {
    Code2,
    Layers,
    Cpu,
    Fingerprint,
    ExternalLink,
    Smartphone,
    Globe,
    Zap
} from 'lucide-react';

const Frameworks: React.FC = () => {
    const frameworks = [
        {
            name: 'React',
            desc: 'The industry-standard library for building component-based user interfaces. This demo uses React 18 with its robust ecosystem.',
            icon: <Cpu className="text-blue-500" />,
            color: 'blue'
        },
        {
            name: 'FastAPI',
            desc: 'High-performance Python web framework built on standard Python type hints. Powers the backend of this assimilation demo.',
            icon: <Zap className="text-emerald-500" />,
            color: 'emerald'
        },
        {
            name: 'Next.js',
            desc: 'The React framework for the web, enabling features like server-side rendering and generating static websites.',
            icon: <Layers className="text-black" />,
            color: 'gray'
        },
        {
            name: 'Vite',
            desc: 'A modern frontend build tool that significantly improves the frontend development experience. This demo is powered by Vite.',
            icon: <Fingerprint className="text-amber-500" />,
            color: 'amber'
        }
    ];

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">Frameworks Overview</h1>

            <p className="text-gray-600 mb-12">
                Modern web development relies on a ecosystem of specialized tools.
                Here is a high-level overview of the technologies featured in this integration demo and how they compare.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mb-16">
                {frameworks.map((fw) => (
                    <div key={fw.name} className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm hover:translate-y-[-4px] transition-all group">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors">
                                {fw.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{fw.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed mb-6">
                            {fw.desc}
                        </p>
                        <button className="flex items-center space-x-2 text-xs font-bold text-gray-400 group-hover:text-indigo-600 transition-colors uppercase tracking-widest">
                            <span>Learn more</span>
                            <ExternalLink size={12} />
                        </button>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-16 mb-6">Technology Comparison</h2>
            <div className="not-prose overflow-hidden border border-gray-200 rounded-3xl shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700">Category</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Tool</th>
                            <th className="px-6 py-4 font-bold text-gray-700">Use Case</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 flex items-center space-x-2">
                                <Globe size={16} className="text-indigo-500" />
                                <span className="font-medium">Frontend</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs">React + Vite</td>
                            <td className="px-6 py-4 text-gray-500 italic">SPA, Documentation, Admin Panels</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 flex items-center space-x-2">
                                <Smartphone size={16} className="text-emerald-500" />
                                <span className="font-medium">Backend</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs">FastAPI</td>
                            <td className="px-6 py-4 text-gray-500 italic">High-performance APIs, ML Microservices</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 flex items-center space-x-2">
                                <Cpu size={16} className="text-amber-500" />
                                <span className="font-medium">Language</span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs">TypeScript / Python</td>
                            <td className="px-6 py-4 text-gray-500 italic">Type safety, Developer productivity</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <DocCallout type="tip" title="Why this stack?">
                The <strong>FastAPI + React</strong> combination is a powerful pairing for AI-driven applications.
                FastAPI's native support for JSON schemas and async processing makes it perfect for the non-blocking job patterns shown on the <a href="/jobs">Async Jobs</a> page.
            </DocCallout>
        </div>
    );
};

export default Frameworks;
