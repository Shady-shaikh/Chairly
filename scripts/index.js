const products = getLimitedProducts(3);
const product_section = document.querySelector(".product-section");

products.forEach((e) => {
  let productCard = `
        <div class="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
        <a class="product-item" href="#" data-id="${e.id}">
            <img
            src="${e.image}"
            class="img-fluid product-thumbnail"
            />
            <h3 class="product-title">${e.name}</h3>
            <p class="product-desc">${e.desc}</p>
            <strong class="product-price">₹ ${e.price}</strong>

            <span class="icon-cross">
            <img src="../assets/images/cross.svg" class="img-fluid" />
            </span>
        </a>
        </div>
    `;
  product_section
    .querySelector(".row")
    .insertAdjacentHTML("beforeend", productCard);
});
document.querySelectorAll(".product-item").forEach((product) => {
  product.addEventListener("click", (e) => {
    e.preventDefault();


    const user_id = sessionStorage.getItem("user_id");
    if(!user_id){
      window.location = '../pages/login.html';
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartIndex = cart.findIndex(
      (item) =>
        item.user_id === user_id && item.product_id == product.dataset.id
    );

    if (cartIndex !== -1) {
      cart[cartIndex].qty += 1;
    } else {
      const cart_id =
        cart.length > 0 ? Math.max(...cart.map((item) => item.id)) + 1 : 1;

      const cartData = {
        id: cart_id,
        user_id: user_id,
        product_id: product.dataset.id,
        qty: 1,
      };
      cart.push(cartData);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast('Cart updated successfully','success');
  });
});
