document.addEventListener("DOMContentLoaded", function () {
  const modelSelect = document.getElementById("model-select");
  const yearSelect = document.getElementById("year-select");
  const partsContainer = document.getElementById("parts-container");
  const partCards = partsContainer.querySelectorAll(".part-card");
  const cartCount = document.getElementById("cartCount");
  const cartBtn = document.getElementById("cartBtn");
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const noItemsDiv = document.querySelector(".no-items");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let count = cartItems.length;
  cartCount.textContent = count;

  // Cart popup
  const cartPopup = document.getElementById("cartPopup");
  updateCartPopup();

  // // Toast
  // function showToast(message, type = "success") {
  //   const toast = document.getElementById("toast");
  //   toast.textContent = message;
  //   toast.className = "toast show";
  //   if (type === "error") toast.classList.add("error");

  //   setTimeout(() => {
  //     toast.className = "toast";
  //   }, 2000);
  // }

  // Add to cart
  addToCartButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const partCard = btn.closest(".part-card");
      const productName = partCard.querySelector("h3").textContent;
      const productImg = partCard.querySelector(".main-img").src;
      const productPrice = parseFloat(
        partCard.querySelector(".part-price").textContent.replace("$", "")
      );

      cartItems.push({
        name: productName,
        image: productImg,
        price: productPrice,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      count++;
      cartCount.textContent = count;
      updateCartPopup();

      // showToast(`${productName} added to cart!`, "success");
    });
  });

  // Show/Hide cart
  cartBtn.addEventListener("click", () => {
    cartPopup.style.display =
      cartPopup.style.display === "none" ? "block" : "none";
  });

  // Update cart content
  function updateCartPopup() {
    cartPopup.innerHTML = "<h3>Your Cart</h3>";

    if (cartItems.length > 0) {
      const list = document.createElement("ul");
      let total = 0;

      cartItems.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.gap = "10px";
        li.style.alignItems = "center";

        const img = document.createElement("img");
        img.src = item.image;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "5px";

        const info = document.createElement("div");
        info.style.flex = "1";
        info.innerHTML = `
        <strong>${item.name}</strong><br>
        <small>$${item.price.toFixed(2)}</small>
      `;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖";
        removeBtn.addEventListener("click", () => {
          cartItems.splice(index, 1);
          count--;
          cartCount.textContent = count;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          updateCartPopup();
          // showToast(`${item.name} removed from cart`, "error");
        });

        li.appendChild(img);
        li.appendChild(info);
        li.appendChild(removeBtn);
        list.appendChild(li);
      });

      cartPopup.appendChild(list);

      // Total price
      const totalDisplay = document.createElement("div");
      totalDisplay.style.marginTop = "10px";
      totalDisplay.style.fontWeight = "bold";
      totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
      cartPopup.appendChild(totalDisplay);

      // Clear Cart button
      const clearBtn = document.createElement("button");
      clearBtn.textContent = "Clear Cart";
      clearBtn.classList.add("clear-cart");
      clearBtn.addEventListener("click", () => {
        cartItems.length = 0;
        count = 0;
        cartCount.textContent = count;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        updateCartPopup();
        // showToast("Cart cleared", "error");
      });
      cartPopup.appendChild(clearBtn);
    } else {
      cartPopup.innerHTML += "<p>Your cart is empty!</p>";
    }
  }

  // Search functionality
  function searchParts() {
    const query = searchInput.value.trim().toLowerCase();
    const parts = document.querySelectorAll(".part-card");
    let anyVisible = false;

    parts.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (!query || name.includes(query)) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    noItemsDiv.style.display = anyVisible ? "none" : "flex";
  }

  // Event listeners
  searchBtn.addEventListener("click", searchParts);
  searchInput.addEventListener("input", searchParts);
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchParts();
  });
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      searchParts();
    }
  });

  /**
   * Filters parts based on selected model and year
   */
  function filterParts() {
    const selectedModel = modelSelect.value.toLowerCase();
    const selectedYear = yearSelect.value;
    let anyVisible = false;

    // Loop through all part cards
    partCards.forEach((card) => {
      const modelText = card
        .querySelector(".part-model")
        .textContent.toLowerCase();

      // Check model match (if a model is selected)
      const modelMatch =
        !selectedModel || modelText.includes(selectedModel.replace("-", " "));

      // Check year match (if a year is selected)
      let yearMatch = !selectedYear;
      if (selectedYear) {
        const yearRange = modelText.match(/\((\d{4}-\d{4})\)/);
        if (yearRange) {
          const [startYear, endYear] = yearRange[1].split("-").map(Number);
          const [filterStart, filterEnd] = selectedYear.split("-").map(Number);

          // Check if the year ranges overlap
          yearMatch = startYear <= filterEnd && endYear >= filterStart;
        }
      }

      // Show/hide card based on filter matches
      if (modelMatch && yearMatch) {
        card.style.display = "block";
        anyVisible = true;
      } else {
        card.style.display = "none";
      }
    });

    noItemsDiv.style.display = anyVisible ? "none" : "flex";
  }

  // Add event listeners for filter changes
  modelSelect.addEventListener("change", filterParts);
  yearSelect.addEventListener("change", filterParts);

  // Apply initial filter when page loads
  filterParts();
});
