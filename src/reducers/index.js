import { combineReducers } from 'redux'
import spots from './spots'
import statusPoint from './statusPoint'
import mode from './mode'
import size from './size'

const todoApp = combineReducers({
  spots,
  statusPoint,
  size,
  mode
})

export default todoApp
