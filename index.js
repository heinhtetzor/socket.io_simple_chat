const express = require('express');
const app = express();
const socket = require('socket.io');

app.use('/chat', (req, res) => {
    res.send('Chat Starts here');
})
app.use(express.static('public'));

const server = app.listen(process.env.PORT || 3000, () => console.log("connected"));

//socket.io setup
const io = socket(server);

io.configure(function () { 
    io.set("transports", a["xhr-polling"]); 
    io.set("polling duration", 10); 
  });
  
io.on('connection', function(socket){
    console.log("Connection has been made."+socket.id);
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    })
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
})