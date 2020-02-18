import { SET_ORDERS_FILTER } from "../types"

export const setOrdersFilter = (filter) => {
  return {
    type: SET_ORDERS_FILTER,
    payload: filter
  }
}