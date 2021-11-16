import React, { useState, useEffect, useRef } from "react";
import { useIsMounted } from "./NonPages/useIsMounted";
import { fetchSingleShell } from "../store/singleShell";
import { connect } from "react-redux";
import { addShell } from "../store/cartReducer";


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
    props.addShell(shell, newQuantity);
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
      <button
        style={{ marginLeft: "5px" }}
        onClick={() => {
          addToCart({ ...props.singleShell }, quantity);
        }}
      >
        Add To Cart
      </button>
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
    addShell: (shell, newQuantity) =>
      dispatch(addShell(shell, newQuantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleShell);
