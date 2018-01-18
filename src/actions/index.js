let nextTodoId = 0


export function addSpot(payload) {
  console.log(payload)
  return { type:'ADD_SPOT' , id: nextTodoId++, lat:payload.lat, lng:payload.lng }
}

export function centerListSpot(payload) {
  return { type:'CENTER_SPOT' , lat:payload.lat, lng:payload.lng}
}
export function clickListSpot(payload) {
  return { type:'CLICKED_SPOT' , lat:payload.lat, lng:payload.lng}
}


export function changeMode() {
  return { type:'CHANGE_MODE' }
}
