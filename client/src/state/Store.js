// Redux Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// User Reducers
import {
  userReducer,
  forgotPasswordReducer,
  editUserReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducer/userReducer";

// Products Reducers
import {
  productReducer,
  productDetailsReducer,
  modifyProductReducer,
  newProductReducer,
} from "./reducer/productReducer";

// Orders Reducers
import {
  orderDetailsReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducer/ordersReducer";

const reducers = combineReducers({
  // User Reducers
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  editUser: editUserReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  // Products Reducers
  products: productReducer,
  productDetails: productDetailsReducer,
  modifyProduct: modifyProductReducer,
  newProduct: newProductReducer,
  // Orders Reducers
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
