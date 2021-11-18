import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { connect } from "react-redux";
import {
  getShellsInGuestCart,
  updateCartQuantity,
  removeFromCart,
  markOrderAsComplete
} from "../store/cartReducer";
import { useIsMounted } from "./NonPages/useIsMounted";
import { getShellsInUserCart } from "../store/userCart";
import { createBrowserHistory } from "history";
import history from "../history"
// NOT FUNCTIONAL YET

const Cart = (props) => {
  const userId = useSelector((state) => state.auth.id);
  const guestCart = useSelector((state) => state.cart);
  const userCart = useSelector((state) => state.userCart);

  const dispatch = useDispatch();

  //local state

  const isMounted = useIsMounted();

  useEffect(() => {
    if (userId) {
      dispatch(getShellsInUserCart(userId));
    } else {
      dispatch(getShellsInGuestCart());
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getShellsInUserCart(userId));
    }
  }, [isMounted.current]);

  function updateOrder(shell, category) {
    dispatch(updateCartQuantity(shell, category, userId));
  }

  function checkout(){
   dispatch(markOrderAsComplete(userId))

   history.push("/checkout/order-confirmation")
  }

  function deleteItem(Item) {
    dispatch(removeFromCart(Item, userId));
  }

  console.log("Before:", isMounted.current);
  console.log("userId:", userId);
  const isUser = userId;
  const cartItems = guestCart.order_details || [];
  const _usercartItems = userCart.order_details || [];
  console.log("cartItems", cartItems);
  console.log("guestCart:", guestCart);
  console.log("userCart", userCart);

  return (
    <div>
      {isUser ? (
        <div>
          {_usercartItems.map((Item, Index) => (
            <div key={Index}>
              <ul>
                <li>Quantity: {Item.numberOfItems}</li>
                <li>Name: {Item.shell.name}</li>
                <img width="120" height="100" src={Item.shell.imageUrl} />
                <li>Item Number:{Item.shellId} </li>
                <li>Price:{Item.totalPrice}</li>
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, "increment");
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, "decrement");
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    deleteItem({ ...Item });
                  }}
                >
                  Remove From Cart
                </button>
              </ul>
            </div>
          ))}

          <p> SubTotal: {userCart.subTotal}</p>
          <button onClick={() => {(checkout())}} style={{ width: "100px" }}> Continue to Checkout</button>
        </div>
      ) : (
        <div className="cart">
          {cartItems.map((Item, Index) => (
            <div key={Index}>
              <ul>
                <li>Quantity: {Item.numberOfItems}</li>
                <li>Name: {Item.shell.name}</li>
                <li>Item Number:{Item.shellId} </li>
                <li>Price:{Item.totalPrice}</li>
                <img width="120" height="100" src={Item.shell.imageUrl} />
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, "increment");
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, "decrement");
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    deleteItem({ ...Item });
                  }}
                >
                  Remove From Cart
                </button>
              </ul>
            </div>
          ))}

          <p> SubTotal: {guestCart.subTotal}</p>
    
        </div>
      )}
    </div>
  );
};


export default Cart;
