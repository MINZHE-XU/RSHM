const origin=[{id:0, north:-33.03900467904444, south:-34.03900467904444,west:150.4849853515625, east:151.4849853515625,rs:1}]
const mrs = (state =origin, action) => {
  switch (action.type) {
    case 'FULLY_UPDATE_MRS':
      console.log(action)
      console.log(action.spots)
      console.log(action.size)
      return [

      ]
      break;

    default:
      return state
  }
}

export default mrs
