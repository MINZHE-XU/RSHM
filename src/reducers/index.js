import { combineReducers } from 'redux'
import spots from './spots'
import center from './center'
import mode from './mode'

const todoApp = combineReducers({
  spots,
  center,
  mode
})

export default todoApp
