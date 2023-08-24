import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/categories`);
      setCategories(res?.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  console.log({ categories });
  return (
    <div>
      <h2>Categories</h2>
      {categories.map((el) => (
        <div>{el}</div>
      ))}
    </div>
  );
};

export default Categories;
