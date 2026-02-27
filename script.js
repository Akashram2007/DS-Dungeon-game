startBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "map/level-map.html";
  }, 600);
});

if (!localStorage.getItem("levelUnlocked")) {
  localStorage.setItem("levelUnlocked", "1");
  localStorage.setItem("totalScore", "0");
}

document.getElementById("startBtn").onclick = () => {
  window.location.href = "map/level-map.html";
};