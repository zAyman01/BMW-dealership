const container = document.querySelector(".container");
const loginlink= document.querySelector(".signinlink");
const registerlink = document.querySelector(".signUplink");
registerlink.addEventListener("click", () => {
    container.classList.add("active");
})