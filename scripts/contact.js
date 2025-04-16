const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const nameContainer = document.getElementById("name-container");
const emailContainer = document.getElementById("email-container");
const phoneContainer = document.getElementById("phone-container");
const messageContainer = document.getElementById("message-container");
const submitButton = document.getElementById("contact-form-button");

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const EGYPTIAN_PHONE_REGEX = /^01[0-2,5]{1}[0-9]{8}$/;

const ERROR_BORDER = "1px solid #e12a26";
const NORMAL_BORDER = "1px solid #e0e0e0";
const SUCCESS_BORDER = "1px solid #4CAF50";

function showError(container, input, message) {
  clearError(container);

  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;

  container.appendChild(errorMessage);
  input.style.border = ERROR_BORDER;
}

function clearError(container) {
  const existingError = container.querySelector(".error-message");
  if (existingError) {
    container.removeChild(existingError);
  }
}

function showSuccess(input) {
  input.style.border = SUCCESS_BORDER;
}

function resetInput(input) {
  input.style.border = NORMAL_BORDER;
}

function validateForm() {
  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === "") {
    showError(nameContainer, nameInput, "Name is required");
    isValid = false;
  } else if (nameInput.value.trim().length < 3) {
    showError(nameContainer, nameInput, "Name must be at least 3 characters");
    isValid = false;
  } else {
    showSuccess(nameInput);
  }

  // Validate email
  if (emailInput.value.trim() === "") {
    showError(emailContainer, emailInput, "Email is required");
    isValid = false;
  } else if (!EMAIL_REGEX.test(emailInput.value.trim())) {
    showError(emailContainer, emailInput, "Please enter a valid email address");
    isValid = false;
  } else {
    showSuccess(emailInput);
  }

  // Validate phone
  if (phoneInput.value.trim() === "") {
    showError(phoneContainer, phoneInput, "Phone number is required");
    isValid = false;
  } else if (!EGYPTIAN_PHONE_REGEX.test(phoneInput.value.trim())) {
    showError(
      phoneContainer,
      phoneInput,
      "Please enter a valid Egyptian phone number"
    );
    isValid = false;
  } else {
    showSuccess(phoneInput);
  }

  // Validate message
  if (messageInput.value.trim() === "") {
    showError(messageContainer, messageInput, "Message is required");
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    showError(
      messageContainer,
      messageInput,
      "Message must be at least 10 characters"
    );
    isValid = false;
  } else {
    showSuccess(messageInput);
  }

  return isValid;
}

nameInput.addEventListener("input", () => {
  clearError(nameContainer);
  resetInput(nameInput);
});

emailInput.addEventListener("input", () => {
  clearError(emailContainer);
  resetInput(emailInput);
});

phoneInput.addEventListener("input", () => {
  clearError(phoneContainer);
  resetInput(phoneInput);
});

messageInput.addEventListener("input", () => {
  clearError(messageContainer);
  resetInput(messageInput);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.style.opacity = "0.7";
  submitButton.textContent = "Sending...";

  if (validateForm()) {
    setTimeout(() => {
      const successMessage = document.createElement("div");
      successMessage.classList.add("success-message");
      successMessage.innerHTML = `
        <div style="padding: 20px; background-color: #4CAF50; color: white; margin-top: 20px; border-radius: 4px; text-align: center;">
          <p style="margin: 0; font-size: 16px;">Thank you for your message! We'll get back to you soon.</p>
        </div>
      `;

      form.appendChild(successMessage);
      form.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(resetInput);

      submitButton.disabled = false;
      submitButton.style.opacity = "1";
      submitButton.textContent = "Send";

      setTimeout(() => {
        form.removeChild(successMessage);
      }, 5000);
    }, 1500);
  } else {
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
    submitButton.textContent = "Send";
  }
});
