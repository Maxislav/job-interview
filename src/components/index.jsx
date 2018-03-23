import React from 'react'
import {RoomComponent} from "./room-component/room-component";


export const Counter = ({ state, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <RoomComponent/>

    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {state.count} times
    </div>
  </div>