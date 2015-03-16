var socket = io();

var sendSocketChat = function() {
    socket.emit('chat message', $('#chatText').val());
    socket.emit('name', $('#chat-container').data('username'));
    $('#chatText').val('');
    return false;
};

var reFocusScroll = function() {
    $("#chat-container")[0].scrollTop = $("#chat-container")[0].scrollHeight;
};

$('#chat').on('click', sendSocketChat);

$(document).keypress(function(e) {
    if (e.keyCode === 13) {
        sendSocketChat();
    }
});

socket.on('chat message', function(info) {
    var msg = info.handle +': '+ info.message;
    $("#chat-container").append("<p>"+msg+"</p>");
    reFocusScroll();
});

$(document).ready(function(){
    var username = $('#chat-container').data('username')
    socket.emit('user connected', username);
});

socket.on('user connected', function(username) {
    var date = new Date();
    var dateRendered = "<date>"+date.toLocaleString()+"<date>"
    var msg = username +' is connected to Salty Chat';
   $("#chat-container").append("<p>"+msg+" "+dateRendered+"</p>");
   reFocusScroll();
});

$('#logout').on('click', function(){
    var username = $('#chat-container').data('username');
    socket.emit('user logout', username);
});

socket.on('user logout', function(msg) {
    var date = new Date();
    var dateRendered = "<date>"+date.toLocaleString()+"<date>"
   $("#chat-container").append("<p>"+msg+" "+dateRendered+"</p>");
   reFocusScroll();
});