import { ActionTypes } from "../constants/action-types";
const intialState = {
  serviceTypes: []
};

export const serviceTypesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SERVICE_TYPES:
      return { ...state, serviceTypes: payload };
    default:
      return state;
  }
};