import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Categories from "./Components/Categories";
import ProductDetails from "./Components/ProductDetails";
import { createContext, useReducer } from "react";
import { useState } from "react";
import CartPage from "./Components/CartPage";
export const CartContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let tempState = [...state];
      //check if product already exists,
      const findIndex = tempState.findIndex((el) => el.id == action.payload.id);
      //if found
      if (findIndex > -1) {
        let foundProd = {
          ...tempState[findIndex],
          count: tempState[findIndex].count + 1,
        };
        tempState[findIndex] = foundProd;
      } else {
        tempState.push({ ...action.payload, count: 1 });
      }
      return tempState;
    }
    case "REMOVE_ONE": {
      let tempState = [...state];

      const findIndex = tempState.findIndex((el) => el.id == action.payload.id);

      let foundProd = { ...tempState[findIndex] };
      // if count more than 1
      if (foundProd.count > 1) {
        foundProd.count = foundProd.count - 1;
        tempState[findIndex] = foundProd;
      } else {
        tempState = tempState.filter((el) => el.id != action.payload.id);
      }
      return tempState;
    }
    case "REMOVE": {
      let tempState = [...state];

      tempState = tempState.filter((el) => el.id != action.payload.id);
      return tempState;
    }
    default:
      return state;
  }
};

function App() {
  // const [cartState, setCartState] = useState([]);

  const [cartState, dispatch] = useReducer(reducer, []);
  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      <Router>
        <div className="App">
          <nav className="d-flex justify-content-around">
            <Link to={"/home"}>Home</Link>
            <Link to={"/products"}>Products</Link>
            {/* <Link to={"/products/:id"} >Product</Link> */}
            <Link to={"/categories"}>Categories</Link>
            <Link to={"/cart"}>Go To Cart</Link>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetails />
            </Route>

            <Route exact path="/categories">
              <Categories />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
