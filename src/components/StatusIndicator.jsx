import React from 'react';
import { motion } from 'framer-motion';

const StatusIndicator = ({ status = 'ready' }) => {
    const statusConfig = {
        ready: {
            color: 'bg-green-500',
            text: 'System Ready',
            pulse: true
        },
        analyzing: {
            color: 'bg-blue-500',
            text: 'Analyzing...',
            pulse: true
        },
        complete: {
            color: 'bg-primary',
            text: 'Analysis Complete',
            pulse: false
        },
        error: {
            color: 'bg-red-500',
            text: 'Error Detected',
            pulse: true
        }
    };

    const config = statusConfig[status] || statusConfig.ready;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-8 z-40 glass-effect px-4 py-2 rounded-full flex items-center gap-2"
        >
            <div className="relative">
                <div className={`w-2 h-2 ${config.color} rounded-full ${config.pulse ? 'animate-pulse' : ''}`}></div>
                {config.pulse && (
                    <div className={`absolute inset-0 w-2 h-2 ${config.color} rounded-full animate-ping opacity-75`}></div>
                )}
            </div>
            <span className="text-xs font-mono text-foreground">{config.text}</span>
        </motion.div>
    );
};

export default StatusIndicator;
