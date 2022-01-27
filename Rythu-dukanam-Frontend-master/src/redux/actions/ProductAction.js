import {
  PRODUCT_ALL_FAIL,
  PRODUCT_ALL_REQUEST,
  PRODUCT_ALL_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../conistance/ProductConistance";
import Axios from "axios";

export const createProduct = (post) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.post("/api/", post, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
  }
};

export const listProduct = () => async (dispatch) => {
  dispatch({ type: PRODUCT_ALL_REQUEST });

  try {
    const { data } = await Axios.get("/api/");
    dispatch({ type: PRODUCT_ALL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_ALL_FAIL, payload: message });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

  try {
    const { data } = await Axios.get(`/api/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const data = await Axios.put(`/api/update`, product, {
      headers: {
        Authorization: `Bearen ${userInfo.token}`,
      },
    });
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};

export const deleteProduct = (_id) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  const { data } = await Axios.post(`/api/admin/remove`, _id, {
    headers: {
      Authorization: `Bearen ${userInfo.token}`,
    },
  });
  dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
};
