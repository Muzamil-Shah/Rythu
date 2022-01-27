import Axios from "axios";
import { CART_ADDt_ITEM, CART_REMOVE_ITEM, CART_SAVE_INFORMATION_ADDRESS,CART_SAVE_PAYMENT,CART_SAVE_SHIPPING_ADDRESS } from "../conistance/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/${productId}`);
  dispatch({
    type: CART_ADDt_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      orderLimit: data.orderLimit,
      product: data._id,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cartItems));
};


export const saveInformationAddress = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_INFORMATION_ADDRESS, payload: data});
  localStorage.setItem('informationAddress', JSON.stringify(data));
}

export const saveShippingAddress = (data) => (dispatch) =>{
  dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
  localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePayment = (data) => (dispatch) => {
  dispatch({type: CART_SAVE_PAYMENT, payload: data})
  localStorage.setItem('payment', JSON.stringify(data));
}