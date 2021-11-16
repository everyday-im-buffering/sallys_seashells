import axios from "axios";

// Action Types
const GET_ALL_SHELLS = "GET_ALL_SHELLS";

// Action Creators
const getAllShells = (shells) => {
  return {
    type: GET_ALL_SHELLS,
    shells
  }
}

// Thunks
export const fetchAllShells = () => {
  return async (dispatch) => {
    try {
      const { data: allShells } = await axios.get('/api/shells')
      // console.log(allShells)
      dispatch(getAllShells(allShells))
    } catch (err) {
      console.log(err)
    }
  }
}

// Initial State: may need updating

// Reducer
export default function allShellsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_SHELLS:
      return action.shells
    default:
      return state
  }
}