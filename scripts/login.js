const container = document.getElementById("container");
const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

const registerForm = document.querySelector(".sign-up form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document
    .querySelector(".sign-up input[type='text']")
    .value.trim();
  const email = document
    .querySelector(".sign-up input[type='email']")
    .value.trim();
  const pass = document
    .querySelector(".sign-up input[type='password']")
    .value.trim();

  if (fullName && email && pass) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some((user) => user.email === email);

    if (userExists) {
      showToast("User already exist", "error", 3000);
      return;
    }

    const user = {
      id: users.length + 1,
      fullName: fullName,
      email: email,
      password: window.btoa(pass),
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Than you for registration", "success", 3000);
    registerForm.reset();
  } else {
    showToast("Need to fill all fields", "error", 3000);
    return false;
  }
});

const loginForm = document.querySelector(".sign-in form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document
    .querySelector(".sign-in input[type='email']")
    .value.trim();
  const pass = document
    .querySelector(".sign-in input[type='password']")
    .value.trim();

  if (email && pass) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.find((user) => user.email === email);
    if (!userExists) {
      showToast("No user found with this email", "error", 3000);
      return;
    }
    let plainPass = window.atob(userExists.password);

    if (plainPass !== pass) {
      showToast("Password incorrect", "error", 3000);
      return;
    }

    sessionStorage.setItem("user_id", userExists.id);
    window.location = '../pages/index.html';
  }
});
