let nextTodoId = 0


export function addSpot(payload) {
  let currentID=-1

  if(payload.id>-1){
    currentID=payload.id
  }else {
    currentID=nextTodoId++
  }
  //clickListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  //centerListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  return { type:'ADD_SPOT' , id:currentID , lat:payload.lat, lng:payload.lng, isDynamic:payload.isDynamic  }

}
export function deleteSpot(payload) {
  //centerListSpot ({id:-1 , lat:10000, lng:10000})
  //clickListSpot ({id:-1 , lat:10000, lng:10000})
  return { type:'DELETE_SPOT' , id: payload.id}
}
export function deleteAllSpot(payload) {
  return { type:'DELETE_ALL_SPOT' }
}

export function centerListSpot(payload) {
  return { type:'CENTER_SPOT' ,id: payload.id, lat:payload.lat, lng:payload.lng}
}

export function clickListSpot(payload) {
  return { type:'CLICKED_SPOT' ,id: payload.id, lat:payload.lat, lng:payload.lng}
}

export function changeSize(payload) {
  return { type:'CHANGE_SIZE' ,length: payload.length, height:payload.height}
}

export function changeShowMode() {
  return { type:'CHANGE_SHOW_MODE' }
}
export function changeAlgorithmMode() {
  return { type:'CHANGE_ALGORITHM_MODE' }
}

export function updateMRs(payload) {

  return { type:'FULLY_UPDATE_MRS' ,spots: payload.spots,size:payload.size }
}

export function addSpotForMRs(payload) {
  return { type:'ADD_ONE_SPOT_MRS' ,spots: payload.spots,size:payload.size }
}

export function deleteSpotForMRs(payload) {
  return { type:'DELETE_ONE_SPOT_MRS' ,spots: payload.spots,size:payload.size }
}
export function resetMRs(payload) {
  return { type:'RESET_MRS'  }
}

export function addOnePath(payload) {
  let currentID=nextTodoId++
  return { type:'ADD_ONE_PATH' , id:currentID, path:payload.path  }
}
export function moveOneStep(payload) {
  return { type:'MOVE_ONE_STEP', size:payload.size}
}

export function deletePath(payload) {
  //centerListSpot ({id:-1 , lat:10000, lng:10000})
  //clickListSpot ({id:-1 , lat:10000, lng:10000})
  return { type:'DELETE_ONE_PATH' , id: payload.id}
}
export function deleteAllPath(payload) {
  return { type:'DELETE_ALL_PATH' }
}
