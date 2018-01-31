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
    let crossStorage={
       //special case needs  spots information
       mrs : state.mrs,
       spots: state.spots,
       statusPoint: state.statusPoint,
       size: state.size,
       mode: state.mode,
       path: state.path
     }

    switch(action.type) {
        case "FULLY_UPDATE_MRS" :
        return {...crossStorage, mrs:mrsFull(state.mrs, action,  state.spots )  }
        break

        case 'ADD_ONE_PATH'  :
        case "MOVE_ONE_STEP"   :
        const currentSpotToSearch =  state.spots
        state.path.map(function(apath, index){
          console.log(apath)

          if (apath.isDrone===false){
          let indexToDelete = currentSpotToSearch.findIndex(
            function(spot){
              return spot.id === apath.id ;
            }
          )

          if(indexToDelete>=0 ){
                    //find thing to update
                    //console.log("currentSpotToSearch[indexToDelete]")
                    //console.log(currentSpotToSearch[indexToDelete])
                    //console.log("nextProps.path[index]")
                    //console.log(nextProps.path[index])

                    //if in the last point, we donnot need to update.
                    if (currentSpotToSearch[indexToDelete].lat!==state.path[index].path[0].lat() && currentSpotToSearch[indexToDelete].lng!==state.path[index].path[0].lng()){
                      crossStorage.spots=spots(crossStorage.spots, { type:'DELETE_SPOT' , id: currentSpotToSearch[indexToDelete].id})
                      if(state.mode.algorithm==='local'){
                        crossStorage.mrs=mrs(crossStorage.mrs,{type:'DELETE_ONE_SPOT_MRS',spots:currentSpotToSearch[indexToDelete], size:state.size })
                      }
                      crossStorage.spots=spots(crossStorage.spots, { type:'ADD_SPOT' , id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true})

                      if(state.mode.algorithm==='local'){
                        crossStorage.mrs=mrs(crossStorage.mrs,{type:'ADD_ONE_SPOT_MRS',spots:{id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true}, size:state.size })
                      }
                    }else{
                      //console.log("the same!!!!!!!!!!!!!!")
                    }
                  }else{
                    crossStorage.spots=spots(crossStorage.spots, { type:'ADD_SPOT' , id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true})
                    crossStorage.statusPoint=statusPoint(crossStorage.statusPoint, { type:'CENTER_SPOT' , id:apath.id, lat:apath.path[0].lat() ,lng:apath.path[0].lng()})
                    crossStorage.statusPoint=statusPoint(crossStorage.statusPoint, { type:'CLICKED_SPOT' , id:apath.id, lat:apath.path[0].lat() ,lng:apath.path[0].lng()})
                    if(state.mode.algorithm==='local'){
                      crossStorage.mrs=mrs(crossStorage.mrs,{type:'ADD_ONE_SPOT_MRS',spots:{id:apath.id,lat:apath.path[0].lat() ,lng:apath.path[0].lng(),isDynamic:true}, size:state.size })
                    }
                  }
                }
                    //console.log(apath)
                  })

           console.log(crossStorage.mrs)
        return crossStorage
        break

        default :
        return state;
    }
}


export default function rootReducer(state, action) {
    const intermediateState = combinedReducer(state, action);
    const finalState = crossSliceReducer(intermediateState, action);
    return finalState;
}
