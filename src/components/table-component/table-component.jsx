import React, {Component} from 'react'
import className from './table-component.styl'
import {connect} from "react-redux";

const style = {
  border: '0.1rem solid red',
  background: 'rgba(255, 0 ,0 , 0.1)'
}


@connect(
  state =>({
    table: state.table
  })
)
export class TableComponent extends Component{
  constructor(...args){
    super(...args);
  }
  shouldComponentUpdate(nextProps, nextState){
    if(!nextProps.table) return true

    return nextProps.table && nextProps.table.id === this.props.tableId
  }

  render(){
    const {name, type, players, maxPlayers} = this.props.table

    return (
      <div className={className.component} style={players == maxPlayers ? style :null }>
        <table>
          <tbody>
            <tr>
              <td>
                id
              </td>
              <td>{this.props.tableId}</td>
            </tr>
            <tr>
              <td>
                name
              </td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>
                type
              </td>
              <td>{type}</td>
            </tr>
            <tr>
              <td>
                players
              </td>
              <td>{players}</td>
            </tr>
            <tr>
              <td>
                max  players
              </td>
              <td>{this.props.table.maxPlayers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}