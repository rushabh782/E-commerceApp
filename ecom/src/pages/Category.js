import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "./dataUtils";

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(
        productsData.filter(
          (product) => product.categoryId === parseInt(categoryId)
        )
      );
    };
    fetchData();
  }, [categoryId]);

  useEffect(() => {
    // Fetch cart items from local storage or context
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (productId) => {
    const existingItem = cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = { productId, quantity: 1 };
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleDeliveryFilter = () => {
    setDeliveryOnly(!deliveryOnly);
  };

  const filteredProducts = deliveryOnly
    ? products.filter((product) => product.delivery)
    : products;

  return (
    <div>
      <h1>Category Page - Category {categoryId}</h1>
      <label>
        <input
          type="checkbox"
          checked={deliveryOnly}
          onChange={toggleDeliveryFilter}
        />
        Delivery Only
      </label>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            <button onClick={() => removeFromCart(product.id)}>
              Remove from Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
