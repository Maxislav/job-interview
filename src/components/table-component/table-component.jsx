import React, {Component} from 'react'


export class TableComponent extends Component{
  constructor(...args){
    super(...args);

    this.table = {
      id: '0',
      type: 'H',
      name: 'noname',
      warning: false,
      players: 5,
      maxPlayers: 100
    }
  }

  render(){
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                id
              </td>
              <td>{this.table.id}</td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  }
}