import { SET_DESTINATION, SET_CURRENT_USER } from "../types"

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export const setDestination = (router) => {
  return {
    type: SET_DESTINATION,
    payload: router
  }
}