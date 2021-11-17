import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getShellsInGuestCart } from "../store/cartReducer";
import { useIsMounted } from "./NonPages/useIsMounted";

// NOT FUNCTIONAL YET

const Cart = (props) => {
  // is this in form of integer or object? 
  // const [sessionData, setSessionData] = useState({});
  const isMounted = useIsMounted()
  console.log("Before:",isMounted.current)
  useEffect(() => {

    if(isMounted.current){
     props.loadGuestCart();
    }

  }, []);

  //create an addShell props to map through
  const guestCart = props.guestCart
  const cartItems = guestCart.order_details || []
  // const shells = guestCart.shells
  console.log("guestCart:",guestCart)

  
  return (

      <div>
        <h2>Cart</h2>
     
        {cartItems.map((Item, Index) => (
          <div key={Index}>
          <ul>
          <li>Quantity: {Item.numberOfItems}</li>
          <li>Name: {Item.shell.name}</li>
          <img width="120" height="100" src={Item.shell.imageUrl} />
          </ul>
          </div>
        ))}
        <p>SubTotal: {guestCart.subTotal}</p>
      </div>

  )
};

const mapState = (state) => {
  return {
    guestCart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {

    loadGuestCart: () => dispatch(getShellsInGuestCart())
  }
}
export default connect(mapState, mapDispatch)(Cart)