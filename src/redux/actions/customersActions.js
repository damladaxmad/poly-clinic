import { ActionTypes } from "../constants/action-types";

export const setCustomers = (data) => {
  return {
    type: ActionTypes.SET_CUSTOMERS,
    payload: data,
  };
};


export const addCustomer = (data) => {
  data.balance = 0
  data.debit = 0
  data.credit = 0
  data.transaction = []
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