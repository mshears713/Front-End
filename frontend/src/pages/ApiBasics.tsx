import React, { useState } from 'react';
import { apiClient } from '../lib/api/client';
import { DocCallout } from '../components/DocCallout/DocCallout';
import { RefreshCw, Zap, Shuffle, ToggleLeft } from 'lucide-react';

const ApiBasics: React.FC = () => {
    const [pingResult, setPingResult] = useState<any>(null);
    const [randomResult, setRandomResult] = useState<any>(null);
    const [toggleValue, setToggleValue] = useState(false);
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const handleAction = async (key: string, fn: () => Promise<any>) => {
        setLoading(prev => ({ ...prev, [key]: true }));
        try {
            const res = await fn();
            if (key === 'ping') setPingResult(res.data);
            if (key === 'random') setRandomResult(res.data);
            if (key === 'toggle') setToggleValue(res.data.value);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">API Basics</h1>

            <p className="text-gray-600">
                These demos cover simple stateless actions: <strong>Ping</strong>, <strong>Random</strong>, and <strong>Toggle</strong>.
                They are perfect for verifying that the frontend can talk to the backend.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-12">
                {/* Ping */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Zap size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Ping</h3>
                    <p className="text-xs text-gray-500 mb-6">Simple heartbeat check</p>
                    <button
                        onClick={() => handleAction('ping', apiClient.ping)}
                        disabled={loading.ping}
                        className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading.ping && <RefreshCw size={16} className="animate-spin" />}
                        <span>Send Ping</span>
                    </button>
                    {pingResult && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg w-full text-left">
                            <span className="text-[10px] font-bold text-gray-400 block mb-1">Response</span>
                            <pre className="text-[10px] font-mono text-gray-600">{JSON.stringify(pingResult, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* Random */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                        <Shuffle size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Random</h3>
                    <p className="text-xs text-gray-500 mb-6">Fetch a random number</p>
                    <button
                        onClick={() => handleAction('random', apiClient.random)}
                        disabled={loading.random}
                        className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading.random && <RefreshCw size={16} className="animate-spin" />}
                        <span>Get Random</span>
                    </button>
                    {randomResult && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg w-full text-left">
                            <span className="text-[10px] font-bold text-gray-400 block mb-1">Response</span>
                            <pre className="text-[10px] font-mono text-gray-600">{JSON.stringify(randomResult, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {/* Toggle */}
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                        <ToggleLeft size={24} className={toggleValue ? 'rotate-180 transition-transform' : 'transition-transform'} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Toggle</h3>
                    <p className="text-xs text-gray-500 mb-6 font-medium">State: {toggleValue ? 'ON' : 'OFF'}</p>
                    <button
                        onClick={() => handleAction('toggle', () => apiClient.toggle(toggleValue))}
                        disabled={loading.toggle}
                        className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                        {loading.toggle && <RefreshCw size={16} className="animate-spin" />}
                        <span>Toggle State</span>
                    </button>
                </div>
            </div>

            <DocCallout type="tip" title="Try it out!">
                Click any of the buttons above and watch the <strong>API Inspector</strong>.
                You'll see the full request and response details, including latency and the simplified data envelope.
            </DocCallout>
        </div>
    );
};

export default ApiBasics;
