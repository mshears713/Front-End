import React from 'react';
import { Info, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

interface DocCalloutProps {
    type: 'info' | 'warning' | 'success' | 'tip';
    title?: string;
    children: React.ReactNode;
}

export const DocCallout: React.FC<DocCalloutProps> = ({ type, title, children }) => {
    const styles = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-800',
            icon: <Info className="text-blue-500" size={20} />
        },
        warning: {
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            text: 'text-amber-800',
            icon: <AlertCircle className="text-amber-500" size={20} />
        },
        success: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-800',
            icon: <CheckCircle className="text-emerald-500" size={20} />
        },
        tip: {
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            text: 'text-indigo-800',
            icon: <Lightbulb className="text-indigo-500" size={20} />
        }
    };

    const currentStyle = styles[type];

    return (
        <div className={`p-4 rounded-xl border ${currentStyle.bg} ${currentStyle.border} my-6 flex space-x-4`}>
            <div className="shrink-0 mt-0.5">{currentStyle.icon}</div>
            <div className="flex-1">
                {title && <h4 className={`font-bold mb-1 ${currentStyle.text}`}>{title}</h4>}
                <div className={`text-sm leading-relaxed ${currentStyle.text}`}>{children}</div>
            </div>
        </div>
    );
};
