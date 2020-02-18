import { SET_ORDERS_FILTER } from "../types"

const initState = {
  filter: {
    offset: 0,
    limit: 20,
    status: null,
    aggs_by: 'status',
    search: null,
    site_ids: [],
    product_ids: []
  },
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_ORDERS_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    default:
      return state
  }
}