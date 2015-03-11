var socket = io();

$(document).ready(function() {
    socket.emit('name', $('#chat-container').data('username'));
});

$('#chat').on('click', function() {
    socket.emit('chat message', $('#chatText').val());
    $('#chatText').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#chat-container').prepend('<p>'+msg+'</p>');
});