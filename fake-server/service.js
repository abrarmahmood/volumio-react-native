const io = require('socket.io-client');
const socket = io.connect('http://volumio.local', {reconnect: true});

socket.on('connect', function (s) {
    console.log('Connected!');

    // socket.emit('play', null)
});

// socket.on('pushState', (...args) => {
//     console.log(args);
// });

exports.search = function(term) {
    return new Promise((resolve, reject) => {
        socket.once('pushBrowseLibrary', (data) => {
            resolve(data);
        });

        socket.emit('search', {
            type: "any",
            value: term,
            plugin_name: "streaming_services",
            plugin_type: "music_service",
            uri: "tidal://"
        });
    });
}

function makePrevURI(uri) {

}

exports.browse = function(uri, prevUri) {
    return new Promise((resolve, reject) => {
        socket.once('pushBrowseLibrary', (data) => {
            resolve(data);
        });

        socket.emit('browseLibrary', {uri, prevUri});
    });
}
