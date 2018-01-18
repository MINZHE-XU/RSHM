import { combineReducers } from 'redux'
import spots from './spots'
import statusPoint from './statusPoint'
import mode from './mode'

const todoApp = combineReducers({
  spots,
  statusPoint,
  mode
})

export default todoApp
