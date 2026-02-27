const arrow = {};
const values = Array.from({ length: 4 }, () =>
  Math.floor(Math.random() * 90 + 10)
);

const nodes = {};
values.forEach((v, i) => (nodes[i] = v));

const next = {};
let selected = null;

const canvas = document.getElementById("canvas");
const svg = document.getElementById("arrows");
const nodeDivs = document.querySelectorAll(".node");
const msg = document.getElementById("msg");

svg.innerHTML = `
<defs>
  <marker id="arrowhead" markerWidth="10" markerHeight="7"
    refX="10" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#00ffcc"/>
  </marker>

  <marker id="arrowhead-red" markerWidth="10" markerHeight="7"
    refX="10" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4d"/>
  </marker>
</defs>
`;

nodeDivs.forEach(div => {
  const id = div.dataset.id;

  if (id !== "HEAD" && id !== "NULL") {
    div.textContent = nodes[id];
  }

  div.style.left = Math.random() * 80 + "%";
  div.style.top = Math.random() * 70 + "%";
});

nodeDivs.forEach(div => {
  div.onclick = () => {
    const id = div.dataset.id;

    if (selected === null) {
      selected = id;
      div.classList.add("selected");
    } else {
      if (selected === id) {
        clear();
        return;
      }

      next[selected] = id;
      drawArrow(selected, id);
      clear();
      checkWin();
    }
  };
});

function clear() {
  nodeDivs.forEach(n => n.classList.remove("selected"));
  selected = null;

}

nodeDivs.forEach(div => {
  div.addEventListener("contextmenu", e => {
    e.preventDefault(); 

    const id = div.dataset.id;

    if (next[id]) {
      delete next[id];

      if (arrows[id]) {
        arrows[id].remove();
        delete arrows[id];
      }

      msg.textContent = "↩ Pointer removed";
    }
  });
});

function drawArrow(fromId, toId) {
  const from = document.querySelector(`.node[data-id="${fromId}"]`);
  const to = document.querySelector(`.node[data-id="${toId}"]`);

  const canvasRect = canvas.getBoundingClientRect();
  const fromRect = from.getBoundingClientRect();
  const toRect = to.getBoundingClientRect();

  const x1 = fromRect.right - canvasRect.left;
  const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top;
  const x2 = toRect.left - canvasRect.left;
  const y2 = toRect.top + toRect.height / 2 - canvasRect.top;

  if (arrows[fromId]) {
    arrows[fromId].remove();
  }

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  let isCorrect = true;

  if (fromId !== "HEAD" && toId !== "NULL") {
    if (nodes[toId] < nodes[fromId]) isCorrect = false;
  }

  if (toId === "NULL") {
    const max = Math.max(...Object.values(nodes));
    if (nodes[fromId] !== max) isCorrect = false;
  }

  line.setAttribute("class", isCorrect ? "arrow" : "arrow wrong");

  svg.appendChild(line);

  arrows[fromId] = line;
}

function checkWin() {
  let cur = "HEAD";
  let visited = [];
  let lastNode = null;

  while (next[cur]) {
    cur = next[cur];

    if (cur === "NULL") break;

    visited.push(nodes[cur]);
    lastNode = cur;

    if (visited.length > Object.keys(nodes).length) return;
  }

  if (visited.length !== Object.keys(nodes).length) return;

  const sorted = [...visited].sort((a, b) => a - b);
  if (JSON.stringify(visited) !== JSON.stringify(sorted)) return;

  if (next[lastNode] !== "NULL") return;

  localStorage.setItem("levelUnlocked", "4");
  msg.textContent = "✅ LINKED LIST COMPLETED (Properly Terminated)";

  setTimeout(() => {
    window.location.href = "../map/level-map.html";
  }, 1200);
}