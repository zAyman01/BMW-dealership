document.addEventListener("DOMContentLoaded", function () {
  // Tab switching functionality
  const specTabs = document.querySelectorAll(".spec-tab");
  const specPanels = document.querySelectorAll(".spec-panel");

  specTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs and panels
      specTabs.forEach((t) => t.classList.remove("active"));
      specPanels.forEach((p) => p.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show corresponding panel
      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Add animation to spec items when they come into view
  const specItems = document.querySelectorAll(".spec-item");

  // Create an Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe each spec item
  specItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });
});
