import {combineReducers} from 'redux'
import app from './app'
import orders from './orders'

export default combineReducers({
  app,
  orders,
})