// Set footer year automatically.
document.getElementById("year").textContent = new Date().getFullYear();

// Generic fade-up reveal for sections and cards.
const revealItems = document.querySelectorAll(".fade-up");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Counter animation in the impact section.
const impactSection = document.getElementById("impact");
const counters = document.querySelectorAll(".stat-number");

function animateCounter(counterElement, duration = 1500) {
  const target = Number(counterElement.dataset.target || 0);
  let start = 0;
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

    start = Math.floor(target * eased);
    counterElement.textContent = String(start);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => animateCounter(counter));
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.28 }
);

statsObserver.observe(impactSection);
