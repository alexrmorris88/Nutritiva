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
  productReviewsReducer,
  reviewReducer,
} from "./reducer/productReducer";

// Orders Reducers
import {
  orderDetailsReducer,
  myOrdersReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducer/ordersReducer";

// Cart Reducers
import { cartReducer } from "./reducer/cartReducer";

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
  productReviews: productReviewsReducer,
  review: reviewReducer,
  // Orders Reducers
  orderDetails: orderDetailsReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  // Cart Reducer
  cart: cartReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
