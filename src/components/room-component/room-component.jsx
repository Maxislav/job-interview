import React, {Component} from 'react'
import {connect} from 'react-redux'
import { TableComponent } from '../table-component/table-component'
import className from './room-component.styl'

@connect(
  state =>({
    count: state.count
  })
)
export class RoomComponent extends Component {
  constructor(...args) {
    super(...args)

    console.log(this.props)
  }

  render(){
    return(
      <div className={className.component}>
        {this.props.count}
        <TableComponent/>
      </div>
    )
  }
}