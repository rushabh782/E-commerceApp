// Category.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "./dataUtils";

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      const filteredProducts = productsData.filter(
        (product) => product.categoryId === parseInt(categoryId)
      );
      setProducts(filteredProducts);
    };
    fetchData();
  }, [categoryId]);

  return (
    <div>
      <h1>Category Page - Category {categoryId}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
