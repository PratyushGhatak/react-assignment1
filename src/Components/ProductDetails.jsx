import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";
const ProductDetails = (props) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const getProductDetails = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetail(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [id]);
  const AddProductToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: productDetail });
  };
  const { cartState, dispatch } = useContext(CartContext);
  return (
    <div>
      <h2>ProductDetails</h2>
      <div className="d-flex">
        <div className="col-6">{<img src={productDetail?.images?.[0]} />}</div>
        <div className="col-6">
          <h4>{productDetail?.title}</h4>
          <p>{productDetail?.description}</p>
          <h6>Price : ${productDetail?.price}</h6>
          <button
            className="btn btn-primary"
            onClick={AddProductToCart}
          >{`Add To Cart`}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
