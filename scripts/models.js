import { models } from "./models-data.js";

document.addEventListener("DOMContentLoaded", function () {
  const showCarsButtons = document.querySelectorAll(".show-cars");
  const cars = document.querySelectorAll(".extra-image");

  // Add click handlers to all car images
  cars.forEach((car) => {
    const carName = car.querySelector("h2").textContent.trim();
    const carImage = car.querySelector("img");

    // Find the matching car in the models data
    const carData = models.find((model) =>
      model.carName.toLowerCase().includes(carName.toLowerCase())
    );

    console.log(carData);
    

    if (carData) {
      carImage.addEventListener("click", () => {
        window.location.href = `preview.html?carId=${carData.carId}`;
      });
    }
  });

  showCarsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const extraImagesContainer = this.closest(".box").nextElementSibling;
      if (
        extraImagesContainer &&
        extraImagesContainer.classList.contains("extra-images")
      ) {
        const isVisible = extraImagesContainer.classList.contains("visible");

        if (isVisible) {
          extraImagesContainer.classList.remove("visible");
          setTimeout(() => {
            extraImagesContainer.style.display = "none";
          }, 500);
        } else {
          extraImagesContainer.style.display = "flex";
          setTimeout(() => {
            extraImagesContainer.classList.add("visible");
          }, 10);
        }

        const buttonText = this.querySelector("span");
        buttonText.textContent = isVisible ? "Show Cars" : "Hide Cars";
      }
    });
  });
});
