import React, { useState, useEffect } from "react";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (productId) => {
    // Filter out the item with the specified productId
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    // Update the cart state and local storage
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    // Find the item with the specified productId
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId) {
        // Increase the quantity of the item
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    // Update the cart state and local storage
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId) => {
    // Find the item with the specified productId
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId && item.quantity > 1) {
        // Decrease the quantity of the item if it's greater than 1
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    // Update the cart state and local storage
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => removeFromCart(item.productId)}>
              Remove
            </button>
            <button onClick={() => increaseQuantity(item.productId)}>+</button>
            <button onClick={() => decreaseQuantity(item.productId)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
