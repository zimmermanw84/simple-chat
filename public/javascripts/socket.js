var socket = io();

$('#chat').on('click', function() {
    socket.emit('chat message', $('#chatText').val());
    socket.emit('name', $('#chat-container').data('username'));
    $('#chatText').val('');
    return false;
});

socket.on('chat message', function(info) {
    var msg = info.handle +': '+ info.message;
    $('textarea').val($('textarea').val()+msg+'\n');
});

$(document).ready(function(){
    var username = $('#chat-container').data('username')
    socket.emit('user connected', username);
});

socket.on('user connected', function(username) {
    var msg = username +' is connected to Salty Chat';
   $('textarea').val($('textarea').val()+msg+'\n');
});

$('#logout').on('click', function(){
    var username = $('#chat-container').data('username');
    socket.emit('user logout', username);
});

socket.on('user logout', function(msg) {
   $('textarea').val($('textarea').val()+msg+'\n');
});