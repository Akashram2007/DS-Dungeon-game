const graphDiv = document.getElementById("graph");
const pathText = document.getElementById("path");
const costText = document.getElementById("cost");
const msg = document.getElementById("msg");

const nodes = {
  A: { x: 60,  y: 60 },
  B: { x: 260, y: 60 },
  C: { x: 460, y: 60 },
  D: { x: 60,  y: 260 },
  E: { x: 260, y: 260 },
  F: { x: 460, y: 260 }
};

const connections = {
  A: ["B", "D"],
  B: ["A", "C", "E"],
  C: ["B", "F"],
  D: ["A", "E"],
  E: ["D", "B", "F"],
  F: ["C", "E"]
};

const edges = {};
Object.keys(connections).forEach(a => edges[a] = {});

Object.keys(connections).forEach(a => {
  connections[a].forEach(b => {
    if (!edges[a][b]) {
      const w = Math.floor(Math.random() * 5) + 1; // 1–5
      edges[a][b] = w;
      edges[b][a] = w;
    }
  });
});

const START = "A";
const END = "F";

let current = START;
let path = [START];
let cost = 0;

Object.keys(nodes).forEach(n => {
  const d = document.createElement("div");
  d.className = "node";
  d.dataset.id = n;
  d.textContent = n;
  d.style.left = nodes[n].x + "px";
  d.style.top = nodes[n].y + "px";

  if (n === START) d.classList.add("visited");

  d.onclick = () => handleClick(n, d);
  graphDiv.appendChild(d);
});

function drawEdge(from, to) {
  const a = nodes[from];
  const b = nodes[to];

  const x1 = a.x + 20;
  const y1 = a.y + 20;
  const x2 = b.x + 20;
  const y2 = b.y + 20;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;

  const edge = document.createElement("div");
  edge.className = "edge";
  edge.style.width = length + "px";
  edge.style.left = x1 + "px";
  edge.style.top = y1 + "px";
  edge.style.transform = `rotate(${angle}deg)`;

  edge.dataset.from = from;
  edge.dataset.to = to;

  graphDiv.appendChild(edge);

  const label = document.createElement("div");
  label.className = "edge-label";
  label.textContent = edges[from][to];
  label.style.left = (a.x + b.x) / 2 + "px";
  label.style.top  = (a.y + b.y) / 2 + "px";
  graphDiv.appendChild(label);
}

Object.keys(connections).forEach(a => {
  connections[a].forEach(b => {
    if (a < b) drawEdge(a, b);
  });
});

function handleClick(node, el) {
  if (!edges[current][node]) return;

  const prev = current;         
  current = node;

  path.push(node);
  cost += edges[prev][node];

  el.classList.add("visited");

  pathText.textContent = "Path: " + path.join(" → ");
  costText.textContent = "Cost: " + cost;

  document.querySelectorAll(".edge").forEach(e => {
    if (
      (e.dataset.from === prev && e.dataset.to === node) ||
      (e.dataset.from === node && e.dataset.to === prev)
    ) {
      e.classList.add("active");
    }
  });

  if (node === END) finish();
}

function dijkstra(start) {
  const dist = {};
  const visited = {};

  Object.keys(nodes).forEach(n => {
    dist[n] = Infinity;
    visited[n] = false;
  });

  dist[start] = 0;

  for (let i = 0; i < Object.keys(nodes).length; i++) {
    let u = null;
    let min = Infinity;

    Object.keys(dist).forEach(n => {
      if (!visited[n] && dist[n] < min) {
        min = dist[n];
        u = n;
      }
    });

    if (!u) break;
    visited[u] = true;

    Object.keys(edges[u]).forEach(v => {
      if (dist[u] + edges[u][v] < dist[v]) {
        dist[v] = dist[u] + edges[u][v];
      }
    });
  }
  return dist[END];
}

function finish() {
  const shortest = dijkstra(START);

  if (cost === shortest) {
    msg.textContent = "✅ SHORTEST PATH FOUND!";
    msg.style.color = "#00ff88";

    localStorage.setItem("levelUnlocked", "6");

    setTimeout(() => {
      window.location.href = "../complete/game-complete.html";
    }, 1500);
  } else {
    msg.textContent = "❌ WRONG PATH!";
    msg.style.color = "red";
    setTimeout(() => location.reload(), 1200);
  }
}