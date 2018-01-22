let nextTodoId = 0


export function addSpot(payload) {
  let currentID=nextTodoId++
  //clickListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  //centerListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  return { type:'ADD_SPOT' , id:currentID , lat:payload.lat, lng:payload.lng }

}
export function deleteSpot(payload) {
  //centerListSpot ({id:-1 , lat:10000, lng:10000})
  //clickListSpot ({id:-1 , lat:10000, lng:10000})
  return { type:'DELETE_SPOT' , id: payload.id, lat:payload.lat, lng:payload.lng }
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

export function changeMode() {
  return { type:'CHANGE_MODE' }
}

export function updateMRs(payload) {
  return { type:'FULLY_UPDATE_MRS' ,spots: payload.spots,size:payload.size }
}

export function addSpotForMRs(payload) {
  console.log(payload)
  return { type:'ADD_ONE_SPOT_MRS' ,spots: payload.spots,size:payload.size }
}
