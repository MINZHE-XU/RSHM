let nextTodoId = 0


export function addSpot(payload) {
  let currentID=nextTodoId++
  clickListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  centerListSpot ({id:currentID , lat:payload.lat, lng:payload.lng})
  return { type:'ADD_SPOT' , id:currentID , lat:payload.lat, lng:payload.lng }

}
export function deleteSpot(payload) {
  return { type:'DELETE_SPOT' , id: payload.id, lat:payload.lat, lng:payload.lng }
}

export function centerListSpot(payload) {
  return { type:'CENTER_SPOT' ,id: payload.id, lat:payload.lat, lng:payload.lng}
}

export function clickListSpot(payload) {
  return { type:'CLICKED_SPOT' ,id: payload.id, lat:payload.lat, lng:payload.lng}
}


export function changeMode() {
  return { type:'CHANGE_MODE' }
}
