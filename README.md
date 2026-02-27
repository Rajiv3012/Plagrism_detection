# Plagrism_detection
🔎 Overview

The Plagiarism Detection System is a backend-based application designed to detect textual similarity between documents using efficient string-matching and hashing algorithms.

The system compares uploaded documents against stored source texts and calculates similarity percentage using fingerprinting and hashing techniques.

🎯 Problem Statement

Academic institutions and content platforms require an automated system to detect plagiarism in submitted documents. Manual comparison is inefficient and unreliable.

This project aims to:

Detect copied or highly similar content

Provide similarity percentage

Highlight matched sections

Support large-scale document comparison efficiently

🏗 System Architecture
                ┌───────────────────┐
                │   Client (Web)    │
                └─────────┬─────────┘
                          │ REST API
                          ▼
                ┌───────────────────┐
                │   Backend Server  │
                │ (Node/Java/Python)│
                ├───────────────────┤
                │  Preprocessing    │
                │  Tokenization     │
                │  Hashing Engine   │
                │  Similarity Calc  │
                └─────────┬─────────┘
                          │
                          ▼
                ┌───────────────────┐
                │    Database       │
                │ (MySQL/MongoDB)   │
                └───────────────────┘
🧠 Core Algorithm Design
1️⃣ Text Preprocessing

Convert to lowercase

Remove punctuation

Remove stopwords

Normalize whitespace

Example:

"The quick brown fox."
→ "quick brown fox"
2️⃣ Fingerprinting (Rabin-Karp Based)

We use:

Rolling Hash

Window size = k (e.g., 5 words)

Modulo hashing

Rolling Hash Formula
𝐻
𝑎
𝑠
ℎ
=
(
𝑝
𝑟
𝑒
𝑣
𝑖
𝑜
𝑢
𝑠
𝐻
𝑎
𝑠
ℎ
−
𝑓
𝑖
𝑟
𝑠
𝑡
𝐶
ℎ
𝑎
𝑟
×
𝑏
𝑎
𝑠
𝑒
(
𝑘
−
1
)
)
×
𝑏
𝑎
𝑠
𝑒
+
𝑛
𝑒
𝑤
𝐶
ℎ
𝑎
𝑟
Hash=(previousHash−firstChar×base
(
k−1))×base+newChar

Base = 256

Mod = 10^9 + 7

3️⃣ Similarity Calculation
Jaccard Similarity
𝑆
𝑖
𝑚
𝑖
𝑙
𝑎
𝑟
𝑖
𝑡
𝑦
=
∣
𝐼
𝑛
𝑡
𝑒
𝑟
𝑠
𝑒
𝑐
𝑡
𝑖
𝑜
𝑛
∣
∣
𝑈
𝑛
𝑖
𝑜
𝑛
∣
×
100
Similarity=
∣Union∣
∣Intersection∣
	​

×100

OR

Cosine Similarity (Optional Advanced)

Used if TF-IDF vectorization is implemented.

🗄 Database Design
📄 Table: Documents
Field	Type	Description
id	INT	Primary Key
title	VARCHAR	Document title
content	TEXT	Original text
fingerprint	TEXT	Stored hash values
created_at	TIMESTAMP	Upload time
📄 Table: Comparison_Results
Field	Type	Description
id	INT	Primary Key
doc1_id	INT	Foreign key
doc2_id	INT	Foreign key
similarity	FLOAT	Percentage
matched_segments	TEXT	Highlighted parts
🔄 System Workflow

User uploads document

Backend preprocesses text

Generate k-gram fingerprints

Store hashes in DB

Compare with existing fingerprints

Compute similarity

Return result

⚙️ API Design
📤 Upload Document
POST /api/upload

Request:

{
  "title": "Sample Doc",
  "content": "Text content here..."
}

Response:

{
  "message": "Document uploaded successfully"
}
📊 Compare Document
POST /api/compare

Response:

{
  "similarity": 72.45,
  "matched_with": "Document 5"
}
🧩 Data Structures Used
Purpose	Data Structure
Word storage	ArrayList
Frequency count	HashMap
Fingerprints	HashSet
Comparison	Set operations
Sliding Window	Queue
🚀 Performance Optimization

Use HashSet for O(1) lookup

Use rolling hash to avoid recomputation

Store fingerprints instead of full text comparison

Index database columns

Time Complexity:

Preprocessing → O(n)

Fingerprint generation → O(n)

Comparison → O(n)

🌍 Deployment Strategy
Backend:

Node.js / Spring Boot

Hosted on Render / AWS / Vercel (API only)

Database:

MySQL / MongoDB Atlas

Frontend:

React / HTML + Tailwind

📈 Future Improvements

PDF & DOCX parsing

AI-based semantic similarity

BERT embeddings

Real-time plagiarism detection

Highlight matched text visually

Large-scale indexing using Elasticsearch

🛡 Security Considerations

JWT authentication

Rate limiting

Input validation

File size restriction

SQL injection protection

📊 Sample Output
Document A vs Document B

Similarity Score: 78%

Matched Phrases:
- "machine learning algorithms"
- "data preprocessing techniques"
🧪 Testing Strategy

Unit Testing for:

Hash function

Jaccard similarity

Stopword removal

Integration testing for API

Edge cases:

Empty document

Very large document

Completely identical text
