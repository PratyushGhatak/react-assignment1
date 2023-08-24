import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products?limi=100`);
      setProducts(res?.data?.products ?? []);
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="d-flex flex-column">
      <h2>Products</h2>
      {products.map((el) => (
        <Link to={`/products/${el.id}`}>{el?.title}</Link>
      ))}
    </div>
  );
};

export default Products;
