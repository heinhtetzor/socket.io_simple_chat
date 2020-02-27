//Make socket connection to backend
const socket = io.connect('http://localhost:3000');
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