const mode = (state='rectangle' , action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return (state==='point')? 'rectangle':'point'
    default:
      return state
  }
}

export default mode
