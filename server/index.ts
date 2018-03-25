import {Io} from './socket'
import {socketPort} from './constant'
import {User} from "./user";
import { Room } from './table'

const room = new Room()

new Io(socketPort)
    .on('connection', function (client) {
        new User(client, room)
    });
