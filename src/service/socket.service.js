import io from 'socket.io-client'
import socketUrl from '../constant/url-constant'
export const socket = io(socketUrl);
