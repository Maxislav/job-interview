export  function counterReducer(state = {count: 0}, action) {

  console.log(action )
  switch (action.type) {
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