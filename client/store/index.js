import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import singleShell from "./singleShell";
import allProducts from "./allProducts";
import adminReducer from "./admin";
import cartReducer from "./cartReducer";

const reducer = combineReducers({
  auth: auth,
  singleShell: singleShell,
  allShells: allProducts,
  admin: adminReducer,
  cart: cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
