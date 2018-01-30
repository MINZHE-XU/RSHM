const size = (state={length:0.004, height:0.002}, action) => {
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
