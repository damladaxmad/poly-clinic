import { ActionTypes } from "../constants/action-types";

export const setServiceTypes = (data) => {
  return {
    type: ActionTypes.SET_SERVICE_TYPES,
    payload: data,
  };
};