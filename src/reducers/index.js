const defaultState = {
  count: 0,
  tableList: [],
  table: {
    players: -1
  }
}


export  function counterReducer(state = defaultState, action) {

  //console.log(io );
  switch (action.type) {
    case 'TABLE_LIST':
      return Object.assign({}, state, action.payload)
    case 'TABLE_CHANGE':
      return Object.assign({}, state, action.payload)
    case 'TABLE_INIT':
      return state
    case 'INCREMENT':
    //{...state, ...{count: state.count+1}};
      return Object.assign({}, state, {count: state.count+1})
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}