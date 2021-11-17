import axios from "axios";

const SET_GUEST_CART = "SET_GUEST_CART";
const ADD_SHELL = "ADD_SHELL";
const MINUS_SHELL = "MINUS_SHELL";
const REMOVE_SHELL = "REMOVE_SHELL";

const SET_COMPLETE_ORDER = "SET_COMPLETE_ORDER";


export const setGuestCart = (order) => {
  return {
    type: "SET_GUEST_CART",
    order,
  };
};


export const setCompleteOrder = (order) => {
  return {
    type: SET_COMPLETE_ORDER,
    order,
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

export const addShellToGuestCart = (shell, newQuantity) => {
  return async (dispatch) => {
    try {
      const productInfo = {
        ...shell,
        newQuantity,
      };
      const res = await axios.post("/api/orders/", productInfo);
      dispatch(getShellsInGuestCart())
      //do we need to check if the order id already exists?
      //also make a hashed order id
      //is this a put route to update a cart or a post route ? since the user starts out with 0 items
      //magic method like addShell in the api for the
    } catch (e) {
      console.log(e);
    }
  };
};



export const markOrderAsComplete = (orderId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/orders/confirmed/${orderId}`);
      dispatch(setCompleteOrder(res));
    } catch (e) {
      console.log(e);
    }
  };
};

export const minusShell = (id) => {
  try {
    return async (dispatch) => {
      const minus = axios.put(`/api/orderShells/${id}`);
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
      const remove = axios.delete(`/api/orderShells/${id}`);
      //magic method that adds price to the quantity section
      dispatch(_removeShell(remove));
    };
  } catch (e) {
    console.log(e);
  }
};

// const cookie = sessionStorage.getItem('orderNumber')) will give us order details
export const getShellsInGuestCart = (orderId) => {
  // get shells in guest cart
  try {
    return async (dispatch) => {
      const { data: guestCart } = await axios.get(`/api/orders/guestCart`);
      dispatch(setGuestCart(guestCart));
      console.log('guest cart from route: ', guestCart)
    };
  } catch (e) {
    console.log(e);
  }
};

const initialState = {

};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_CART:
      return action.order
    case MINUS_SHELL:
      return; //maps through the shells array and matches the action.id and decrements the quantity and price
    case REMOVE_SHELL:
      return; //destroy the shell
    default:
      return state;
  }
}
