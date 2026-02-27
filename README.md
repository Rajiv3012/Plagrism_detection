# Plagiarism Detection System 🕵️‍♂️✨

**PlagDetect.ai** is a modern, high-performance plagiarism detection tool built with vanilla HTML, CSS, and JavaScript. It leverages advanced algorithms like **Rabin-Karp**, **Winnowing**, and **Jaccard Similarity** to provide accurate and efficient text analysis entirely in the browser.

## 🚀 Key Features

*   **Fast & Accurate**: Uses the Rabin-Karp rolling hash algorithm combined with the Winnowing algorithm (fingerprinting) to detect plagiarism even when text is rearranged.
*   **Privacy-First**: Analysis runs locally in your browser using **Web Workers**. No data is sent to any server.
*   **Detailed Reports**:
    *   Percentage similarity score.
    *   Exact match highlighting.
    *   Downloadable **PDF Reports**.
*   **History Tracking**: Automatically saves your past checks using **IndexedDB**.
*   **Modern UI/UX**:
    *   Glassmorphism design.
    *   Dark/Light mode support.
    *   Responsive layout for all devices.
*   **Optimized Performance**:
    *   **Monotonic Deque** optimization for O(N) Winnowing.
    *   Web Worker offloading to prevent UI freezing.

## 🧠 Algorithms & Technical Details

This project demonstrates the practical application of fundamental data structures and algorithms:

1.  **Text Preprocessing**: Tokenization, stop-word removal, and normalization.
2.  **Rabin-Karp Algorithm**: Uses a rolling hash function to efficiently compute hashes for substrings (n-grams).
3.  **Winnowing Algorithm**: A fingerprinting technique that selects a subset of hashes (using a sliding window) to guarantee that matches of a certain length are detected. This significantly reduces the index size while maintaining accuracy.
4.  **Monotonic Deque**: Optimizes the sliding window minimum calculation in the Winnowing algorithm to linear time complexity **O(N)**.
5.  **Jaccard Similarity**: Calculates the similarity coefficient between the two sets of document fingerprints.

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Variables, Flexbox, Grid), JavaScript (ES6+).
*   **Performance**: Web Workers, IndexedDB.
*   **Libraries**:
    *   `jspdf`: For checking report generation.
    *   `Chart.js`: For visualizing similarity scores.
    *   FontAwesome: For icons.

## 📦 How to Run

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Ajajeet93/pizzahut.git
    ```
    *(Note: Repository name might differ from project name)*

2.  **Open the project**:
    Navigate to the project folder.

3.  **Run**:
    Simply open the `index.html` file in any modern web browser.
    *   Recommended: Use a local server (e.g., Live Server extension in VS Code) for the best experience with Web Workers (some browsers restrict workers on `file://` protocol).

## 📝 Usage

1.  **Input Text**: Paste text into the "Source Text" and "Suspect Text" areas, or upload `.txt` files.
2.  **Adjust Settings**:
    *   **Scan Density**: Choose between Fast, Balanced, or Deep scan.
    *   **Match Length**: Set the minimum word count for a match (Sensitivity).
3.  **Check**: Click "Check for Plagiarism".
4.  **Review**: See the similarity score and highlighted matches.
5.  **Export/History**: Download a PDF report or view past checks from the history menu.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
*Built with ❤️ by Ajeet*
