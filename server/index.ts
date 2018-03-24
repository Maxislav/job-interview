
import * as socketIo from 'socket.io';


class B {
	constructor(port: number){
		Object.setPrototypeOf(this, socketIo())
		this.on('connection', function(client){});
		this.listen(port)
	}
}


export default new B(3000)
