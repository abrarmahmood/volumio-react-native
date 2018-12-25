import io from 'socket.io-client';

const options: any = { reconnect: true, transports: ['websocket'] };
const socket = io.connect('http://192.168.1.81/', options);

socket.on('connect', (...params: any) => {
    console.log('hello')
    console.log('event: connect', params);
});

socket.on('error', (...params: any) => {
    console.log('event: error', params);
});

socket.on('pushState', (...params: any) => {
    console.log('event: pushState', params);
});

socket.emit('getState');


console.log('hello socket')
