import * as socketIo from 'socket.io';
export class Io {
    constructor(public port: number){
        Object.setPrototypeOf(this, socketIo())
        this.listen(port)
    }
}

