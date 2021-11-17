import axios from "axios";

// user action types
const GET_ALL_USERS = "GET_ALL_USERS";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";
// if admins should be able to create new users, that would go here too


// user action creators
const _getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const _updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const _deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};



// user thunk creators
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/admin/users");
      dispatch(_getAllUsers(users));
    } catch (err) {
      console.error("Oops! Error fetching all users: ", err);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/admin/users/${user.id}`,
        user
      );
      dispatch(_updateUser(updated));
    } catch (err) {
      console.error("Oops! Error updating user: ", err);
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: deleted } = await axios.delete(
        `/api/admin/users/${userId}`
      );
      dispatch(_deleteUser(deleted));
    } catch (err) {
      console.error("Oops! Error deleting user: ", err);
    }
  };
};

export default function userReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case UPDATE_USER:
      return state.map((user) =>
          user.id === action.user.id ? action.user : user
        )
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id)
    default:
      return state;
  }
}
