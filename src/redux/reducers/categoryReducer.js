import { ActionTypes } from "../constants/action-types";
const intialState = {
  categories: []
};

export const categoryReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};