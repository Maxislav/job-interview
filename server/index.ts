
import * as socketIo from 'socket.io';


class Client{
	constructor(socket){
		this.on = socket.on

	}
}

class B {
	constructor(port: number){
		Object.setPrototypeOf(this, socketIo())
		this.on('connection', function(client){
			console.log('connect');
			new Client(client)
		});
		this.listen(port)
	}
}


export default new B(3000)
