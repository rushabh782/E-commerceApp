// dataUtils.js

export const fetchCategories = async () => {
  const response = await fetch("/categories.json");
  const data = await response.json();
  return data;
};

export const fetchProducts = async () => {
  const response = await fetch("/products.json");
  const data = await response.json();
  return data;
};
