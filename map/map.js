const unlocked = Number(localStorage.getItem("levelUnlocked")) || 1;
const score = Number(localStorage.getItem("totalScore")) || 0;

document.querySelectorAll(".level").forEach(level => {
  const lvl = Number(level.dataset.level);

  if (lvl <= unlocked) {
    level.classList.add("unlocked");
  }

  level.onclick = () => {
    if (!level.classList.contains("unlocked")) return;

    if (lvl === 1) {
      window.location.href = "../Stack1/stack.html";
    }
    if (lvl === 2) {
      window.location.href = "../Queue1/queue.html"
    }
    if (lvl === 3) {
      window.location.href = "../linkedlist/linkedlist.html"
    }
    if (lvl === 4) {
      window.location.href = "../bst/bst-level.html"
    }
    if (lvl === 5) {
      window.location.href = "../graph/graph.html"
    }

  };
});