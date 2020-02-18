import { SET_CURRENT_USER, INIT_APP, SET_DESTINATION } from "../types"

const initState = {
  currentUser: null,
  appInit: false,
  destination: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        appInit: true,
      }
    case SET_DESTINATION:
      return {
        ...state,
        destination: action.payload
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}