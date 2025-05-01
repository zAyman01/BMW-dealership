import { models } from "./models-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("carId");

  if (carId) {
    const car = models.find((model) => model.carId === carId);

    if (car) {
      const modelNameSection = document.querySelector(".model-name");
      modelNameSection.querySelector("h1").textContent = car.carName;
      modelNameSection.querySelector("p").textContent = car.subTitle;

      document.querySelector(".model-description").textContent =
        car.description;

      const priceSection = document.querySelector(".model-price");
      priceSection.querySelector(
        "h2"
      ).textContent = `$${car.price.toLocaleString()}`;

      document.querySelector(".model-img-container img").src = car.image;

      const performancePanel = document.querySelector("#performance");
      performancePanel.querySelectorAll(
        ".spec-details p"
      )[0].textContent = `${car.performance.horsepower} HP`;
      performancePanel.querySelectorAll(
        ".spec-details p"
      )[1].textContent = `${car.performance.torque} Nm`;
      performancePanel.querySelectorAll(
        ".spec-details p"
      )[2].textContent = `${car.performance.acceleration} seconds`;
      performancePanel.querySelectorAll(
        ".spec-details p"
      )[3].textContent = `${car.performance.topSpeed} km/h`;

      const enginePanel = document.querySelector("#engine");
      enginePanel.querySelectorAll(".spec-details p")[0].textContent =
        car.powerTrain.engine;
      enginePanel.querySelectorAll(".spec-details p")[1].textContent =
        car.powerTrain.transmission;
      enginePanel.querySelectorAll(".spec-details p")[2].textContent =
        car.powerTrain.fuelEconomy;
      enginePanel.querySelectorAll(
        ".spec-details p"
      )[3].textContent = `${car.powerTrain.weight} kg`;

      const dimensionsPanel = document.querySelector("#dimensions");
      dimensionsPanel.querySelectorAll(
        ".spec-details p"
      )[0].textContent = `${car.dimensions.length} mm`;
      dimensionsPanel.querySelectorAll(
        ".spec-details p"
      )[1].textContent = `${car.dimensions.width} mm`;
      dimensionsPanel.querySelectorAll(
        ".spec-details p"
      )[2].textContent = `${car.dimensions.height} mm`;
      dimensionsPanel.querySelectorAll(
        ".spec-details p"
      )[3].textContent = `${car.dimensions.wheelbase} mm`;

      const featuresPanel = document.querySelector("#features");
      featuresPanel.querySelectorAll(".spec-details p")[0].textContent =
        car.features.driveType;
      featuresPanel.querySelectorAll(
        ".spec-details p"
      )[1].textContent = `${car.features.tireSize.front} (Front), ${car.features.tireSize.rear} (Rear)`;
      featuresPanel.querySelectorAll(".spec-details p")[2].textContent =
        car.features.battery;
      featuresPanel.querySelectorAll(
        ".spec-details p"
      )[3].textContent = `${car.features.fuelTank} L`;
    }
  }
  const specTabs = document.querySelectorAll(".spec-tab");
  const specPanels = document.querySelectorAll(".spec-panel");

  specTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      specTabs.forEach((t) => t.classList.remove("active"));
      specPanels.forEach((p) => p.classList.remove("active"));

      this.classList.add("active");

      const tabId = this.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  const specItems = document.querySelectorAll(".spec-item");

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

  specItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(item);
  });
});
