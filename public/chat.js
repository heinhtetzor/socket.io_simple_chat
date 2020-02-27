//Make socket connection to backend
//Local settings
//const socket = io.connect('http://localhost:3000');
//const socket = io.connect('http://172.17.164.197:3000/');
//setting for heroku
//const socket = io.connect('https://glacial-falls-23683.herokuapp.com/socket.io/?EIO=3&transport=websocket');
const socket = io();
//Query DOM
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatMessage = document.getElementsByClassName('chat-message')[0];
const chatWindow = document.getElementsByClassName('chat-window')[0];
const feedback = document.getElementById('feedback');
//on press enter
message.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        send.click();
    }
})
//emit events
send.addEventListener('click', function(){
    socket.emit('chat', {
        message : message.value,
        handle : handle.value
    });
    message.value = '';
    message.focus();
})
message.addEventListener('keypress', function(){
    socket.emit('typing',
    {
        handle : handle.value
    });
})

//listen for events
socket.on('chat', function(data){
    chatWindow.innerHTML += '<span class="handle-text">'
                            +'@'+ data.handle
                            +'</span>'
                            +'<div class="chat-message">'
                            + data.message 
                            +'</div>'
    feedback.innerHTML = '';
})
socket.on('typing', function(data){
    feedback.innerHTML = data.handle + ' is typing...';
})