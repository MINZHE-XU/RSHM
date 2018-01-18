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
      return {
        center:{
          lat: action.lat,
          lng: action.lng
        },
        clicked:state.clicked
      }
    case 'CLICKED_SPOT':
      if (state.clicked.lat===action.lat&&state.clicked.lng===action.lng){
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
            lat: action.lat,
            lng: action.lng
          }
        }
      }


      default:
      return state
  }
}

export default statusPoint
