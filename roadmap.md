# Plagiarism Detection System Roadmap

This roadmap outlines the development steps for a browser-based Plagiarism Detection System using HTML, CSS, JavaScript, and Fundamental Data Structures.

## Phase 1: Project Initialization & Setup
- [x] **Folder Structure**: Create directories for `css`, `js`, `assets`.
- [x] **Git Setup**: Initialize repository and create `.gitignore`.
- [x] **Skeleton Files**: Create `index.html`, `style.css`, `script.js`.

## Phase 2: User Interface (UI) Design
- [x] **Layout Design**: Create a premium, modern interface with glassmorphism effects.
    - **Input Options**:
        - Text Area for direct copy-paste.
        - **File Upload Area**: Drag & drop support for `.txt`.
    - **Dual View**: Source Text vs. Suspicious Text (or File).
- [x] **Styling**: Use CSS Variables, Flexbox/Grid, and animations for a "wow" factor.
- [x] **Interactivity**: Add buttons for "Check Plagiarism", "Clear", "Load Sample", and File Upload triggers.

## Phase 3: Core Algorithms (Data Structures & Logic)
- [x] **Text Preprocessing**:
    - tokenization, normalizing cases, removing special chars/stop words.
    - **Synonym Detection**: (Basic implementation or skipped for MVP).
    - **File Parsing**: Implement logic to read `.txt` files.
- [x] **Algorithm Implementation**:
    - **Approach 1: Jaccard Similarity** (Set Theory) - For global similarity %.
    - **Approach 2: Rabin-Karp & Winnowing** - Use Rolling Hash with Winnowing for robust fingerprinting (industry standard).
    - **Approach 3: Optimization** - Monotonic Deque for O(N) Winnowing.
- [x] **Data Structures**:
    - `Sets` for Jaccard.
    - `Rolling Hash` & `Deque` (for Winnowing sliding window).
    - `Map`: for Fingerprint storage.

## Phase 4: Implementation (Performance & Scalability)
- [x] **Web Workers**: Move heavy algorithms to a background thread to keep the UI smooth (non-blocking).
- [x] **Input Handling**: Capture text from textareas AND uploaded files.
- [x] **Logic Integration**:
    - Run **Rabin-Karp** to detect potential matches.
    - Calculate Similarity Score.
- [x] **Result Display (Diff View)**:
    - Show percentage similarity.
    - **Side-by-Side Comparison**: Visually connect matching chunks between documents.
    - Highlight copied sections using color coding.

## Phase 5: Advanced Features (Bonus)
- [x] **Export to PDF**: Generate a downloadable report of the plagiarism check using `jspdf`.
- [x] **Persistance (IndexedDB)**: Store past checks and larger datasets locally using IndexedDB.
- [x] **Visual Analytics**: Display similarity score and stats.
- [ ] **Real-time Checking**: Implement debounce logic to check as the user types (future).
- [x] **Dark/Light Mode**: Toggle for better accessibility and user preference.

## Phase 6: Testing & Optimization
- [x] **Edge Cases**: Empty inputs, identical texts, totally different texts.
- [x] **Performance**: Benchmark Web Worker speed vs Main Thread.
- [x] **Mobile Responsiveness**: Ensure it works on smaller screens.

## Phase 7: Documentation & Final Polish
- [x] **Readme**: Instructions on how to run.
- [x] **Code Comments**: Deep dive into the "Winnowing" and "Rolling Hash" logic.
