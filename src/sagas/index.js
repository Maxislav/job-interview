import {socket} from '../service/socket.service.js'
import { delay } from 'redux-saga'
import { eventChannel } from 'redux-saga';
import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import {tableChangeAction} from "../reducers/actions";


function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('table', ({data}) => {
      //console.log('table', data)
      emit(tableChangeAction({table: data}))
    })

   /* socket.on('users.login', ({ username }) => {
      emit(addUser({ username }));
    });
    socket.on('users.logout', ({ username }) => {
      emit(removeUser({ username }));
    });
    socket.on('messages.new', ({ message }) => {
      emit(newMessage({ message }));
    });
    socket.on('disconnect', e => {
      // TODO: handle
    });*/
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

function* helloSaga() {
  yield delay(1000)
//  console.log('Hello Sagas!')



  yield put({ type: 'INCREMENT' })
  //yield helloSaga()
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
    helloSaga(),
    watchIncrementAsync(),

  ])
}