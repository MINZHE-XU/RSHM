const origin=[
{id: 10000, lat: -34.03900467904444, lng: 151.4849853515625},
{id: 10001, lat: -34.777715803604686, lng: 151.7266845703125},
{id: 10002, lat: -34.456748003478076, lng: 151.0894775390625},
{id: 10003, lat: -34.11180455556898, lng: 151.138916015625},
{id: 10004, lat: -34.307143856288036, lng: 149.3646240234375},
{id: 10005, lat: -34.7009774147201, lng: 150.31494140625}]
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
      case 'DELETE_ALL_SPOT':
      console.log(action)
          return []
        break;
    default:
      return state
  }
}

export default spots
