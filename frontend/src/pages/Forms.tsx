import React, { useState } from 'react';
import { apiClient } from '../lib/api/client';
import { DocCallout } from '../components/DocCallout/DocCallout';
import { Send, AlertCircle, CheckCircle2, User, Mail, Calendar, StickyNote } from 'lucide-react';

const Forms: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: 0,
        notes: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(null);

        try {
            await apiClient.validateForm(formData);
            setSuccess('Validation successful! Data is ready for submission.');
        } catch (err: any) {
            if (err.error?.code === 'VALIDATION_ERROR') {
                setErrors(err.error.details || {});
            } else {
                setErrors({ general: err.error?.message || 'An unexpected error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field: string) => `
    block w-full px-4 py-3 rounded-xl border transition-all
    ${errors[field] ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-200 focus:ring-indigo-500 focus:border-indigo-500'}
  `;

    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">Forms & Validation</h1>

            <p className="text-gray-600">
                This page demonstrates how to handle field-level validation errors returned from the FastAPI backend.
            </p>

            <DocCallout type="warning" title="Validation Rules">
                <ul className="list-disc ml-4 space-y-1">
                    <li><strong>Name:</strong> Required, minimum 2 characters</li>
                    <li><strong>Email:</strong> Must be a valid email format</li>
                    <li><strong>Age:</strong> Must be between 13 and 120</li>
                </ul>
            </DocCallout>

            <div className="not-prose max-w-2xl mx-auto my-12">
                <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 rounded-3xl shadow-sm space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center space-x-2">
                                <User size={14} className="text-gray-400" />
                                <span>Full Name</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Jane Doe"
                                className={inputClass('name')}
                            />
                            {errors.name && <p className="text-xs text-red-500 font-medium flex items-center space-x-1"><AlertCircle size={10} /> <span>{errors.name}</span></p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center space-x-2">
                                <Mail size={14} className="text-gray-400" />
                                <span>Email Address</span>
                            </label>
                            <input
                                type="text"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="jane@example.com"
                                className={inputClass('email')}
                            />
                            {errors.email && <p className="text-xs text-red-500 font-medium flex items-center space-x-1"><AlertCircle size={10} /> <span>{errors.email}</span></p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center space-x-2">
                                <Calendar size={14} className="text-gray-400" />
                                <span>Age</span>
                            </label>
                            <input
                                type="number"
                                value={formData.age || ''}
                                onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                                placeholder="25"
                                className={inputClass('age')}
                            />
                            {errors.age && <p className="text-xs text-red-500 font-medium flex items-center space-x-1"><AlertCircle size={10} /> <span>{errors.age}</span></p>}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center space-x-2">
                            <StickyNote size={14} className="text-gray-400" />
                            <span>Notes</span>
                        </label>
                        <textarea
                            rows={3}
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Tell us something..."
                            className={inputClass('notes')}
                        />
                    </div>

                    {errors.general && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start space-x-3 border border-red-100">
                            <AlertCircle className="shrink-0 mt-0.5" size={18} />
                            <span>{errors.general}</span>
                        </div>
                    )}

                    {success && (
                        <div className="p-4 bg-green-50 text-green-700 rounded-xl text-sm flex items-start space-x-3 border border-green-100">
                            <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        {loading ? <Send size={20} className="animate-pulse" /> : <Send size={20} />}
                        <span>{loading ? 'Validating...' : 'Submit Form'}</span>
                    </button>
                </form>
            </div>

            <DocCallout type="info" title="How it works">
                When you submit the form, the <code>apiClient</code> makes a POST request to <code>/api/v1/forms/validate</code>.
                The backend validates the data using Pydantic models. If validation fails, it returns a <code>400 Bad Request</code> with a structured error envelope, which we map back to the individual form fields.
            </DocCallout>
        </div>
    );
};

export default Forms;
