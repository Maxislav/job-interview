import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import './styl/global.styl'
import {store}  from './sagas'
import  './service/socket.service'
import {RoomComponent} from "./components/room-component/room-component";

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <RoomComponent/>
    </Provider>,
    document.getElementById('root')
  )
}


render();
store.subscribe(render)