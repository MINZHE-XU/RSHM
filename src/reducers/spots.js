const spots = (state =[], action) => {
  switch (action.type) {
    case 'ADD_SPOT':
      console.log(action)
      return [
        ...state,
        {
          id: action.id,
          lat: action.lat,
          lng: action.lng
        }
      ]
      break;
    case 'DELETE_SPOT':
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
    default:
      return state
  }
}

export default spots
