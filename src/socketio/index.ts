import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { pushState } from '../actions/player-state';
import { pushBrowseLibrary } from '../actions/browse-library';
import mapServerResponse from '../data-layer/tidal/map-response';


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
        // socket.emit('browseLibrary', {"uri":"tidal://artist/5135134/74549763","prevUri":"tidal://artist/5135134"});
        log('received event: pushState');
        dispatch(pushState(state));
    });
    
    socket.on('pushBrowseLibrary', (data: any) => {
        log('received event: pushBrowseLibrary');
        const mapped = mapServerResponse(data);
        dispatch(pushBrowseLibrary(mapped));
    });

    return socket;
}

export default init;
