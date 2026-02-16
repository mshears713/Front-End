import React, { useState, useEffect, useRef } from 'react';
import { apiClient } from '../lib/api/client';
import { DocCallout } from '../components/DocCallout/DocCallout';
import {
    Play,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    History,
    Activity,
    Box
} from 'lucide-react';

const Jobs: React.FC = () => {
    const [currentJobId, setCurrentJobId] = useState<string | null>(null);
    const [jobStatus, setJobStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const pollInterval = useRef<any>(null);

    const startJob = async () => {
        setLoading(true);
        setJobStatus(null);
        try {
            const res = await apiClient.createJob();
            setCurrentJobId(res.data.job_id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const pollJob = async (id: string) => {
        try {
            const res = await apiClient.getJob(id);
            setJobStatus(res.data);
            if (res.data.status === 'completed' || res.data.status === 'failed') {
                clearInterval(pollInterval.current);
            }
        } catch (err) {
            console.error(err);
            clearInterval(pollInterval.current);
        }
    };

    useEffect(() => {
        if (currentJobId) {
            pollInterval.current = setInterval(() => pollJob(currentJobId), 1000);
            pollJob(currentJobId); // Immediate poll
        }
        return () => clearInterval(pollInterval.current);
    }, [currentJobId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
            case 'failed': return 'text-red-600 bg-red-50 border-red-100';
            case 'running': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-gray-500 bg-gray-50 border-gray-100';
        }
    };

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">Async Jobs</h1>

            <p className="text-gray-600">
                This demo simulates an asynchronous process. Clicking "Start Job" kicks off a background task that we then monitor via polling.
            </p>

            <div className="not-prose my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-6">
                    <div className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm text-center">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Activity size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Job Controller</h3>
                        <p className="text-sm text-gray-500 mb-8">Click below to start a simulated AI summarization job.</p>

                        <button
                            onClick={startJob}
                            disabled={loading || (jobStatus && jobStatus.status === 'running')}
                            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center space-x-3 shadow-lg"
                        >
                            {loading || (jobStatus && jobStatus.status === 'running') ? (
                                <RefreshCw size={20} className="animate-spin" />
                            ) : (
                                <Play size={20} />
                            )}
                            <span>Start Summarization Job</span>
                        </button>
                    </div>

                    <DocCallout type="info" title="Polling Strategy">
                        Since SSE/WebSockets were optional, this client uses periodic polling (every 1 second) to check the job status from the backend.
                    </DocCallout>
                </div>

                {/* Status Dashboard */}
                <div className="bg-white border border-gray-200 rounded-3xl shadow-sm flex flex-col min-h-[400px]">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <History size={18} className="text-gray-400" />
                            <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">Current Job Status</span>
                        </div>
                        {jobStatus && (
                            <span className="text-[10px] font-mono text-gray-400">ID: {jobStatus.job_id.split('-')[0]}...</span>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col p-8 justify-center items-center">
                        {!jobStatus ? (
                            <div className="text-center text-gray-400">
                                <Box size={48} className="mx-auto mb-4 opacity-10" />
                                <p className="text-sm italic">No active job monitors.</p>
                            </div>
                        ) : (
                            <div className="w-full space-y-8">
                                {/* Status Badge */}
                                <div className={`mx-auto w-fit px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${getStatusColor(jobStatus.status)}`}>
                                    {jobStatus.status}
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-bold text-gray-500 uppercase">Progress</span>
                                        <span className="text-2xl font-black text-indigo-600">{jobStatus.progress}%</span>
                                    </div>
                                    <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
                                        <div
                                            className="h-full bg-indigo-500 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                            style={{ width: `${jobStatus.progress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Result */}
                                {jobStatus.status === 'completed' && jobStatus.result && (
                                    <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                        <div className="flex items-center space-x-2 text-emerald-700 font-bold mb-3 text-sm">
                                            <CheckCircle2 size={16} />
                                            <span>Job Result</span>
                                        </div>
                                        <p className="text-sm text-emerald-800 leading-relaxed">
                                            {jobStatus.result.summary}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-emerald-100 text-[10px] text-emerald-600/60 font-mono">
                                            Processed at: {new Date(jobStatus.result.processed_at * 1000).toLocaleString()}
                                        </div>
                                    </div>
                                )}

                                {jobStatus.status === 'failed' && (
                                    <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start space-x-3">
                                        <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                                        <div>
                                            <h4 className="font-bold text-red-900 mb-1">Job Failed</h4>
                                            <p className="text-sm text-red-700">The summarization process encountered an error.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
