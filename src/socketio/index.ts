import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { pushState } from '../actions';


const log = (...args: any) => console.log(`socket.io client: `, ...args);

function init(host: string, dispatch: Dispatch): SocketIOClient.Socket {
    const options: SocketIOClient.ConnectOpts = {
        reconnection: true,
        transports: ['websocket'],
    };
    const socket = io.connect(host, options);

    socket.on('connect', () => {
        log('connected, emitting getState')

        socket.emit('getState');
    });
    
    socket.on('error', (error: Error) => {
        log('emitted an error.');
        throw error;
    });
    
    socket.on('pushState', (state: any) => {
        log('received event: pushState');
        dispatch(pushState(state));
    });

    return socket;
}

export default init;
