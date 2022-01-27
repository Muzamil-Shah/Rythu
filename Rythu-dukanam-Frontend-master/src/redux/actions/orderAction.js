import Axios from "axios";
import { $CombinedState } from "redux";
import { CART_EMPTY } from "../conistance/cartConstants";
import {
  ORDER_ALL_LIST_FAIL,
  ORDER_ALL_LIST_REQUEST,
  ORDER_ALL_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_UPDATE_STATUS_FAIL,
  ORDER_UPDATE_STATUS_REQUEST,
  ORDER_UPDATE_STATUS_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
} from "../conistance/orderConstance";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const userOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_USER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/orders`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_USER_LIST_FAIL, payload: message });
  }
};

/// admin
export const allOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_ALL_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get("/api/orders/admin", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_ALL_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_ALL_LIST_FAIL, payload: message });
  }
};

export const updateOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_STATUS_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const data = await Axios.put("/api/orders/update", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_UPDATE_STATUS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_UPDATE_STATUS_FAIL, payload: message });
  }
};

export const deleteOrder = (_id) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  const { data } = await Axios.post(`/api/orders/admin/remove`, _id, {
    headers: {
      Authorization: `Bearen ${userInfo.token}`,
    },
  });
  dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
};
