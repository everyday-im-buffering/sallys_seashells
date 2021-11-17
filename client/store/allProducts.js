import axios from "axios";

// Action Types
const GET_ALL_SHELLS = "GET_ALL_SHELLS";
const UPDATE_SHELL = "UPDATE_SHELL";
const CREATE_NEW_SHELL = "CREATE_NEW_SHELL";
const DELETE_SHELL = "DELETE_SHELL";

// Action Creators
const getAllShells = (allShells) => {
  return {
    type: GET_ALL_SHELLS,
    allShells,
  };
};

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

// Thunks
export const fetchAllShells = () => {
  return async (dispatch) => {
    try {
      const { data: allShells } = await axios.get("/api/shells");
      console.log(allShells);
      dispatch(getAllShells(allShells));
    } catch (err) {
      console.log(err);
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

// Reducer
export default function allShellsReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_SHELLS:
      return action.allShells;
    case UPDATE_SHELL:
      return state.map((shell) => {
        shell.id === action.shell.id ? action.shell : shell;
      });
    case CREATE_NEW_SHELL:
      return [...state, action.shell];
    case DELETE_SHELL:
      return state.filter((shell) => shell.id !== action.shell.id);
    default:
      return state;
  }
}
