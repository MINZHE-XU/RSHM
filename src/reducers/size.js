const size = (state={length:0.04, height:0.02,step:0.01}, action) => {
  switch (action.type) {
    case 'CHANGE_SIZE':
    console.log(action)
      return {length:action.length, height:action.height,step:state.step}
      break
    case 'CHANGE_STEP':
    console.log(action)
      return {length:state.length, height:state.height,step:action.step}
      break
    default:
      return state
  }
}

export default size
