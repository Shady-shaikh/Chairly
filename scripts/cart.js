const tableBody = document.querySelector("#cart-table tbody");

const user_id = sessionStorage.getItem("user_id");
const cartItemsForUser = getCartProductsUserWise(user_id);

if (user_id) {
  cartItemsForUser.forEach((item) => {
    const product = getProductById(item.product_id);
    let html = `
        <tr data-id = ${item.product_id}>
        <td class="product-thumbnail">
            <img src="${product.image}" alt="Image" class="img-fluid">
        </td>
        <td class="product-name">
            <h2 class="h5 text-black">${product.name}</h2>
        </td>
        <td class="product-price">₹ ${product.price}</td>
        <td>
            <div class="input-group mb-3 d-flex align-items-center quantity-container" style="max-width: 120px;">
            <div class="input-group-prepend">
                <button class="btn btn-outline-black decrease" type="button">&minus;</button>
            </div>
            <input type="text" class="form-control text-center quantity-amount" value="${
              item.qty
            }" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
            <div class="input-group-append">
                <button class="btn btn-outline-black increase" type="button">&plus;</button>
            </div>
            </div>

        </td>
        <td class="product-total">₹ ${(product.price * item.qty).toFixed(
          2
        )}</td>
        <td><a href="#" class="btn btn-black btn-sm delete-item">X</a></td>
        </tr>`;
    tableBody.insertAdjacentHTML("afterbegin", html);
  });
}
if (cartItemsForUser.length === 0 || !user_id) {
  let html = `
    <tr>
      <td colspan="10">No items</td>
    </tr>
  `;
  tableBody.insertAdjacentHTML("afterbegin", html);
}

const updateCartTotal = () => {
  let total = 0;
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const qtyElement = row.querySelector(".quantity-amount");
    const priceElement = row.querySelector(".product-price");

    if (qtyElement && priceElement) {
      const qty = parseInt(qtyElement.value) || 0;
      const price =
        parseFloat(priceElement.textContent.replace("₹", "").trim()) || 0;
      total += qty * price;
    }
  });
  document.querySelector("#subtotal").textContent = `₹ ${total.toFixed(2)}`;
  let gst = (total * 18) / 100;
  let grossTotal = total + gst;
  document.querySelector("#tax-total").textContent = `₹ ${gst.toFixed(2)}`;
  document.querySelector("#gross-total").textContent = `₹ ${grossTotal.toFixed(
    2
  )}`;
};

tableBody.addEventListener("click", (e) => {
  const target = e.target;
  const row = target.closest("tr");
  const qtyInput = row.querySelector(".quantity-amount");
  const productTotal = row.querySelector(".product-total");
  const productId = row.dataset.id;

  if (target.classList.contains("increase")) {
    let qty = parseInt(qtyInput.value);
    let totalAmt =
      parseFloat(productTotal.textContent.replace("₹", "").trim()) +
      getProductById(productId).price;
    qty++;
    qtyInput.value = qty;
    updateProductQty(productId, qty, user_id);
    productTotal.textContent = `₹ ${totalAmt.toFixed(2)}`;
  }

  if (target.classList.contains("decrease")) {
    let qty = parseInt(qtyInput.value);
    let totalAmt =
      parseFloat(productTotal.textContent.replace("₹", "").trim()) -
      getProductById(productId).price;
    if (qty > 1) {
      qty--;
      qtyInput.value = qty;
      updateProductQty(productId, qty, user_id);

      productTotal.textContent = `₹ ${totalAmt.toFixed(2)}`;
    }
  }

  updateCartTotal();
});

if (user_id) {
  updateCartTotal();
}

tableBody.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete-item")) {
    e.preventDefault();
    const row = target.closest("tr");
    const productId = row.dataset.id;
    removeProductFromCart(productId, user_id);
    row.remove();
    updateCartTotal();
  }
});

function updateProductQty(productId, qty, user_id) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cartItems.map((item) => {
    if (item.product_id === productId && item.user_id === user_id) {
      return { ...item, qty };
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
}

function removeProductFromCart(productId, user_id) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cartItems.filter(
    (item) => !(item.product_id === productId && item.user_id === user_id)
  );
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  showToast("Item removed from cart", "info");
}
