import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getShellsInGuestCart } from "../store/cartReducer";

// NOT FUNCTIONAL YET

const Cart = (props) => {
  // is this in form of integer or object? 
  const [sessionData, setSessionData] = useState({});

  function getCookie(key, value) {
    const cookie = localStorage.getItem(key) // will give us order details
    // console.log('cookie', localStorage.getItem('orderNumber'))
    return JSON.parse(cookie);
  }

  // replaces componentDidMount
  useEffect(() => {
    const orderId = getCookie("orderNumber");
    console.log(orderId)
    // console.log('order id: ', orderId)
    props.loadGuestCart(orderId);
    // setSessionData()

    // call reducer from dispatch to pass order number from cookie
    // 
  });

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