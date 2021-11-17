import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleShell from "./singleShell";
import allProducts from "./allProducts";
import userReducer from "./users";
import singleUserReducer from "./singleUser";

const reducer = combineReducers({
  auth: auth,
  singleShell: singleShell,
  allShells: allProducts,
  users: userReducer,
  singleUser: singleUserReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
