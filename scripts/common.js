const showToast = (msg, type = "info", duration = 3000) => {
  let container = document.getElementById("toast_container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast_container";
    container.className = "toast_container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const message = document.createElement("span");
  message.textContent = msg;
  toast.appendChild(message);

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      container.removeChild(toast);
    }, 300);
  }, duration);
};
