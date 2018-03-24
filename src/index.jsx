import React from 'react'
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import {counterReducer} from './reducers'
import { Provider } from 'react-redux'

import createSagaMiddleware from 'redux-saga'

import rootSaga  from './sagas'
import {Counter} from "./components";
import  './servise/socket.service'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  counterReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

const action = type => store.dispatch({type})

const Input = () => {
  return (
    <div>Hello</div>
  )
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Counter
        state={store.getState()}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')}
        onIncrementAsync={() => action('INCREMENT_ASYNC')} />
    </Provider>,
    document.getElementById('root')
  )
}


render();
store.subscribe(render)