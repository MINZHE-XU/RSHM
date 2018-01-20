const mode = (state='point' , action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return (state==='point')? 'rectangle':'point'
    default:
      return state
  }
}

export default mode
