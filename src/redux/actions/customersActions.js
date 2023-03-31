import { ActionTypes } from "../constants/action-types";

export const setCustomers = (data) => {
  return {
    type: ActionTypes.SET_CUSTOMERS,
    payload: data,
  };
};

export const addCustomer = (data) => {
  return {
    type: ActionTypes.ADD_CUSTOMER,
    payload: data,
  };
};

export const deleteCustomer = (data) => {
  return {
    type: ActionTypes.DELETE_CUSTOMER,
    payload: data,
  };
};

export const updateCustomer = (data) => {
  return {
    type: ActionTypes.UPDATE_CUSTOMER,
    payload: data,
  };
};