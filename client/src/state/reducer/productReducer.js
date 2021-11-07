import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Products Reducer
export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };

    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.product,
        resPerPage: action.payload.resPerPage,
        productsCount: action.payload.productsCount,
      };

    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        products: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
