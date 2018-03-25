import {HashGenerator} from './utils/hash-generator'
import {tableListCont} from './constant'
import {User} from "./user";
import {Eventer} from './utils/eventer'

const hashGenerator = new HashGenerator()

class Table extends Eventer implements TableInterface{
    id: string;
    type: tableType;
    name: string;
    players: number;
    maxPlayers: number;
    private timer: any;

    constructor(){
        super()
        this.id = hashGenerator.getNewHash()
        this.maxPlayers = hashGenerator.getMaxPlayer()
        this.name = hashGenerator.getName()
        this.init()
        this.timer = setInterval(() => {
            this.emit('change', this)
        }, hashGenerator.getTimeUpdate())
    }

    init(): Table{
        this.type = hashGenerator.getType()
        this.players = hashGenerator.getPlayers(this.maxPlayers)
        return this
    }

    destroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }


    on(name: string, cb: Function ){

    }
}

export class Room{
    public userList: Array<User> = [];
    public tableList: Table[] = [];
    public timer: any

    constructor(){
        for(let i = 0; i<tableListCont; i++){
            const table = new Table();
            table.on('change', (t)=>{
                this.emitChangeTable(t)
            })
            this.tableList.push()
        }

    }

    emitChangeTable(table: Table){

    }


    start(){

    }

    stop(){

    }

    registerUser(user: User): Room{
        this.userList.push(user)
        return this
    }

    unRegisterUser(user: User): Room{
        const index = this.userList.findIndex(u => user.id == u.id)
        if(index != -1){
            this.userList.splice(index, 1);
        }
        return this
    }

    getTable(id: string){
        return this.tableList.find(it => it.id === id)
    }

}
