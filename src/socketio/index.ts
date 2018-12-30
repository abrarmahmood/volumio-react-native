import io from 'socket.io-client';
import { Dispatch } from 'redux';
import { pushState } from '../actions/player-state';
import { pushBrowseLibrary } from '../actions/browse-library';
import { pushQueue } from '../actions/queue';
import { pushSearchLibrary } from '../actions/search-library';


const log = (...args: any) => console.log(`socket.io client: `, ...args);

function init(host: string, dispatch: Dispatch): SocketIOClient.Socket {
    const options: SocketIOClient.ConnectOpts = {
        reconnection: true,
        transports: ['websocket'],
    };
    const socket = io.connect(host, options);

    socket.on('connect', () => {
        log('connected, emitting getState')

        // TODO: Find a better place for these
        socket.emit('getState');
        socket.emit('getQueue');
    });
    
    socket.on('error', (error: Error) => {
        log('emitted an error.');
        throw error;
    });
    
    socket.on('pushState', (state: any) => {
        log('received event: pushState');
        dispatch(pushState(state));
    });
    
    socket.on('pushBrowseLibrary', (data: any) => {
        log('received event: pushBrowseLibrary');
        if (data.navigation.isSearchResult === true) {
            dispatch(pushSearchLibrary(data));
        } else {
            dispatch(pushBrowseLibrary(data));
        }
    });
    
    socket.on('pushQueue', (data: any) => {
        log('received event: pushQueue');
        dispatch(pushQueue(data));
    });

    return socket;
}

export default init;
