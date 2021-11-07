// Redux Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// User Reducers
import { userReducer } from "./reducer/userReducer";

// Products Reducers
import { productReducer } from "./reducer/productReducer";

const reducers = combineReducers({
  // User Reducers
  user: userReducer,
  // Products Reducers
  products: productReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
