var socket = io();

var sendSocketChat = function() {
    socket.emit('chat message', $('#chatText').val());
    socket.emit('name', $('#chat-container').data('username'));
    $('#chatText').val('');
    return false;
};


$('#chat').on('click', sendSocketChat);

$(document).keypress(function(e) {
    if (e.keyCode === 13) {
        sendSocketChat();
    }
});

socket.on('chat message', function(info) {
    var msg = info.handle +': '+ info.message;
    $("#chat-container").prepend("<p>"+msg+"</p>");
});

$(document).ready(function(){
    var username = $('#chat-container').data('username')
    socket.emit('user connected', username);
});

socket.on('user connected', function(username) {
    var msg = username +' is connected to Salty Chat';
   $("#chat-container").prepend("<p>"+msg+"</p>");
});

$('#logout').on('click', function(){
    var username = $('#chat-container').data('username');
    socket.emit('user logout', username);
});

socket.on('user logout', function(msg) {
   $("#chat-container").prepend("<p>"+msg+"</p>");
});