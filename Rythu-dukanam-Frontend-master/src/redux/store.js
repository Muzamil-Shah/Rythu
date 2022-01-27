import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { detailsOrderReducer, orderCreateReducer, ordersUserReducer, ordersAllReducer, orderUpdateReducer } from "./reducers/orderReducers";
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
} from "./reducers/ProductReducer";
import {
  userDetailsReducer,
  userRegisterReducer,
  usersAllReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import { zonePickerReducer } from "./reducers/zoneReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  carts: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    informationAddress: localStorage.getItem("informationAddress")
      ? JSON.parse(localStorage.getItem("informationAddress"))
      : {},
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    payment: localStorage.getItem("payment")
      ? JSON.parse(localStorage.getItem("paymenty"))
      : {},
  },
    
};

const reducer = combineReducers({
  zonePicker: zonePickerReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productsList: productListReducer,
  productDetails: productDetailsReducer,
  carts: cartReducer,
  orderCreate: orderCreateReducer,
  detailsOrder: detailsOrderReducer,
  ordersUser: ordersUserReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  //admin
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  ordersAll: ordersAllReducer,
  orderUpdate: orderUpdateReducer,
  usersAll: usersAllReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
