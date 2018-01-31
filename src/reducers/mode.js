const mode = (state={show:'point', algorithm:'local' , dynamic:"point" } , action) => {
  switch (action.type) {
    case 'CHANGE_SHOW_MODE':
      return (state.show==='point')? {...state, show:'rectangle'}:{...state, show:'point'}
      break
    case 'CHANGE_ALGORITHM_MODE':
      return (state.algorithm==='local')? {...state, algorithm:'full'}:{...state, algorithm:'local'}
      break
    case 'CHANGE_DYNAMIC_TYPE':
      return (state.dynamic==="point" )? {...state, dynamic:'drone'}:{...state, dynamic:"point" }
      break
    default:
      return state
  }
}

export default mode
