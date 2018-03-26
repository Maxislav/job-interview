import React, {Component} from 'react'
import className from './table-component.styl'
import {connect} from "react-redux";

const initStyle  = {
  border: '0.1rem solid black',
  background: 'rgba(0, 255, 0, 0.1)'
}

const dangerStyle = {
  border: '0.1rem solid red',
  background: 'rgba(255, 0 ,0 , 0.1)'
}


const getStyle = (table) =>{
  if(!table.name) return null;
  if(table.players === table.maxPlayers) return dangerStyle
  return initStyle
}


const Row = ({title, value}) => {
  return (
    <div className={className.row} >
      <div className={className.cell} style={{width: '30%'}}>
        {title}
      </div>
      <div className={className.cell+ ' '+ className.ellipsis} style={{width: '70%'}}>
        {value}
      </div>
    </div>
  )
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
  shouldComponentUpdate(nextProps){
    return nextProps.table && nextProps.table.id === this.props.tableId
  }
  render(){
    const {name, type, players, maxPlayers} = this.props.table
    return (
      <div className={className.component} >
        <div className={className.cell} style={getStyle(this.props.table)}>
          <Row title={'id'} value={this.props.tableId}/>
          <Row title={'name'} value={name}/>
          <Row title={'type'} value={type}/>
          <Row title={'players'} value={players}/>
          <Row title={' max  players'} value={maxPlayers}/>
        </div>
      </div>
    )
  }
}