import { combineReducers } from 'redux'
import spots from './spots'
import statusPoint from './statusPoint'
import mode from './mode'
import size from './size'
import mrs from './mrs'

const todoApp = combineReducers({
  spots,
  statusPoint,
  size,
  mode,
  mrs
})

export default todoApp
