import { autobind } from 'core-decorators';
import {Room} from "./table";
export class User {
    private socket: any;
    public id: string;
    public emit: Function
    constructor(socket: any, private room: Room){
        this.socket = socket;
        this.id = socket.id;
        this.emit = socket.emit.bind(socket);
        this.room.registerUser(this);
        this.emitTableList(this.room.getTableListData())

        console.log('connect    ', this.id)
        socket.on('disconnect',this.onDisconnect)


    }

    onChangeTable(table: TableInterface){
        this.socket.emit('table', ({data: table}))
    }

    emitTableList(tableList: TableInterface[]){
        this.socket.emit('tableList', ({data: tableList}))
    }


    @autobind
    onDisconnect(){
        console.log('disconnect ', this.id)
        this.room.unRegisterUser(this)
    }
}