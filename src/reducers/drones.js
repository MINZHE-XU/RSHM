/* global google */
/* eslint-disable no-undef */
import {  GoogleMap } from "react-google-maps"

const drones = (state=[] , action) => {
  switch (action.type) {
    case 'ADD_DRONE':
      console.log(action)
      return [
        ...state,
        {
          id: action.id,
          lat: action.lat,
          lng: action.lng,
          isDynamic:action.isDynamic
        }
      ]
      break;
    case 'DELETE_DRONE':
    console.log(action)
      const currentSpotToDelete = state
      const indexToDelete = currentSpotToDelete.findIndex(
        function(spot){
          return spot.id === action.id;
        }
      )
      if(indexToDelete<0){
        return state
      }else{
        return [...currentSpotToDelete.slice(0, indexToDelete), ...currentSpotToDelete.slice(indexToDelete + 1)]
      }
      break;
      case 'DELETE_ALL_DRONE':
      console.log(action)
          return []
        break;

    default:
      return state
  }
}


export default drones
