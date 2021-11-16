import axios from "axios";

// Action Types
const ADD_SHELL_TO_CART = "ADD_SHELL_TO_CART";
const ADD_SHELL = "ADD_SHELL";
const MINUS_SHELL = "MINUS_SHELL";
const REMOVE_SHELL = "REMOVE_SHELL";
const SET_ORDER_COOKIE = "SET_ORDER_COOKIE";
const GET_ALL_SHELLS_IN_CART = "GET_ALL_SHELLS_IN_CART";

// Action Creators
export const addShellToCart = (shell) => {
  return {
    type: "ADD_SHELL_TO_CART",
    shell,
  };
};
export const minusShellQuantity = (id) => {
  return {
    type: "MINUS_SHELL",
    id,
  };
};

export const _removeShell = (id) => {
  return {
    type: "REMOVE_SHELL",
    id,
  };
};

export const _getShellsInGuestCart = (orderId) => {
  return {
    type: "GET_ALL_SHELLS_IN_GUEST_CART",
    orderId,
  }
}

// Thunk Action Creators
export const addShell = (shell, newQuantity) => {
  return async (dispatch) => {
    try {
      const productInfo = {
        ...shell,
        newQuantity
      };
      const res = await axios.post("/api/orders/", productInfo);
      //do we need to check if the order id already exists?
      //also make a hashed order id
      //is this a put route to update a cart or a post route ? since the user starts out with 0 items
      //magic method like addShell in the api for the

      dispatch(addShellToCart(res));
    } catch (e) {
      console.log(e);
    }
  };
};

export const minusShell = (id) => {
  try {
    return async (dispatch) => {
      const minus = await axios.put(`/api/orderShells/${id}`);
      //magic method that minus price and quantity to the quantity section
      dispatch(minusShellFromCart(minus));
    };
  } catch (e) {
    console.log(e);
  }
};

export const removeShell = (id) => {
  //remove all instances of this shell from entire cart
  try {
    return async (dispatch) => {
      const remove = await axios.delete(`/api/orderShells/${id}`);
      //magic method that adds price to the quantity section
      dispatch(_removeShell(remove));
    };
  } catch (e) {
    console.log(e);
  }
};
// * Every time an item is added to the cart we need to update local state with their cart details
// const cookie = sessionStorage.getItem('orderNumber')) will give us order details
export const getShellsInGuestCart = (orderId) => {
  // get shells in guest cart
  try {
    return async (dispatch) => {
      const guestCart = await axios.get(`/api/orders/${orderId}`);
      dispatch(_getShellsInGuestCart(guestCart));
      console.log(guestCart)
    };
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  shells: [],
  total: 0,
  totalQuantity: 0, //shells represents our cart, and each item needs to be in an object with its own quantity, price
};

export default function cartReducer(shells = [], action) {
  switch (action.type) {
    case ADD_SHELL_TO_CART:
      return [...shells, action.id]; //return each shell as an object if it isn't already added, with a price and quantity property
    case MINUS_SHELL:
      return; //maps through the shells array and matches the action.id and decrements the quantity and price
    case REMOVE_SHELL:
      return; //destroy the shell
    case GET_ALL_SHELLS_IN_CART:
      return action.orderId;
    default:
      return state;
  }
}