// Redux Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// User Reducers
import {
  userReducer,
  forgotPasswordReducer,
  editUserReducer,
} from "./reducer/userReducer";

// Products Reducers
import {
  productReducer,
  productDetailsReducer,
} from "./reducer/productReducer";

// Orders Reducers
import { orderDetailsReducer, myOrdersReducer } from "./reducer/ordersReducer";

const reducers = combineReducers({
  // User Reducers
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  editUser: editUserReducer,
  // Products Reducers
  products: productReducer,
  productDetails: productDetailsReducer,
  // Orders Reducers
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
