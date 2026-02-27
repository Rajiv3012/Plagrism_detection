import { useState, useEffect, useCallback, useRef } from 'react';

export const usePlagiarismWorker = () => {
    const workerRef = useRef(null);
    const [result, setResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    useEffect(() => {
        // Initialize Worker
        workerRef.current = new Worker(new URL('../worker.js', import.meta.url), { type: 'module' });

        workerRef.current.onmessage = (e) => {
            const { type, payload } = e.data;
            if (type === 'RESULT_READY') {
                setResult(payload);
                setIsAnalyzing(false);
            }
        };

        return () => {
            if (workerRef.current) workerRef.current.terminate();
        };
    }, []);

    const checkPlagiarism = useCallback(({ source, suspect, windowSize, kValue }) => {
        setIsAnalyzing(true);
        setResult(null);
        workerRef.current.postMessage({
            type: 'CHECK_PLAGIARISM',
            source,
            suspect,
            windowSize,
            kValue
        });
    }, []);

    return { checkPlagiarism, isAnalyzing, result };
};
