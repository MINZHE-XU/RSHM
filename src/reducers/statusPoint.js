const origin = {
  center:{
    id: -1,
    lat: 10000,
    lng: 10000
  },
  clicked:{
    id: -1,
    lat: 10000,
    lng: 10000
  }
}

const statusPoint = (state=origin , action) => {
  switch (action.type) {
    case 'CENTER_SPOT':
    //console.log(action)
      return {
        center:{
          id: action.id,
          lat: action.lat,
          lng: action.lng
        },
        clicked:state.clicked
      }
      break;
    case 'CLICKED_SPOT':
    //console.log(action)
      if (state.clicked.id===action.id){
        return {
          center:state.center,
          clicked:{
            id: -1,
            lat: 10000,
            lng: 10000
          }
        }
      }else{
        return {
          center:state.center,
          clicked:{
            id: action.id,
            lat: action.lat,
            lng: action.lng
          }
        }
      }
      break;
      default:
      return state
  }
}

export default statusPoint
