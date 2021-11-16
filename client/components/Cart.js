import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getShellsInGuestCart } from "../store/cartReducer";

// NOT FUNCTIONAL YET

const Cart = (props) => {
  // is this in form of integer or object? 
  const [sessionData, setSessionData] = useState({});

  useEffect(() => {
    console.log('props: ', props)
    const guestCart = props.loadGuestCart();
    console.log('guest cart: ', guestCart)

  }, []);

  //create an addShell props to map through
  return (
    <body>
      {/* <img scr={shell.imageUrl} /> */}

      <div>
        <p> is this working </p>
        {/* <p> {shell.name}</p>
          <p> {shell.price}</p>
          <p> {shell.quantity}</p> */}
      </div>
    </body>
  )
};

// const mapState = (state) => {
//   return {
//     shells
//   }
// }

const mapDispatch = (dispatch) => {
  return {

    loadGuestCart: (orderId) => dispatch(getShellsInGuestCart(orderId))
  }
}
export default connect(null, mapDispatch)(Cart)