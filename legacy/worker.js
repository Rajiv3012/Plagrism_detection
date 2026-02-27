// Constants
const BASE = 256;
const MOD = 1000000007;

const STOP_WORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
    'when', 'where', 'how', 'who', 'which', 'this', 'that', 'these', 'those',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'at', 'by', 'for', 'from', 'in', 'of', 'on', 'to',
    'with', 'about', 'can', 'could', 'will', 'would', 'should'
]);

/**
 * Web Worker for Plagiarism Detection Algorithms
 * Handles heavy computations: Tokenization, Hashing, Matching
 */
self.onmessage = function (e) {
    const { type, source, suspect, windowSize, kValue } = e.data;

    if (type === 'CHECK_PLAGIARISM') {
        const startTime = performance.now();

        // 1. Tokenization with Stop Word Filtering
        const tokensA = tokenize(source);
        const tokensB = tokenize(suspect);

        // 2. Winnowing with Rolling Hash & Monotonic Deque
        const k = kValue || 5; // K-gram size (Default 5)
        const w = windowSize || 4; // Window size for Winnowing

        const fingerprintsA = winnowing(tokensA, k, w);
        const fingerprintsB = winnowing(tokensB, k, w);

        // 3. Comparison (Fingerprint Intersection)
        // Convert map values (positions) to sets of hashes for comparison
        const hashesA = new Set(fingerprintsA.keys());
        const hashesB = new Set(fingerprintsB.keys());

        const intersection = new Set([...hashesA].filter(x => hashesB.has(x)));
        const union = new Set([...hashesA, ...hashesB]);

        const jaccardIndex = union.size === 0 ? 0 : (intersection.size / union.size);
        const score = (jaccardIndex * 100);

        // 4. Detailed Match Indices (Raw)
        const indicesA = new Set();
        const indicesB = new Set();

        intersection.forEach(hash => {
            const posA = fingerprintsA.get(hash);
            const posB = fingerprintsB.get(hash);

            // Mark all tokens in the k-gram as active
            if (posA) {
                posA.forEach(start => {
                    for (let i = 0; i < k; i++) indicesA.add(start + i);
                });
            }
            if (posB) {
                posB.forEach(start => {
                    for (let i = 0; i < k; i++) indicesB.add(start + i);
                });
            }
        });

        // 5. Compress Indices into Ranges (Optimization)
        const rangesA = compressRanges(Array.from(indicesA).sort((a, b) => a - b));
        const rangesB = compressRanges(Array.from(indicesB).sort((a, b) => a - b));

        // Construct exact match list (reconstruction)
        const matches = [];
        intersection.forEach(hash => {
            const positions = fingerprintsA.get(hash);
            if (positions && positions.length > 0) {
                const start = positions[0];
                const segment = tokensA.slice(start, start + k).join(' ');
                matches.push(segment);
            }
        });

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);

        self.postMessage({
            type: 'RESULT_READY',
            payload: {
                score,
                matches,
                rangesA, // Send Compressed Ranges
                rangesB,
                timeTaken
            }
        });
    }
};

// --- Helper Functions ---

/**
 * Tokenizes text: Lowercase, remove punctuation, filter stop words
 */
function tokenize(text) {
    if (!text) return [];
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .replace(/\s+/g, ' ')    // Collapse whitespace
        .trim()
        .split(' ')
        .filter(word => !STOP_WORDS.has(word) && word.length > 0);
}

/**
 * Optimized Winnowing with Monotonic Deque
 * Time Complexity: O(N)
 */
function winnowing(tokens, k, w) {
    const fingerprints = new Map();
    const n = tokens.length;
    if (n < k) return fingerprints;

    const hashes = [];

    // -- 1. Rolling Hash Generation (Same as before) --
    const wordHashes = tokens.map(t => hashString(t));

    let highPower = 1;
    for (let i = 0; i < k - 1; i++) highPower = (highPower * BASE) % MOD;

    let currentHash = 0;
    for (let i = 0; i < k; i++) currentHash = (currentHash * BASE + wordHashes[i]) % MOD;
    hashes.push({ hash: currentHash, pos: 0 });

    for (let i = 1; i <= n - k; i++) {
        const prevWordHash = wordHashes[i - 1];
        const nextWordHash = wordHashes[i + k - 1];
        let term1 = (currentHash - (prevWordHash * highPower) % MOD);
        if (term1 < 0) term1 += MOD;
        currentHash = (term1 * BASE + nextWordHash) % MOD;
        hashes.push({ hash: currentHash, pos: i });
    }

    // -- 2. Monotonic Deque for Sliding Window Min --
    // We want the right-most minimum in window of size w.
    // Window covers hashes[i]...hashes[i + w - 1] implies we pick one hash per shift?
    // Winnowing definition: At least one hash selected in every window of size w.
    // The previous implementation loops i from 0 to hashes.length - w.

    if (hashes.length < w) {
        // Small text fallback
        let minH = hashes[0];
        for (let h of hashes) if (h.hash < minH.hash) minH = h; // basic min
        recordFingerprint(fingerprints, minH.hash, minH.pos);
        return fingerprints;
    }

    const deque = []; // Stores indices of hashes array

    for (let i = 0; i < hashes.length; i++) {
        // 1. Remove elements out of window (index <= i - w)
        while (deque.length > 0 && deque[0] <= i - w) {
            deque.shift();
        }

        // 2. Maintain Monotonicity (Increasing Order of Values)
        // We want Minimum at front.
        // If current val <= back of deque, pop back (because current is smaller/equal and newer)
        // Note: strictly "<=" is needed for "Right-most minimum" rule. 
        // If equal, we prefer the newer one (right-most), so we discard the old one.
        while (deque.length > 0 && hashes[deque[deque.length - 1]].hash >= hashes[i].hash) {
            deque.pop();
        }

        // 3. Add current index
        deque.push(i);

        // 4. Record Fingerprint
        // We start recording once we have a full window (i >= w - 1)
        if (i >= w - 1) {
            const minIndex = deque[0];
            const minHashObj = hashes[minIndex];
            recordFingerprint(fingerprints, minHashObj.hash, minHashObj.pos);
        }
    }

    return fingerprints;
}

/**
 * Standard String Hashing (Polynomial Rolling Hash for a single string)
 * Used to convert a word into an integer for the outer Rolling Hash
 */
function hashString(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % MOD;
    }
    return hash;
}

function recordFingerprint(map, hash, pos) {
    if (!map.has(hash)) {
        map.set(hash, []);
    }
    map.get(hash).push(pos);
}

/**
 * Compresses an array of sorted indices into ranges
 * Expects input to be a sorted array of unique integers.
 * e.g., [1, 2, 3, 5, 6] -> [[1, 3], [5, 6]]
 */
function compressRanges(indices) {
    if (indices.length === 0) return [];

    const ranges = [];
    let start = indices[0];
    let prev = indices[0];

    for (let i = 1; i < indices.length; i++) {
        if (indices[i] !== prev + 1) {
            ranges.push([start, prev]);
            start = indices[i];
        }
        prev = indices[i];
    }
    ranges.push([start, prev]);
    return ranges;
}
