const center = (state={} , action) => {
  switch (action.type) {
    case 'CENTER_SPOT':
      return {
        lat: action.lat,
        lng: action.lng,
      }
    default:
      return state
  }
}

export default center
