const getCurrentUserByUserId = (id) => {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = users.find((row) => row.id === parseInt(id));
  return user ?? [];
};

const getLimitedProducts = (limit) => {
  return productsJson ? productsJson.slice(0, limit) : [];
};

const getProductById = (id) => {
  const product = productsJson.find((row) => row.id === parseInt(id));
  return product ?? [];
};

const getCartProductsUserWise = (user_id) => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if(cart){
    cart = cart.filter((item) => item.user_id === user_id)
  }
  return cart ?? false;
};
