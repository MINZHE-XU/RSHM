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
  },
  candidateSpots:[]
}

const statusPoint = (state=origin , action) => {
  switch (action.type) {
    case 'CENTER_SPOT':
    //console.log(action)
      return {...state,
        center:{
          id: action.id,
          lat: action.lat,
          lng: action.lng
        }
      }
      break;
    case 'CLICKED_SPOT':
    console.log(action)
    console.log(state.clicked)
      if (state.clicked.id===action.id && state.clicked.lat===action.lat && state.clicked.lng===action.lng){
        return {...state,
          clicked:origin.clicked
        }
      }else{
        return {...state,
          clicked:{
            id: action.id,
            lat: action.lat,
            lng: action.lng
          }
        }
      }
      break;
      case 'UPDATE_CANDIDATE_SPOT':
      console.log(action)
      if(action.spots.length>0){
        return {...state ,
          center:{
            id: -1,
            lat: action.spots[0].lat,
            lng: action.spots[0].lng
          },
          clicked:{
            id: -1,
            lat: action.spots[0].lat,
            lng: action.spots[0].lng
          },
          candidateSpots:action.spots
        }

      }else{
        return {...state ,
          center:origin.center,
          clicked:origin.clicked,
          candidateSpots:[]
        }
      }
        break;

        case 'DELETE_CANDIDATE_SPOT':
        console.log(action)
          const currentSpotToDelete = state.candidateSpots
          const indexToDelete = currentSpotToDelete.findIndex(
            function(spot){
              return spot.lat === action.lat && spot.lng === action.lng;
            }
          )
          if(indexToDelete<0){
            return state
          }else{
            return {...state ,candidateSpots:[...currentSpotToDelete.slice(0, indexToDelete), ...currentSpotToDelete.slice(indexToDelete + 1)]}
          }
          break;

      default:
      return state
  }
}

export default statusPoint
