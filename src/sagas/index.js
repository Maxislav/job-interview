import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'


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
  yield helloSaga()
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}