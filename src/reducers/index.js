import { combineReducers } from 'redux'
import spots from './spots'
import statusPoint from './statusPoint'
import mode from './mode'
import size from './size'
import mrs from './mrs'
import mrsFull from './mrsFull'
import path from './path'

const combinedReducer = combineReducers({
  spots,
  statusPoint,
  size,
  mode,
  mrs,
  path
})


function crossSliceReducer(state, action) {
    switch(action.type) {
        case "FULLY_UPDATE_MRS" : {
            return {
              //special case needs  spots information
              mrs : mrsFull(state.mrs, action, state.spots),
              spots: spots(state.spots, action),
              statusPoint: statusPoint(state.statusPoint, action),
              size: size(state.size, action),
              mode: mode(state.mode, action),
              path: path(state.path, action)
            }
        }
        break

        default : return state;
    }
}


export default function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action);
    const finalState = crossSliceReducer(intermediateState, action);
    return finalState;
}
