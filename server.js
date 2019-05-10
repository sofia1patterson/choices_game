var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator')
var path = require('path')
var session = require("express-session")
var app = express();

// const http = require('http').Server(app);

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}))

mongoose.connect('mongodb://localhost/choices_db', {useNewUrlParser: true});

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app)

var server = app.listen(8000, () => {
    console.log('started on port: 8000');
})

const io = require('socket.io').listen(server);

var messages = [];
var users = {};
io.on('connection', (socket) => {
    console.log('new connection made')

    // socket.on('gotNewUser', (data) => {
    //     console.log(data);
    //     var id = socket.id;
    //     console.log(id)
    //     users[socket.id] = { name: data.name }
    //     io.emit('user', {id: id})
    //     console.log(users);
    // })
    socket.on('message', (data) => {
        console.log('messages', data)
        io.emit('showMessages', data)
    });

    socket.on('add', (data) => {
        console.log('IN SOCKET', data)
        io.emit('show', data)
    });

    socket.on('addCountOne', (data) => {
        console.log("from server.js one", data);
        io.emit('countOne', data)
    });

    socket.on('addCountTwo', (data) => {
        console.log("from server.js two", data);
        io.emit('countTwo', data)
    });

    socket.on('showBarOne', (data, other) => {
        console.log("marvel button", data, "dc button", other);
        io.emit('barOne', data, other)
    });

    socket.on('showBarTwo', (data, other) => {
        console.log("bar two server.js", data, "bar one server.js", other);
        io.emit('barTwo', data, other)
    });
    // var countdown = 10;
    // var theTimer = setInterval(function() {
    //     countdown--;
    //     if (countdown === 0) {
    //         clearInterval(theTimer)
    //       }
    //     io.sockets.emit('timer', { countdown: countdown });
    // }, 1000);
    socket.on('showBarTwo', (data, other) => {
        console.log("bar two server.js", data, "bar one server.js", other);
        io.emit('barTwo', data, other)
    });

    socket.on('time', (data) => {
        console.log('Timer started')
        io.emit('timer', data)
    });

    socket.on('disable', (data) => {
        console.log('Disable started')
        io.emit('disBut', data)
    });
    socket.on('join', (data) => {
        console.log('Join game')
        io.emit('joinGame', data)
    });
    socket.on('choice', (data) => {
        console.log('showing certain choices')
        io.emit('oneChoice', data)
    });

});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

