// const placeOrderBtn = document.querySelector(".place_order");
// placeOrderBtn.addEventListener("click", () => {
//   window.location = "../pages/loader.html";
// });

const billingForm = document.querySelector("#billing_form");

const checkForValidation = (field) => {
  let errorHtml = `<span class="text-danger req_error">This field is required</span>`;

  const fieldValue = field.value.trim();
  const formGroup = field.closest(".form-group");
  const errorElem = formGroup.querySelector(".req_error");
  if (fieldValue !== "") {
    if (errorElem) {
      errorElem.remove();
    }
  } else {
    if (!errorElem) {
      formGroup.insertAdjacentHTML("beforeend", errorHtml);
    }
  }
};

let billingFields = document.querySelectorAll(
  "#c_country, #c_fname, #c_address, #c_state_country, #c_postal_zip, #c_phone"
);
let shippingFields = document.querySelectorAll(
  "#c_diff_country, #c_diff_fname, #c_diff_address, #c_diff_state_country, #c_diff_postal_zip, #c_diff_phone"
);

const isDifferentAddress = document.querySelector("#c_ship_different_address");
isDifferentAddress.addEventListener("click", (e) => {
  const value = e.target.checked ? 1 : 0;
  if (value) {
    billingFields.forEach((field) => {
      checkForValidation(field);
    });
    shippingFields.forEach((field) => {
      checkForValidation(field);
    });
  } else {
    billingFields.forEach((field) => {
      checkForValidation(field);
    });
  }
});

billingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isDifferentAddress.checked) {
    billingFields.forEach((field) => {
      checkForValidation(field);
    });
    shippingFields.forEach((field) => {
      checkForValidation(field);
    });
  } else {
    billingFields.forEach((field) => {
      checkForValidation(field);
    });
  }
});

billingFields.forEach((field) => {
  field.addEventListener("change", () => {
    checkForValidation(field);
  });
});

shippingFields.forEach((field) => {
  field.addEventListener("change", () => {
    checkForValidation(field);
  });
});
