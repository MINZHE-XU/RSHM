const path = (state=[] , action) => {
  switch (action.type) {
    case 'ADD_ONE_PATH':
    console.log(action)
    //console.log(action.path[0].lat())
      return [
        ...state,
        {
          id: action.id,
          path: action.path
        }
      ]
      return state
      break
    case 'MOVE_ONE_STEP':
    console.log(action)
    console.log(state)
    let needUpdate=state
    let temp= needUpdate.map(function(apath, index){
      console.log("apath")
      console.log(apath)
      if (apath.path.length>1){

        console.log("apath")
        console.log(apath)
        return {
            id: apath.id,
            path: [ ...apath.path.slice(1)]
        }
      }else{
        return apath
      }
     })
    console.log(temp)
      return  temp
      break


      case 'DELETE_ONE_PATH':
      console.log(action)
        const currentPathToDelete = state
        const indexToDelete = currentPathToDelete.findIndex(
          function(path){
            return path.id === action.id;
          }
        )
        if(indexToDelete<0){
          return state
        }else{
          return [...currentPathToDelete.slice(0, indexToDelete), ...currentPathToDelete.slice(indexToDelete + 1)]
        }
        break;

      case 'DELETE_ALL_PATH':
      console.log(action)
        return []
        break;

    default:
      return state
  }
}

export default path
