const canvas = document.getElementById("canvas");
const numBox = document.getElementById("numbers");
const msg = document.getElementById("msg");

let placedCount = 0;
let draggedValue = null;
let missingValues = [];

const tree = {
  val: null, x: 420, y: 40,
  left: {
    val: null, x: 260, y: 120,
    left: {
      val: null, x: 160, y: 200,
      left: { val: null, x: 120, y: 280, left: null, right: null },
      right:{ val: null, x: 200, y: 280, left: null, right: null }
    },
    right: { val: null, x: 340, y: 200, left: null, right: null }
  },
  right: {
    val: null, x: 580, y: 120,
    left: { val: null, x: 500, y: 200, left: null, right: null },
    right:{ val: null, x: 660, y: 200, left: null, right: null }
  }
};

function inorder(node, arr = []) {
  if (!node) return arr;
  inorder(node.left, arr);
  arr.push(node);
  inorder(node.right, arr);
  return arr;
}

function randomSortedNumbers(count) {
  const set = new Set();
  while (set.size < count) {
    set.add(Math.floor(Math.random() * 90) + 10);
  }
  return [...set].sort((a, b) => a - b);
}

function initTree() {
  canvas.innerHTML = "";
  numBox.innerHTML = "";
  msg.textContent = "";
  placedCount = 0;
  draggedValue = null;
  missingValues = [];

  const nodes = inorder(tree);
  const values = randomSortedNumbers(nodes.length);

  nodes.forEach((n, i) => n.val = values[i]);

  const indexes = nodes
    .map((_, i) => i)
    .filter(i => i !== Math.floor(nodes.length / 2))
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  indexes.forEach(i => {
    missingValues.push(nodes[i].val);
    nodes[i].val = null;
  });

  missingValues.forEach(v => {
    const d = document.createElement("div");
    d.className = "num";
    d.textContent = v;
    d.draggable = true;
    d.ondragstart = () => draggedValue = v;
    numBox.appendChild(d);
  });

  render(tree, -Infinity, Infinity);
}

function drawNode(val, x, y) {
  const d = document.createElement("div");
  d.className = "node";
  d.textContent = val;
  d.style.left = x + "px";
  d.style.top = y + "px";
  canvas.appendChild(d);
}

function render(node, min, max) {
  if (!node) return;

  if (node.val !== null) {
    drawNode(node.val, node.x, node.y);
  } else {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.style.left = node.x + "px";
    slot.style.top = node.y + "px";

    slot.ondragover = e => e.preventDefault();
    slot.ondrop = () => {
      if (draggedValue === null) return;

      if (draggedValue > min && draggedValue < max) {
        node.val = draggedValue;         
        drawNode(draggedValue, node.x, node.y);
        slot.remove();
        markUsed(draggedValue);
        placedCount++;
        draggedValue = null;
        checkWin();
      }
    };

    canvas.appendChild(slot);
  }

  render(node.left, min, node.val ?? max);
  render(node.right, node.val ?? min, max);
}


function markUsed(val) {
  document.querySelectorAll(".num").forEach(n => {
    if (+n.textContent === val) n.classList.add("used");
  });
}

function isValidBST(node, min = -Infinity, max = Infinity) {
  if (!node) return true;
  if (node.val === null) return false;
  if (node.val <= min || node.val >= max) return false;

  return (
    isValidBST(node.left, min, node.val) &&
    isValidBST(node.right, node.val, max)
  );
}

function resetLevel() {
  msg.textContent = "❌ WRONG BST ORDER! TRY AGAIN";
  msg.style.color = "red";
  msg.style.fontWeight = "bold";

  setTimeout(() => {
    initTree();
  }, 1200);
}

function checkWin() {
  if (placedCount === missingValues.length) {

    if (isValidBST(tree)) {
      msg.textContent = "✅ BST PERFECT! INORDER TRAVERSAL...";
      msg.style.color = "#00ff88";
      msg.style.fontWeight = "bold";

      inorderTraversalAnimation(tree);

      localStorage.setItem("levelUnlocked", "5");

      setTimeout(() => {
        window.location.href = "../map/level-map.html";
      }, 3000);

    } else {
      resetLevel();
    }
  }
}

function inorderTraversalAnimation(node, delay = 0) {
  if (!node) return delay;

  delay = inorderTraversalAnimation(node.left, delay);

  setTimeout(() => {
    const nodes = document.querySelectorAll(".node");
    nodes.forEach(n => {
      if (Number(n.textContent) === node.val) {
        n.style.background = "#00ff88";
        n.style.color = "#000";
        n.style.transform = "scale(1.1)";
      }
    });
  }, delay);

  delay += 400;

  delay = inorderTraversalAnimation(node.right, delay);
  return delay;
} 

initTree();