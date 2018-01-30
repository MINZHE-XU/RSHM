const size = (state={length:0.04, height:0.02}, action) => {
  switch (action.type) {
    case 'CHANGE_SIZE':
    console.log(action)
      return {length:action.length, height:action.height}
      break
    default:
      return state
  }
}

export default size
