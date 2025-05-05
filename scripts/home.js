document.addEventListener("DOMContentLoaded", () => {
  // ===== SLIDER =====
  const slider = document.querySelector(".models-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots");
  const cards = document.querySelectorAll(".model-card");

  let currentIndex = 0;
  let cardCount = cards.length;

  // Determine how many cards to show based on screen size
  const getVisibleCards = () => {
    if (window.innerWidth >= 1200) return 3;
    if (window.innerWidth >= 769) return 2;
    return 1;
  };

  let visibleCards = getVisibleCards();

  // Create navigation dots
  const createDots = () => {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const dotCount = Math.ceil(cardCount / visibleCards);

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("div");
      dot.className = `slider-dot ${i === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  };

  // Update dot indicators
  const updateDots = (index) => {
    const dots = document.querySelectorAll(".slider-dot");
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  };

  // Update button states
  const updateButtons = () => {
    const maxIndex = cardCount - visibleCards;
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  // Move slider to current position
  const updateSlider = () => {
    const gap = parseFloat(
      getComputedStyle(slider).gap || getComputedStyle(slider).columnGap || "32"
    );
    const cardWidth = cards[0].offsetWidth + gap;
    const position = -currentIndex * cardWidth;

    slider.style.transform = `translateX(${position}px)`;
    updateDots(Math.floor(currentIndex / visibleCards));
    updateButtons();
  };

  // Navigation functions
  const goToSlide = (index) => {
    currentIndex = index * visibleCards;
    updateSlider();
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      currentIndex -= visibleCards;
      updateSlider();
    }
  };

  const goToNext = () => {
    if (currentIndex < cardCount - visibleCards) {
      currentIndex += visibleCards;
      updateSlider();
    }
  };

  // Handle window resize
  const handleResize = () => {
    const newVisibleCards = getVisibleCards();

    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;
      currentIndex = 0;
      createDots();
      updateSlider();
    }
  };

  // Event listeners
  prevBtn.addEventListener("click", goToPrev);
  nextBtn.addEventListener("click", goToNext);
  window.addEventListener("resize", () => setTimeout(handleResize, 250));

  // Initialize
  createDots();
  updateSlider();
});
