const fs = require('fs');
const path = require('path');
const io = require('socket.io-client');
const socket = io.connect('http://volumio.local', {reconnect: true});

const writeJSON = (filename, data) => {
    const str = JSON.stringify(data, null, 2);

    fs.writeFileSync(path.join(__dirname, 'data', filename), str);
}

socket.on('connect', function (s) {
    console.log('Connected!');

    socket.emit('getState')
});

socket.on('pushState', (...args) => {
    writeJSON('push-state.json', args[0])
});
