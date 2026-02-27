
const queues = [
  [3, 1, 4, 2], 
  [],           
  []            
];

const TARGET = [1, 2, 3, 4];

const queueDivs = document.querySelectorAll(".queue");
const msg = document.getElementById("msg");

let dragged = null;
let fromQueue = null;

function render() {
  queueDivs.forEach((div, qi) => {
    div.innerHTML = "";

    queues[qi].forEach((val, index) => {
      const el = document.createElement("div");
      el.className = "block";
      el.textContent = val;

      if (index === 0) {
        el.draggable = true;

        el.ondragstart = () => {
          dragged = val;
          fromQueue = qi;
          el.classList.add("dragging");
        };

        el.ondragend = () => {
          el.classList.remove("dragging");
        };
      }

      div.appendChild(el);
    });

    div.ondragover = e => e.preventDefault();

    div.ondrop = () => {
      if (dragged === null) return;

      queues[fromQueue].shift();

      queues[qi].push(dragged);

      dragged = null;
      fromQueue = null;

      render();
      checkWin();
    };
  });
}

function checkWin() {
  if (
    JSON.stringify(queues[2]) === JSON.stringify(TARGET)
  ) {
    msg.textContent = "🎉 QUEUE LEVEL COMPLETED!";
    msg.style.color = "#00ff4c";
    msg.style.fontWeight = "bold";

    localStorage.setItem("levelUnlocked", "4");

    setTimeout(() => {
      window.location.href = "../map/level-map.html";
    }, 1500);
  }
}

render();