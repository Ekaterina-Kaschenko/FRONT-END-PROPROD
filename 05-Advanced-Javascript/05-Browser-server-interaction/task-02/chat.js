socket = io.connect('http://localhost:8008/');

var messages = document.getElementById('messages'),
  messageText = document.getElementById('message_text'),
  nick = document.getElementById('nick'),
  messageBtn = document.getElementById('message_btn');
var message = document.getElementsByClassName('message')[0];

socket.on('connect', function () {

  socket.on('message', function (data) {
    messages.innerHTML += data.split('-=-=-=-')[0] + ' : ' + data.split('-=-=-=-')[1] + '<br />';

  });

  messageText.onkeypress = function(e) {
    if (e.which == '13') {
      socket.send(escape(document.querySelector('#input').value));
      document.querySelector('#input').value = '';
    }

      messageBtn.onclick = function () {
        var message = document.getElementsByClassName('message')[0];
        var text = nick.value + '-=-=-=-' + messageText.value;
        if (nick.value.length < 1) {
          nick.value = 'guest';
        }
        socket.send(text);
      }
  };
});


