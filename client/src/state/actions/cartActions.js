import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_AFTER_PAYMENT,
} from "../constants/cartConstants";

// Add items to cart
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove items from cart
// This is not an API Call, we are only deleting the item from local sotrage
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Clear Cart After Payment
export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART_AFTER_PAYMENT,
    payload: localStorage.removeItem("cartItems"),
  });
};

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
