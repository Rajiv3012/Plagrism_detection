/**
 * Plagiarism Detection System
 * Main JavaScript File
 */

// DOM Elements
const sourceText = document.getElementById('source-text');
const suspectText = document.getElementById('suspect-text');
const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const themeToggle = document.getElementById('theme-toggle');
const resultsSection = document.getElementById('results-section');

// Web Worker Initialization
// Web Worker Initialization
const worker = new Worker('worker.js');

// Global State for Results
let currentRanges = [];


// Helper Types (JSDoc)
/**
 * @typedef {Object} CheckRequest
 * @property {string} type - Action type
 * @property {string} source - Source text
 * @property {string} suspect - Suspicious text
 * @property {number} windowSize - Winnowing window size
 */

// --- File Handling ---

// Helper to read file
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);

        // Basic support for text files. 
        // For PDF/DOCX, we would need external libs like pdf.js or mammoth.js
        // which we can't easily import without a bundler, so we stick to .txt for this demo logic
        // or assume the user selects text-readable files.
        if (file.type === "text/plain" || file.name.endsWith('.txt')) {
            reader.readAsText(file);
        } else {
            // For demo purposes, try reading as text anyway, logic can be upgraded later
            alert("For this MVP, please upload .txt files. Full PDF/DOCX support requires extra libraries.");
            reader.readAsText(file);
        }
    });
};

const handleFileUpload = async (fileInput, targetTextarea) => {
    const file = fileInput.files[0];
    if (file) {
        try {
            const text = await readFile(file);
            targetTextarea.value = text;
            // Trigger input event to update char counts if we add them later
        } catch (err) {
            console.error("Error reading file:", err);
            alert("Failed to read file.");
        }
    }
};

document.getElementById('source-file').addEventListener('change', (e) => {
    handleFileUpload(e.target, sourceText);
});

document.getElementById('suspect-file').addEventListener('change', (e) => {
    handleFileUpload(e.target, suspectText);
});

// --- Event Listeners ---

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);

    // Update icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Word Count Logic
const updateWordCount = (textarea, display) => {
    const text = textarea.value.trim();
    const count = text ? text.split(/\s+/).length : 0;
    display.textContent = `${count} words`;
};

const sourceCount = document.querySelector('#source-text + .char-count');
const suspectCount = document.querySelector('#suspect-text + .char-count');

sourceText.addEventListener('input', () => updateWordCount(sourceText, sourceCount));
suspectText.addEventListener('input', () => updateWordCount(suspectText, suspectCount));

// Initial count (empty)
updateWordCount(sourceText, sourceCount);
updateWordCount(suspectText, suspectCount);


// Check Plagiarism
checkBtn.addEventListener('click', () => {
    const source = sourceText.value.trim();
    const suspect = suspectText.value.trim();

    if (!source || !suspect) {
        alert('Please enter text in both fields.');
        return;
    }

    // Show loading state
    checkBtn.textContent = 'Analyzing...';
    checkBtn.disabled = true;

    // Get current settings
    const activeSensBtn = document.querySelector('.setting-group .option-btn[data-val].active');
    const currentSensitivity = activeSensBtn ? parseInt(activeSensBtn.dataset.val) : 5;

    const kInput = document.getElementById('k-input');
    const kValue = kInput ? parseInt(kInput.value) : 3;

    // Send data to Web Worker
    worker.postMessage({
        type: 'CHECK_PLAGIARISM',
        source: source,
        suspect: suspect,
        windowSize: currentSensitivity,
        kValue: kValue
    });
});


// --- Settings Logic ---

// Sensitivity: Button Control
const sensButtons = document.querySelectorAll('.setting-group .option-btn[data-val]');

sensButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        sensButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Precision: Sync Buttons & Input
const kInput = document.getElementById('k-input');
const precButtons = document.querySelectorAll('.setting-group .option-btn[data-k]');

// Handle Precision Button Click
precButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.k;
        if (kInput) kInput.value = val;

        precButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Handle Manual Input (Clamp values visual only)
if (kInput) {
    kInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value);
        if (val > 8) val = 8;


        // Update active button if matches preset
        precButtons.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.k) === val);
        });
    });
}

// Clear Inputs
clearBtn.addEventListener('click', () => {
    sourceText.value = '';
    suspectText.value = '';
    resultsSection.classList.add('hidden');
});

// --- Worker Message Handling ---

// Constants (Synced with Worker)
const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
    'when', 'where', 'how', 'who', 'which', 'this', 'that', 'these', 'those',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'at', 'by', 'for', 'from', 'in', 'of', 'on', 'to',
    'with', 'about', 'can', 'could', 'will', 'would', 'should'
]);

function tokenize(text) {
    if (!text) return [];
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(word => !STOP_WORDS.has(word) && word.length > 0);
}

// --- Worker Message Handling ---

worker.onmessage = function (e) {
    const { type, payload } = e.data;

    if (type === 'RESULT_READY') {
        const { score, rangesB, timeTaken } = payload; // Using rangesB (Suspect) for main highlight
        currentRanges = rangesB; // Store for PDF export


        // Update UI Stats
        document.getElementById('score-value').textContent = `${score.toFixed(1)}%`;
        document.getElementById('time-value').textContent = `${timeTaken}ms`;
        document.getElementById('matches-value').textContent = rangesB.length > 0 ? `${rangesB.length} zones` : '0';

        // Visualizing Matches (Highlighted View)
        const diffOutput = document.getElementById('diff-output');
        diffOutput.innerHTML = '';

        if (score === 0) {
            diffOutput.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No significant overlaps found.</p>';
        } else {
            // Reconstruct text with highlights
            const suspectTextVal = suspectText.value;
            const tokens = tokenize(suspectTextVal);

            // Create a set of highlighted indices for O(1) lookup
            const highlightedIndices = new Set();
            rangesB.forEach(([start, end]) => {
                for (let i = start; i <= end; i++) highlightedIndices.add(i);
            });

            // Build HTML
            const container = document.createElement('div');
            container.className = 'highlighted-content glass-panel';
            container.style.lineHeight = '1.6';
            container.style.color = 'var(--text-main)';

            tokens.forEach((token, index) => {
                const span = document.createElement('span');
                span.textContent = token + ' ';
                if (highlightedIndices.has(index)) {
                    span.classList.add('plagiarized');
                }
                container.appendChild(span);
            });

            const label = document.createElement('p');
            label.textContent = "Analyzed Text (Processed):";
            label.style.fontSize = '0.9rem';
            label.style.color = 'var(--text-muted)';
            label.style.marginBottom = '0.5rem';

            diffOutput.appendChild(label);
            diffOutput.appendChild(container);
        }

        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Reset Button
        checkBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Check for Plagiarism';
        checkBtn.disabled = false;

        // Save to History (simplified)
        saveToHistory({
            score,
            timeTaken,
            matchCount: rangesB.length,
            date: new Date().toLocaleString()
        });
    }
};

const exportPDF = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get Dynamic Metadata
    const title = "Plagiarism Audit Report";
    const author = "PlagDetect System";

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Primary Color
    doc.text(title, 20, 20);

    // Meta Info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated by: ${author}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 35);

    // Score Section
    const scoreVal = document.getElementById('score-value').innerText;
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Similarity Score: ${scoreVal}`, 20, 50);

    // Matches Section
    doc.setFontSize(12);
    doc.text("Detected Matches:", 20, 65);

    let yPos = 75;

    if (currentRanges.length === 0) {
        doc.setFontSize(10);
        doc.text("No significant plagiarism detected.", 20, yPos);
    } else {
        doc.setFontSize(10);

        // Reconstruct phrases from ranges
        const text = document.getElementById('suspect-text').value;
        const tokens = tokenize(text);

        currentRanges.forEach((range, index) => {
            const [start, end] = range;
            // Join tokens with space (approximate reconstruction)
            const phrase = tokens.slice(start, end + 1).join(' ');

            if (yPos > 270) { // New Page
                doc.addPage();
                yPos = 20;
            }

            const matchTitle = `Match ${index + 1}:`;
            const splitContent = doc.splitTextToSize(`"${phrase}"`, 160);

            doc.setFont("helvetica", "bold");
            doc.text(matchTitle, 20, yPos);
            yPos += 6;

            doc.setFont("helvetica", "normal");
            doc.text(splitContent, 20, yPos);
            yPos += (splitContent.length * 6) + 6;
        });
    }

    doc.save("plagiarism-report.pdf");
};

document.getElementById('export-pdf').addEventListener('click', exportPDF);

// --- IndexedDB History Handling ---

const DB_NAME = 'PlagDetectDB';
const STORE_NAME = 'history';
const DB_VERSION = 1;

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

const saveToHistory = async (record) => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.add({
            ...record,
            timestamp: new Date().toLocaleString()
        });
    } catch (err) {
        console.error("Failed to save to history:", err);
    }
};

const getHistory = async () => {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        return new Promise((resolve) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result.reverse()); // Newest first
        });
    } catch {
        return [];
    }
};

// History UI Logic
const historyBtn = document.getElementById('history-btn');
let historyPanel = null;

const createHistoryPanel = () => {
    const panel = document.createElement('div');
    panel.className = 'glass-panel';
    panel.style.position = 'fixed';
    panel.style.top = '80px';
    panel.style.right = '20px';
    panel.style.width = '300px';
    panel.style.maxHeight = '500px';
    panel.style.overflowY = 'auto';
    panel.style.zIndex = '1000';
    panel.style.padding = '1rem';
    panel.style.display = 'none';
    panel.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';

    panel.innerHTML = `<h3><i class="fa-solid fa-clock-rotate-left"></i> History</h3><div id="history-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.8rem;"></div>`;

    document.body.appendChild(panel);
    return panel;
};

// Toggle History
historyBtn.addEventListener('click', async () => {
    if (!historyPanel) {
        historyPanel = createHistoryPanel();
    }

    if (historyPanel.style.display === 'none') {
        historyPanel.style.display = 'block';
        const records = await getHistory();
        const list = historyPanel.querySelector('#history-list');
        list.innerHTML = '';

        if (records.length === 0) {
            list.innerHTML = '<p style="color: grey; font-size: 0.9rem;">No history yet.</p>';
        } else {
            records.slice(0, 10).forEach(rec => {
                const item = document.createElement('div');
                item.style.padding = '0.5rem';
                item.style.background = 'rgba(128,128,128,0.1)';
                item.style.borderRadius = '8px';
                item.style.cursor = 'pointer';
                item.innerHTML = `
                    <div style="font-weight: bold; font-size: 0.9rem;">Score: ${rec.score.toFixed(1)}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${rec.timestamp}</div>
                `;
                item.onclick = () => loadHistoryItem(rec);
                list.appendChild(item);
            });
        }
    } else {
        historyPanel.style.display = 'none';
    }
});

const loadHistoryItem = (rec) => {
    sourceText.value = rec.source;
    suspectText.value = rec.suspect;
    document.getElementById('score-value').textContent = `${rec.score.toFixed(1)}%`;
    document.getElementById('matches-value').textContent = rec.matches.length;
    document.getElementById('time-value').textContent = `${rec.timeTaken}ms`;

    // Trigger results view update implicitly or manually
    // For now, we assume user just wants to see the inputs and score
    resultsSection.classList.remove('hidden');
    historyPanel.style.display = 'none';
};


