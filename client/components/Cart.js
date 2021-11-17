import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { getShellsInGuestCart, updateCartQuantity } from "../store/cartReducer";
import { useIsMounted } from "./NonPages/useIsMounted";
import { getShellsInUserCart } from "../store/userCart";
import { createBrowserHistory } from "history";

// NOT FUNCTIONAL YET

const Cart = (props) => {
  const userId = useSelector((state) => state.auth.id);
  const guestCart = useSelector((state) => state.cart);
  const userCart = useSelector((state) => state.userCart);

  const dispatch = useDispatch();

  //local state
  const [quantity, setQuantity] = useState(0);

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
                    updateOrder({ ...Item }, 'increment');
                  }}
                >
                  +1
                </button>
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, 'decrement');
                  }}
                >
                  -1
                </button>
              </ul>
            </div>
          ))}

          <p> SubTotal: {userCart.subTotal}</p>
          <button style={{ width: "100px" }}> Continue to Checkout</button>
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
                    updateOrder({ ...Item }, 'increment');
                  }}
                >
                  +1
                </button>
                <button
                  onClick={() => {
                    updateOrder({ ...Item }, 'decrement');
                  }}
                >
                  -1
                </button>
              </ul>
            </div>
          ))}

          <p> SubTotal: {guestCart.subTotal}</p>
          <button style={{ width: "100px" }}> Continue to Checkout</button>
        </div>
      )}
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     guestCart: state.cart,
//     userCart: state.userCart,
//     isUser:state.auth.id
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadGuestCart: () => dispatch(getShellsInGuestCart()),
//     loadUserCart: (id) => dispatch(getShellsInUserCart(id))
//   };
// };
// export default connect(mapState, mapDispatch)(Cart);

export default Cart;
