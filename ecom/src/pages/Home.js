import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "./dataUtils";
import "./Home.css"; // Import CSS file for styling

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Welcome to our E-commerce Store</h1>
      <div className="categories-container">
        <h2>Explore Categories</h2>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="checkout-link">
        <Link to="/checkout" className="checkout-btn">
          Go to Checkout
        </Link>
      </div>
      {/* Button to navigate to the Category page */}
      <div className="category-link">
        <Link to="/category" className="category-btn">
          Explore All Categories
        </Link>
      </div>
    </div>
  );
};

export default Home;
