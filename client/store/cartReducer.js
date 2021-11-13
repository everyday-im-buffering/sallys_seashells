import axios from "axios";


const ADD_SHELL_TO_CART = 'ADD_SHELL_TO_CART'
const ADD_SHELL = 'ADD_SHELL'
const MINUS_SHELL = 'MINUS_SHELL'
const REMOVE_SHELL = 'REMOVE_SHELL'

//inital state is set as localestorage state.


//setting the shell
//findorcreate -> check orders for existing order
 // if
export const addShellToCart = (shell) => {
  return {
    type: 'ADD_SHELL_TO_CART',
    shell
  }
}

// export const addShell = (id) => {
//   return {
//     type: 'ADD_SHELL',
//     id
//   }
// }





//decrement
export const minusShellQuantity = (id) => {
  return {
    type: 'MINUS_SHELL',
    id
  }
}

export const removeShell = (id) => {
  return {
    type: 'REMOVE_SHELL',
    id
  }
}

export const fetchShell = (orderId,userId) => {
  return async (dispatch) => {
    try {
      const added = axios.put(`/api/orders/${orderId}/${userId}`)
      //do we need to check if the order id already exists?
      //also make a hashed order id 
      //is this a put route to update a cart or a post route ? since the user starts out with 0 items
      //magic method like addShell in the api for the
      dispatch(addShellToCart(added))
    } catch (e) {
      console.log(e)
    }
  }
}

export const minusShell = (id) => {
  try {
    return async (dispatch) => {
      const minus = axios.put(`/api/orderShells/${id}`)
      //magic method that minus price and quantity to the quantity section

      dispatch(minusShell(minus))
    }
  } catch (e) {
    console.log(e)
  }
}

// export const removeShell = (id) => {
//   try {
//     return async (dispatch) => {
//       const remove = axios.delete(`/api/orderShells/${id}`)
//       //magic method that adds price to the quantity section

//       dispatch(removeShell(remove))
//     }
//   } catch (e) {
//     console.log(e)
//   }
// }

//we need to grab our state from our orderDetails model

//do we need to query order_shells to grab order_id and shell_id to find a specific shells quantitiy

const initialState = {
  shells: [],
  total: 0,
  totalQuantity: 0 //shells represents our cart, and each item needs to be in an object with its own quantity, price 
}

export default function cartReducer(shells = [], action) {
  switch (action.type) {
    case ADD_SHELL_TO_CART:
      return [...shells, action.id] //return each shell as an object if it isn't already added, with a price and quantity property
    case ADD_SHELL:
      return //map throught the shells array and grab the shell that matches the action.id and increment the quantity and price
    case MINUS_SHELL:
      return //maps through the shells array and matches the action.id and decrements the quantity and price
    case REMOVE_SHELL:
      return //destroy the shell
    default:
      return state
  }

}

