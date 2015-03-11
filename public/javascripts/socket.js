var socket = io.connect();

 socket.on('chat', function (data) {
    var msg = data.nick+': '+data.message;
    $('textarea').val($('textarea').val()+msg+'\n');
});

        // Handle UI
$(function() {
// Set nickname
    $('#nick').on('click', function() {
        socket.emit('nick', $('#nickText').val());
});

// Send chat message
$('#chat').on('click', function() {
    socket.emit('chat', {
        message:$('#chatText').val()
    });
});
});