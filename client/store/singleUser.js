import axios from "axios";
const GET_SINGLE_USER = "GET_SINGLE_USER";

const _getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};

export const getSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(`/api/admin/users/${userId}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_getSingleUser(user));
    } catch (err) {
      console.error("Oops! Error fetching that user: ", err);
    }
  };
};

export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
