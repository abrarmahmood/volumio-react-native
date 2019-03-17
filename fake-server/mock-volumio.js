const fs = require('fs');
const path = require('path');
const io = require('socket.io')({ serveClient: false });
const server = require('http').createServer();

io.attach(server, { pingInterval: 10000, pingTimeout: 5000, cookie: false });
server.listen(8080, (err) => {
    if (err) throw err;

    console.log('server listening on port 8080')
});

const data = {
    artists: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'push-browse-library-artists.json'))),
    albums: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'push-browse-library-albums.json'))),
    tracks: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'push-browse-library-tracks.json'))),
    queue: JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'push-queue.json'))),
    playerState: {},
}

io.on('connection', (socket) => {
    data.playerState = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'push-state.json')));
    console.log('connected, refreshing player state');

    handleGetState(socket);
    handleGetQueue(socket);
    handleSearch(socket);
    handleBrowseLibrary(socket);
    handleAddPlay(socket);
});

const handleGetState = socket => {
    socket.on('getState', () => {
        console.log('Received event getState');
        socket.emit('pushState', data.playerState);
    });
}

const handleGetQueue = socket => {
    socket.on('getQueue', () => {
        console.log('Received event getQueue');
        socket.emit('pushQueue', data.queue);
    });
}

const handleSearch = socket => {
    socket.on('search', () => {
        console.log('Received event search');
        socket.emit('pushBrowseLibrary', data.artists);
    });
}

const handleBrowseLibrary = socket => {
    socket.on('browseLibrary', ({ uri }) => {
        console.log('Received event browseLibrary');
        if (uri === 'tidal://artist/59') {
            // send album list
            socket.emit('pushBrowseLibrary', data.albums);
        } else {
            // send track list
            socket.emit('pushBrowseLibrary', data.tracks);
        }
    });
}

const handleAddPlay = socket => {
    socket.on('addPlay', (data) => {
        console.log('Received event addPlay', data);
        data.playerState = Object.assign({}, data.playerState, data);
        socket.emit('pushState', data.playerState);
    });
}
