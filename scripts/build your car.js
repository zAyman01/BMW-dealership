const viewer = document.getElementById("car-viewer");
const colorSelector = document.getElementById("car-color");

colorSelector.addEventListener("change", () => {
  const selectedModel = colorSelector.value;
  viewer.src = `assets/Spec/${selectedModel}`;
});
