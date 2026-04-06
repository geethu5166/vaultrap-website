const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  document.querySelectorAll("#navLinks a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const speedUnit = element.dataset.unit || "%";
  const start = performance.now();
  const duration = 1200;

  const step = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const value = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    element.textContent = `${value}${speedUnit}`;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    animateCounter(entry.target);
    countObserver.unobserve(entry.target);
  });
}, { threshold: 0.6 });

counters.forEach((counter) => countObserver.observe(counter));

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
