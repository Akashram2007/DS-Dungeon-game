const stacks = [
  ["B", "D", "A", "C"], 
  [],
  []
];

const TARGET = ["A", "B", "C", "D"];

const stackDivs = document.querySelectorAll(".stack");
const msg = document.getElementById("msg");

let draggedBlock = null;
let fromStack = null;

function render() {
  stackDivs.forEach((div, i) => {
    div.innerHTML = "";

    stacks[i].forEach((block, index) => {
      const el = document.createElement("div");
      el.className = "block";
      el.textContent = block;

      if (index === stacks[i].length - 1) {
        el.draggable = true;

        el.ondragstart = () => {
          draggedBlock = block;
          fromStack = i;
          el.classList.add("dragging");
        };

        el.ondragend = () => {
          el.classList.remove("dragging");
        };
      }

      div.appendChild(el);
    });
  });
}

stackDivs.forEach(div => {
  div.ondragover = e => e.preventDefault();

  div.ondrop = () => {
    const toStack = Number(div.dataset.id);

    if (draggedBlock === null) return;

    stacks[fromStack].pop();

    stacks[toStack].push(draggedBlock);

    draggedBlock = null;
    fromStack = null;

    render();
    checkWin();
  };
});

function checkWin() {
  if (
    stacks[2].length === TARGET.length &&
    JSON.stringify(stacks[2]) === JSON.stringify(TARGET)
  ) {
    msg.textContent = "🎉 STACK LEVEL COMPLETED!";
    msg.style.color = "#00ff88";
    msg.style.fontWeight = "bold";

    localStorage.setItem("levelUnlocked", "2");

    setTimeout(() => {
      window.location.href = "../map/level-map.html";
    }, 1500);
  }
}

render();