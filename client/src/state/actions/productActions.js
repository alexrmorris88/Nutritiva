import axios from "axios";
import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

// Show all products
export const allProducts = (currentPage) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`/products/all?page=${currentPage}`);

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Show Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });

    const { data } = await axios.get(`/products/${id}`);

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Admin Products
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_REQUEST,
    });

    const { data } = await axios.get("/products/admin/all");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};

// Delete Products
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const { data } = await axios.delete(`/products/delete/${id}`);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};

// Update Products
export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/products/update/${id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create New Products
export const newProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_PRODUCT_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/products/new", formData, config);

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Product Reviews
export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEW_REQUEST });

    const { data } = await axios.get(`/products/reviews/${id}`);

    dispatch({
      type: GET_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// New Product Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/products/reviews/create`,
      reviewData,
      config
    );

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product Reviews
export const deleteProductReviews = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/product/reviews?id=${id}&productId=${productId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
