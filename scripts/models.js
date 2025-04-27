document.addEventListener("DOMContentLoaded", function () {
  const showCarsButtons = document.querySelectorAll(".show-cars");
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
