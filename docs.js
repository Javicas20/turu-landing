const guideSections = [...document.querySelectorAll("#introduccion, .docs-section[id]")];
const guideLinks = [...document.querySelectorAll('.docs-nav a[href^="#"], .docs-toc a[href^="#"]')];
const readingBar = document.querySelector(".toc-reading i");
const readingLabel = document.querySelector(".toc-reading b");

function setActiveSection(id) {
  guideLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) setActiveSection(visible[0].target.id);
  }, { rootMargin: "-22% 0px -64%", threshold: 0 });

  guideSections.forEach((section) => sectionObserver.observe(section));
}

function updateReadingProgress() {
  const article = document.querySelector(".docs-content");
  if (!article) return;
  const rect = article.getBoundingClientRect();
  const total = Math.max(article.offsetHeight - window.innerHeight, 1);
  const read = Math.min(Math.max(-rect.top + 120, 0) / total, 1);
  readingBar?.style.setProperty("--read-progress", String(read));
  if (readingLabel) readingLabel.textContent = `${Math.round(read * 100)}%`;
}

updateReadingProgress();
window.addEventListener("scroll", updateReadingProgress, { passive: true });
