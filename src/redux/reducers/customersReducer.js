import { ActionTypes } from "../constants/action-types";
const intialState = {
  customers: []
};

export const customersReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CUSTOMERS:
      return { ...state, customers: payload };

    case ActionTypes.ADD_CUSTOMER:
        return { 
          ...state, 
          customers: [...state.customers, payload] };
  
      case ActionTypes.DELETE_CUSTOMER:
        return { 
          ...state, 
          customers: [...state.customers.filter(customer => customer._id !== payload._id)] };
  
      case ActionTypes.UPDATE_CUSTOMER: 
          return {
              ...state, 
              customers: state.customers.map(customer => {
                  if (customer._id === payload._id) {
                     return payload;
                  }
      
                  return customer;
              }),
          };
    default:
      return state;
  }
};