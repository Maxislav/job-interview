import { autobind } from 'core-decorators';
import {Room} from "./table";
export class User {
    private socket: any;
    public id: string;
    public emit: Function
    constructor(socket: any, private room: Room){
        this.socket = socket;
        this.id = socket.id;
        this.emit = socket.emit;
        this.room.registerUser(this)
        console.log('connect    ', this.id)
        socket.on('disconnect',this.onDisconnect)


    }



    @autobind
    onDisconnect(){
        console.log('disconnect ', this.id)
        this.room.unRegisterUser(this)
    }
}