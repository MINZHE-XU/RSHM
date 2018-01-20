const size = (state={length:1, height:1}, action) => {
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
