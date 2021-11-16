import React, { useState, useEffect, useRef } from "react";
import { useIsMounted } from "./NonPages/useIsMounted";
import { fetchSingleShell } from "../store/singleShell";
import { connect } from "react-redux";
import { addShellToGuestCart, findOrCreateUserOrder } from "../store/cartReducer";

import history from "../history";

const SingleShell = (props) => {
  //initial shell state
  const [quantity, setQuantity] = useState(1);

  const isMounted = useIsMounted();

  useEffect(() => {
    console.log("on Mount");

    const id = props.match.params.id;
    props.loadSingleShell(id);
  }, []);

  function decrement() {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function increment() {
    if (quantity < props.singleShell.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  }
  function addToCart(shell, newQuantity) {
    props.addShellToGuestCart(shell, newQuantity);
  }

  function addToUserCart(shell, newQuantity) {
    props.findOrCreateUserOrder(shell, newQuantity, props.userId)
  }

  return (

    <div>
      <h1>{props.singleShell.name}</h1>
      <li>{props.singleShell.marineType}</li>
      <li>{props.singleShell.color}</li>
      <li>{props.singleShell.pattern}</li>
      <li>{props.singleShell.price}</li>
      <img width="150" height="150" src={props.singleShell.imageUrl} />
      quantity:<span>{quantity}</span>
      <button onClick={decrement}>-</button>
      <button style={{ marginLeft: "5px" }} onClick={increment}>
        +
      </button>
      {props.userId ? (<button style={{ marginLeft: "10px" }}
        onClick={() => {
          addToUserCart({ ...props.singleShell }, quantity);
        }}>Add To Cart</button>) : (<button
          style={{ marginLeft: "5px" }}
          onClick={() => {
            addToCart({ ...props.singleShell }, quantity);
          }}
        >
          Add To Cart
        </button>)}

    </div>
  );
};

const mapState = (state) => {
  return {
    singleShell: state.singleShell,
    userId: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleShell: (id) => dispatch(fetchSingleShell(id)),
    addShellToGuestCart: (shell, newQuantity) =>
      dispatch(addShellToGuestCart(shell, newQuantity)),
    findOrCreateUserOrder: (shell, quantity, userId) => dispatch(findOrCreateUserOrder(shell, quantity, userId))
  };
};

export default connect(mapState, mapDispatch)(SingleShell);
