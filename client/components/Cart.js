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
  const guestCart = props.guestCart[0]
  // const shells = guestCart.shells
  console.log("guestCart:",guestCart)
  
  return (

      <div>
        <p> is this working </p>
     
      </div>

  )
};

const mapState = (state) => {
  return {
    guestCart: state.cart.shells
  }
}

const mapDispatch = (dispatch) => {
  return {

    loadGuestCart: () => dispatch(getShellsInGuestCart())
  }
}
export default connect(mapState, mapDispatch)(Cart)