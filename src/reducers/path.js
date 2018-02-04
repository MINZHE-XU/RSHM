/* global google */
/* eslint-disable no-undef */
import {  GoogleMap } from "react-google-maps"

const path = (state=[] , action) => {
  switch (action.type) {
    case 'ADD_ONE_PATH':
    console.log(action)
    //console.log(action.path[0].lat())
      return [
        ...state,
        {
          id: action.id,
          isDrone:action.isDrone,
          path: action.path
        }
      ]
      return state
      break
    case 'MOVE_ONE_STEP':
    console.log(action)
    let stepLength=action.size.step * Math.sqrt(action.size.length*action.size.length + action.size.height*action.size.height)*action.stepLengthNumber
    let needUpdate=state
    let temp= needUpdate.map(function(apath, index){
      return moveForward(apath,stepLength)
     })

      return  temp
      break


      case 'DELETE_ONE_PATH':
      console.log(action)
        const currentPathToDelete = state
        const indexToDelete = currentPathToDelete.findIndex(
          function(path){
            return path.id === action.id;
          }
        )
        if(indexToDelete<0){
          return state
        }else{
          return [...currentPathToDelete.slice(0, indexToDelete), ...currentPathToDelete.slice(indexToDelete + 1)]
        }
        break;

      case 'DELETE_ALL_PATH':
      console.log(action)
        return []
        break;

    default:
      return state
  }
}

export function moveForward(apath,stepLength){
  if (apath.path.length>1){

    let xdis=apath.path[1].lat()-apath.path[0].lat()
    let ydis=apath.path[1].lng()-apath.path[0].lng()

    let distance= Math.sqrt(xdis*xdis+ ydis*ydis)
    if (distance>=stepLength){
      // according to the rate
      let xValue= xdis * stepLength / distance + apath.path[0].lat()
      let yValue= ydis * stepLength / distance + apath.path[0].lng()
      let firstPosition= new google.maps.LatLng(xValue, yValue)
      //console.log(aaa)
      return {
          id: apath.id,
          isDrone:apath.isDrone,
          path: [firstPosition, ...apath.path.slice(1)]
      }
    }else if(distance===stepLength){
      return {
          id: apath.id,
          isDrone:apath.isDrone,
          path: [ ...apath.path.slice(1)]
      }
    }else{
      return moveForward({
          id: apath.id,
          isDrone:apath.isDrone,
          path: [...apath.path.slice(1)]
      },stepLength-distance)
    }


  }else{
    return apath
  }
}


export default path
