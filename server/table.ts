import {HashGenerator} from './utils/hash-generator'
import {tableListCont} from './constant'
import {User} from "./user";
import {Eventer} from './utils/eventer'

const hashGenerator = new HashGenerator()

class Table extends Eventer implements TableInterface{
    public id: string;
    public type: tableType;
    public name: string;
    public players: number;
    public maxPlayers: number;
    private timer: any;
    private timeUpdate: number;
    constructor(private num){
        super()
        this.id = hashGenerator.getNewHash()
        this.maxPlayers = hashGenerator.getMaxPlayer()
        this.name = hashGenerator.getName()
        this.init()
        this.timeUpdate = hashGenerator.getTimeUpdate(num*100)
        console.log('update time',this.timeUpdate )
        this.timer = setInterval(() => {
            this.update();
            console.log('emit ->',this.name)
            this.emit('change', this)
        }, this.timeUpdate)
    }

    init(): Table{
        this.type = hashGenerator.getType()
        this.players = hashGenerator.getPlayers(this.maxPlayers)
        return this
    }

    update(){
        return this.init()
    }

    destroy(){
        if(this.timer){
            clearInterval(this.timer)
        }
    }

    toData(): TableInterface{
        return ({
            id: this.id,
            name: this.name,
            players: this.players,
            type: this.type,
            maxPlayers: this.maxPlayers,
        })
    }



}

export class Room{
    public userList: Array<User> = [];
    public tableList: Table[] = [];
    public timer: any
    constructor(){
        for(let i = 0; i<tableListCont; i++){
            const table = new Table(i);
            table.on('change', (t)=>{
                this.emitChangeTable(t)
            });
            this.tableList.push(table)
        }
    }

    private emitChangeTable(table: Table){
        this.userList.forEach(user => {
            user.onChangeTable(table.toData())
        })
    }

    public getTableListData(): TableInterface[]{
        return this.tableList.map(t=>t.toData())
    }



    start(){

    }

    stop(){

    }

    registerUser(user: User): Room{
        this.userList.push(user)
        return this
    }

    sendTableList(user: User): Room{

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

