import { ActionTypes } from "../constants/action-types";

export const setVisitors = (data) => {
  return {
    type: ActionTypes.SET_VISITORS,
    payload: data,
  };
};