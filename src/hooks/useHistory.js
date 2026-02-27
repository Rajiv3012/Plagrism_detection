import { useState, useEffect, useCallback } from 'react';

const DB_NAME = 'PlagDetectDB';
const STORE_NAME = 'history';
const DB_VERSION = 1;

export const useHistory = () => {
    const [history, setHistory] = useState([]);

    const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (e) => resolve(e.target.result);
            request.onerror = (e) => reject(e.target.error);
        });
    };

    const loadHistory = useCallback(async () => {
        try {
            const db = await openDB();
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                setHistory(request.result.reverse());
            };
        } catch (err) {
            console.error("Failed to load history:", err);
        }
    }, []);

    const saveToHistory = async (record) => {
        try {
            const db = await openDB();
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.add({
                ...record,
                timestamp: new Date().toLocaleString()
            });
            await loadHistory(); // Refresh list
        } catch (err) {
            console.error("Failed to save to history:", err);
        }
    };

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    return { history, saveToHistory };
};
