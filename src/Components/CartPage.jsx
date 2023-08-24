import React, { useContext } from "react";
import { CartContext } from "../App";

const CartPage = (props) => {
  const { cartState, dispatch } = useContext(CartContext);
  const AddProductToCart = (productDetail) => {
    dispatch({ type: "ADD_TO_CART", payload: productDetail });
  };

  const decrementProductToCart = (productDetail) => {
    dispatch({ type: "REMOVE_ONE", payload: productDetail });
  };
  const remove = (productDetail) => {
    dispatch({ type: "REMOVE", payload: productDetail });
  };
  return (
    <div>
      <h2>Products Added to Cart</h2>
      {cartState?.length > 0 ? (
        <>
          <div>
            {cartState?.map((el) => (
              <div className="d-flex align-items-center" key={el.id}>
                <div className="p-3">{el.title}</div>
                <div className="p-3">${el.price}</div>
                <div className="p-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => decrementProductToCart(el)}
                  >
                    -
                  </button>
                  <span className="p-3">{el.count}</span>
                  <button
                    className="btn btn-success"
                    onClick={() => AddProductToCart(el)}
                  >
                    +
                  </button>
                </div>
                <div className="p-3">
                  <button className="btn btn-danger" onClick={() => remove(el)}>
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h2>
            Total : $
            {cartState.reduce((prev, el) => el.price * el.count + prev, 0)}
          </h2>
        </>
      ) : (
        <div>No Products Added to Cart!</div>
      )}
    </div>
  );
};

export default CartPage;
