const origin = {
  center:{
    lat: 0,
    lng: 0
  },
  clicked:{
    lat: 0,
    lng: 0
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
      return {
        center:state.center,
        clicked:{
          lat: action.lat,
          lng: action.lng
        }
      }
      default:
      return state
  }
}

export default statusPoint
