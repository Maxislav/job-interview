import {socket} from '../service/socket.service.js'
import {delay, eventChannel} from 'redux-saga';
import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import {tableChangeAction, tableListAction} from "../reducers/actions";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "redux-saga";
import {counterReducer} from "../reducers";







function subscribe(socket) {
  return eventChannel(emit => {

    socket.on('tableList', ({data})=>{
      emit(tableListAction({tableList: data}))
    });
    socket.on('table', ({data}) => {
     emit(tableChangeAction({table: data}))
    });
    return () => {};
  });
}

function aa(val, i) {
  return {table:val[i]}
}


function* incrementAsync(action) {
  for(let i = 0; i < action.payload.tableList.length; i++){
    const table = yield call(aa, action.payload.tableList, i );
    yield put({ type: 'TABLE_CHANGE', payload:table })
  }
}



function* watchInitAsync() {
  yield takeEvery('TABLE_LIST', incrementAsync)
}

function* socketInit(){
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
function* rootSaga() {
  yield all([
    socketInit(),
    watchInitAsync()
  ])
}


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  counterReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
