const origin = {
  center:{
    id: -1,
    lat: 10000,
    lng: 10000,
    kind:"unknown"
  },
  clicked:{
    id: -1,
    lat: 10000,
    lng: 10000,
    kind:"unknown"
  },
  candidateSpots:[],
  uploadStatus:{status:"none",data_id:""},
  downloadStatus:{status:"none",groupeddata:""}
}

const statusPoint = (state=origin , action) => {

  switch (action.type) {

    case 'CENTER_SPOT':
      return {...state,
        center:{
          id: action.id,
          lat: action.lat,
          lng: action.lng,
          kind: action.kind
        }
      }
      break;
    case 'CLICKED_SPOT':
    //console.log(action)
    //console.log(state.clicked)
      if (state.clicked.id===action.id && state.clicked.lat===action.lat && state.clicked.lng===action.lng){
        return {...state,
          clicked:origin.clicked
        }
      }else{
        return {...state,
          clicked:{
            id: action.id,
            lat: action.lat,
            lng: action.lng,
            kind: action.kind
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
            lng: action.spots[0].lng,
            kind:"unknown"
          },
          clicked:{
            id: -1,
            lat: action.spots[0].lat,
            lng: action.spots[0].lng,
            kind:"unknown"
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

        case 'CHANGE_INFO_WINDOW_OPEN':
        console.log(action)
        const changedSpots=state.candidateSpots.map(function(spot, index){
          return {...spot, isOpen:false}
         })
        const currentSpotToUpdate = state.candidateSpots
        const indexToUpdate = currentSpotToUpdate.findIndex(
          function(spot){
            return spot.number === action.number;
          }
        )

        if(indexToUpdate<0){
          return state
        }else{
          const newSpotToUpdate = {
            ...currentSpotToUpdate[indexToUpdate],
            isOpen:!currentSpotToUpdate[indexToUpdate].isOpen
          }
          return {...state ,candidateSpots:[...changedSpots.slice(0, indexToUpdate), newSpotToUpdate , ...changedSpots.slice(indexToUpdate + 1)]}
        }
        break;

        case 'UPLOAD_DATA':
            console.log(action.status)
        switch (action.status) {
          case 'uploading':
            return {...state,
              uploadStatus:{status:"upoading",data_id:""}
            }
            break;
          case 'success':
            return {...state,
              uploadStatus:{status:"success",data_id:action.payload.data._id}
            }
            break;
          case 'uploading':
            return {...state,
              uploadStatus:{status:"fail",data_id:""}
            }
            break;
          case 'clean':
            return {...state,
              uploadStatus:{status:"none",data_id:""}
            }
            break;
          }




      default:
      return state
  }
}

export default statusPoint
