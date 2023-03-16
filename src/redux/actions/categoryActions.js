import { ActionTypes } from "../constants/action-types";

export const setCategory = (data) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: data,
  };
};