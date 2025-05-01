const container = document.querySelector(".container");
const loginlink = document.querySelector(".signinlink");
const registerlink = document.querySelector(".signUplink");

registerlink.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("active");
});

loginlink.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("active");
});
