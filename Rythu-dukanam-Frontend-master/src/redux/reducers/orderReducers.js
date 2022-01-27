import {
  ORDER_ALL_LIST_FAIL,
  ORDER_ALL_LIST_REQUEST,
  ORDER_ALL_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
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


export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const detailsOrderReducer = (
  state = { loading: true, order: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ordersUserReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_USER_LIST_REQUEST:
      return { loading: true };
    case ORDER_USER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Admin
export const ordersAllReducer = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case ORDER_ALL_LIST_REQUEST:
      return { loading: true };
    case ORDER_ALL_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderUpdateReducer= (state = {}, action) =>{
  switch(action.type){
    case ORDER_UPDATE_STATUS_REQUEST:
      return {loading: true};
    case ORDER_UPDATE_STATUS_SUCCESS:
      return {loading: false, success: true};
    case ORDER_UPDATE_STATUS_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
}
