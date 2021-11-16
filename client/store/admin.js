import axios from "axios";

const initialState = {
  allUsers: [],
  selectedUser: {},
  allShells: [],
  selectedShell: {},
};

// user action types
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

// user action creators
const _getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

const _getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
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

export const getSingleUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(`/api/admin/users/${userId}`);
      dispatch(_getSingleUser(user));
    } catch (err) {
      console.error("Oops! Error fetching that user: ", err);
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

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, allUsers: action.users };
    case GET_SINGLE_USER:
      return { ...state, selectedUser: action.user };
    case UPDATE_USER:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user.id === action.user.id ? action.user : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.user.id),
      };
    default:
      return state;
  }
}
