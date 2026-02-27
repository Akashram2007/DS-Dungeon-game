# 🎮 DS GAME – Data Structures Dungeon

An interactive **game-based learning project** to understand **Data Structures & Algorithms** through hands-on gameplay.  
Each level is a dungeon chamber where the player must **apply real DS logic** to escape.

---

## 🚀 Live Concept
Learn Data Structures **by playing**, not memorizing.

> “If you don’t understand the rule, you can’t win the level.”

---

## 🧩 Levels Overview

### 🥇 Level 1 – Stack Chamber
**Concept:** Stack (LIFO)

- Drag & drop blocks
- Only **TOP** element can be moved
- Arrange blocks using valid stack operations
- Win → unlock next level

🧠 Teaches:
- Push
- Pop
- Stack order

---

### 🥈 Level 2 – Queue Chamber
**Concept:** Queue (FIFO)

- 3 Queues displayed in column layout
- Move elements **only from FRONT**
- Insert **only at REAR**
- Goal: Arrange numbers in sorted order in the final queue

🧠 Teaches:
- Enqueue
- Dequeue
- Queue constraints

---

### 🥉 Level 3 – Linked List Chamber
**Concept:** Singly Linked List

- Nodes placed randomly on screen
- Player connects nodes using arrows
- Must arrange nodes in **ascending order**
- Ends when last node points to **NULL**

🧠 Teaches:
- Node connections
- Next pointers
- Traversal logic

---

### 🌳 Level 4 – BST Repair Chamber
**Concept:** Binary Search Tree

- Tree with **missing nodes**
- Drag & drop numbers into correct positions
- Rule:
  - Left child → smaller value
  - Right child → larger value
- Wrong placement → reset

🧠 Teaches:
- BST properties
- Tree traversal logic
- Recursive constraints

---

### 🕸️ Level 5 – Graph Boss Level
**Concept:** Graphs + Shortest Path

- Random weighted graph generated every play
- Click nodes to build a path
- Goal: Find the **shortest path** from Start → End
- Game checks path using **Dijkstra’s Algorithm**
- Wrong path → reset

🧠 Teaches:
- Weighted graphs
- Shortest path logic
- Greedy algorithms

---

## 🗺️ Level Map System

- Central dungeon map
- Levels unlock progressively
- Uses `localStorage` to save progress
- Boss levels unlock only after clearing prerequisites

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Flexbox, Animations)
- **Vanilla JavaScript**
- **Drag & Drop API**
- **SVG / CSS Lines for Graphs**
- **LocalStorage** for level unlocking

---

## 📂 Project Structure
DS-Dungeon/
│
├── index.html                  # Game entry / start screen
│
├── level-map/
│   ├── level-map.html          # Dungeon map (level selection)
│   ├── map.css                 # Map styles
│   └── map.js                  # Level unlock logic
│
├── stack/
│   ├── stack.html              # Stack level UI
│   ├── stack.css               # Stack styles
│   └── stack.js                # Stack game logic (drag & drop)
│
├── queue/
│   ├── queue.html              # Queue level UI
│   ├── queue.css               # Queue styles
│   └── queue.js                # Queue game logic
│
├── linkedlist/
│   ├── linkedlist.html         # Linked list level UI
│   ├── linkedlist.css          # Linked list styles
│   └── linkedlist.js           # Node connection logic
│
├── bst/
│   ├── bst-level.html          # BST repair level UI
│   ├── bst-level.css           # BST styles
│   └── bst-level.js            # BST validation logic
│
├── graph/
│   ├── graph.html              # Graph boss level UI
│   ├── graph.css               # Graph styles
│   └── graph.js                # Shortest path logic (Dijkstra)
│
├── game-complete/
│   ├── game-complete.html      # Final win screen
│   ├── game-complete.css       # Win animations
│   └── game-complete.js        # Navigation logic
│
├── assets/
│   ├── images/                 # Icons, backgrounds
│   ├── sounds/                 # Sound effects (optional)
│   └── fonts/                  # Custom fonts
│
├── style.css                   # Global styles
├── script.js                   # Global utilities (if any)
│
└── README.md                   # Project documentation
---

## 🎯 Learning Goals

- Understand **DS rules through interaction**
- Visualize abstract concepts
- Practice algorithmic thinking
- Learn by **making mistakes**
