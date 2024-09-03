document.addEventListener("DOMContentLoaded", () => {
  const user_id = sessionStorage.getItem("user_id");
  const loginLogoutToggle = document.querySelector(".login_logout");

  const user = getCurrentUserByUserId(user_id);

  if (user) {
    document.querySelector("#currUser").textContent = user.fullName;
    loginLogoutToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const confirmed = confirm("Are you sure you want to logout?");
      if (confirmed) {
        sessionStorage.removeItem("user_id"); // Remove user ID
        window.location = "../pages/login.html"; // Redirect to login page
      }
    });
  } else {
    document.querySelector("#currUser").textContent = "Guest";
    loginLogoutToggle.addEventListener("click", (e) => {
      window.location = "../pages/login.html";
    });
  }
});
