import React from 'react';
import { DocCallout } from '../components/DocCallout/DocCallout';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const flows = [
        { title: 'Ping Flow', desc: 'Open API Basics, click Ping, see result + inspector entry', path: '/basics' },
        { title: 'Validation Flow', desc: 'Open Forms, submit invalid data, see errors + inspector', path: '/forms' },
        { title: 'List Flow', desc: 'Open Lists, search and paginate, watch inspector params', path: '/lists' },
        { title: 'Async Flow', desc: 'Open Jobs, start job, observe progress and result', path: '/jobs' }
    ];

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                AI Integration Demo
            </h1>
            <p className="text-xl text-gray-500 mb-8">
                Welcome to the documentation and integration playground for the Full-Stack Assimilation Demo.
            </p>

            <DocCallout type="info" title="What is this?">
                This site is a docs-style demo designed to test how an AI agent integrates a React frontend with a FastAPI backend.
                It covers common patterns like form validation, pagination, and async job status polling.
            </DocCallout>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Golden Flows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                {flows.map((flow) => (
                    <Link
                        key={flow.path}
                        to={flow.path}
                        className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-indigo-500 hover:shadow-lg transition-all group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{flow.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{flow.desc}</p>
                            </div>
                            <ArrowRight className="text-gray-300 group-hover:text-indigo-500 transition-colors" size={20} />
                        </div>
                    </Link>
                ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-6">How to use</h2>
            <ol className="space-y-4 text-gray-600">
                <li className="flex items-start space-x-3">
                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                    <span>Keep the <strong>API Inspector</strong> on the right open to see network traffic.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                    <span>Navigate through the sidebar to explore different API integration patterns.</span>
                </li>
                <li className="flex items-start space-x-3">
                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                    <span>Check the <strong>Integration Notes</strong> in the README for technical details.</span>
                </li>
            </ol>
        </div>
    );
};

export default Home;
