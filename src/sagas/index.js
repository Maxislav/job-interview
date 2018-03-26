import {socket} from '../service/socket.service.js'
import { eventChannel } from 'redux-saga';
import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import {tableChangeAction, tableListAction} from "../reducers/actions";


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

function* socketInit(){
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
export default function* rootSaga() {
  yield all([
    socketInit(),
  ])
}