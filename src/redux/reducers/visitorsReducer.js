import { ActionTypes } from "../constants/action-types";
const intialState = {
  visitors: []
};

export const visitorsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_VISITORS:
      return { ...state, visitors: payload };
    default:
      return state;
  }
};