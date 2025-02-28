import toast from "react-hot-toast";

/**
 * Adds a product to the cart. If the product already exists, increments its quantity.
 * @param product - The product object to add to the cart.
 */
export const AddToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item already exists in the cart
  const existingItem = cart.find(cartItem => cartItem._id === item._id);

  if (existingItem) {
    // If item exists, update the quantity
    existingItem.quantity += 1;
  } else {
    // If item doesn't exist, add it with quantity 1
    cart.push({ ...item, quantity: 1 });
  }

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Optionally, return the updated cart if needed
  toast.success("Ride added to cart");
  return cart;
};


/**
 * Removes a product from the cart.
 * @param product - The product object to remove from the cart.
 */
export const RemoveFromCart = (product) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const updatedCart = cart.filter((item) => item.id !== product.id);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success("Product removed from cart");
};

/**
 * Clears the entire cart.
 */
export const ClearCart = () => {
  localStorage.removeItem("cart");
  // toast.success("Cart cleared");
};

/**
 * Retrieves the current cart as an array of products.
 * @returns An array of products currently in the cart.
 */
export const GetCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

/**
 * Retrieves the total price of an item in the cart.
 * @param item - The item object to calculate the total price for.
 * @returns The total price of the item.
 */
export const GetItemTotal = (item) => {
  return item.price * item.quantity;
};

/**
 * Retrieves the total price of all items in the cart.
 * @returns The total price of all items in the cart.
 */
export const GetCartTotal = () => {
  const cart = GetCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Increments the quantity of a product in the cart.
 * @param product - The product object to increment the quantity of.
 */
export const incrementCartItemQuantity = (product) => {
  const cart = GetCart();
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

/**
 * Decrements the quantity of a product in the cart.
 * @param product - The product object to decrement the quantity of.
 */
export const decrementCartItemQuantity = (product) => {
  const cart = GetCart();
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};

/**
 * Checks if an item is in the cart.
 * @param id - The ID of the product to check.
 * @returns True if the product is in the cart, otherwise false.
 */
export const IsItemInCart = (id) => {
  const cart = GetCart(); // Retrieve the current cart
  return cart.some((item) => item.id === id); // Check if the product ID exists in the cart
};
