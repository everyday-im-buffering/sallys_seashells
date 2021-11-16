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
// if admins should be able to create new users, that would go here too

// shell action types
const UPDATE_SHELL = "UPDATE_SHELL";
const CREATE_NEW_SHELL = "CREATE_NEW_SHELL";
const DELETE_SHELL = "DELETE_SHELL";

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

// shell action creators
const _updateShell = (shell) => {
  return {
    type: UPDATE_SHELL,
    shell,
  };
};

const _createNewShell = (shell) => {
  return {
    type: CREATE_NEW_SHELL,
    shell,
  };
};

const _deleteShell = (shell) => {
  return {
    type: DELETE_SHELL,
    shell,
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

// shell thunk creators
export const updateShell = (shell) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/admin/shells/${shell.id}`,
        user
      );
      dispatch(_updateShell(updated));
    } catch (err) {
      console.error("Oops! Error updating shell: ", err);
    }
  };
};

export const createNewShell = (shell) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(`/api/admin/shells`, shell);
      dispatch(_createNewShell(created));
    } catch (err) {
      console.error("Oops! Error creating shell: ", err);
    }
  };
};

export const deleteShell = (shellId) => {
  return async (dispatch) => {
    try {
      const { data: deleted } = await axios.delete(
        `/api/admin/shells/${shellId}`
      );
      dispatch(_deleteShell(deleted));
    } catch (err) {
      console.error("Oops! Error deleting shell: ", err);
    }
  };
};

// doesn't include shell actions, but this needs to be split and moved into the users and shells reducers anyways
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
