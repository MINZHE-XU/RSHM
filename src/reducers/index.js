import { combineReducers } from 'redux'
import spots from './spots'
import statusPoint from './statusPoint'
import mode from './mode'
import size from './size'
import mrs from './mrs'
import path from './path'

const todoApp = combineReducers({
  spots,
  statusPoint,
  size,
  mode,
  mrs,
  path
})

export default todoApp
