const spots = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SPOT':
      return [
        ...state,
        {
          id: action.id,
          lat: action.lat,
          lng: action.lng
        }
      ]
    default:
      return state
  }
}

export default spots
