// script.js

// Save and restore contenteditable fields
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[contenteditable]').forEach(el => {
    const saved = localStorage.getItem(el.id);
    if (saved) el.innerHTML = saved;
    el.addEventListener("input", () => {
      if (el.id) {
        localStorage.setItem(el.id, el.innerHTML);
      }
    });
  });

  // Set the initial theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
  }
});

// Toggle theme
const toggleThemeButton = document.getElementById("themeToggle");
if (toggleThemeButton) {
  toggleThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    
    // Save theme preference in localStorage
    if (document.body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// Download resume as PDF
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const element = document.getElementById("resume");
  html2pdf().from(element).save("resume.pdf");
});

// Material Ripple Effect
function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  button.style.setProperty("--ripple-x", `${event.offsetX}px`);
  button.style.setProperty("--ripple-y", `${event.offsetY}px`);

  const ripple = button.querySelector(".ripple");
  if (ripple) ripple.remove();

  button.appendChild(circle);
}

downloadBtn.addEventListener("click", createRipple);
