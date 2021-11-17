import axios from 'axios'
const ADD_SHELL_TO_USER_CART = "ADD_SHELL_TO_USER_CART";

const SET_USER_CART = "SET_USER_CART"


export const addShellToUserCart = (shell) => {
    return {
  
      type: "ADD_SHELL_TO_USER_CART",
      shell,
    };
  };
export const setUserCart = (order) => {
    return {
        type: SET_USER_CART,
        order
    }
}
  export const findOrCreateUserOrder = (shell, newQuantity, userId) => {

    return async (dispatch) => {
      try {
        let productInfo = {
          ...shell,
          newQuantity,
          userId,
        };
        const res = await axios.post("/api/orders/userCart", productInfo);
        // dispatch(getShellsInUserCart());
      } catch (e) {
        console.log(e);
      }
    };
  };
  export const getShellsInUserCart = (userId) => {

    try {
      return async (dispatch) => {
        const { data: userCart } = await axios.get(`/api/orders/${userId}`,);
        dispatch(setUserCart(userCart));
        console.log('user cart from route: ', userCart)
      };
    } catch (e) {
      console.log(e);
    }
  };
  


const initialState = {}

export default function userCartReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_CART:
        return action.order
      default:
        return state;
    }
  }
  