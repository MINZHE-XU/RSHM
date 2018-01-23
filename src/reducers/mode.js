const mode = (state={show:'point', algorithm:'local'} , action) => {
  switch (action.type) {
    case 'CHANGE_SHOW_MODE':
      return (state.show==='point')? {show:'rectangle', algorithm:state.algorithm}:{show:'point', algorithm:state.algorithm}
      break
    case 'CHANGE_ALGORITHM_MODE':
      return (state.algorithm==='local')? {show:state.show, algorithm:'full'}:{show:state.show, algorithm:'local'}
      break
    default:
      return state
  }
}

export default mode
