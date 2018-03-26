import {socket} from '../service/socket.service.js'
import { delay } from 'redux-saga'
import { eventChannel } from 'redux-saga';
import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import {tableChangeAction, tableListAction} from "../reducers/actions";


function subscribe(socket) {
  return eventChannel(emit => {

    socket.on('tableList', ({data})=>{
      emit(tableListAction({tableList: data}))
    })

    socket.on('table', ({data}) => {
     emit(tableChangeAction({table: data}))
    })

    return () => {};
  });
}

function* incrementAsync() {
  yield delay(2000)
  yield put({ type: 'INCREMENT' })
}


function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}



function* socketInit(){
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    socketInit(),
    watchIncrementAsync(),

  ])
}