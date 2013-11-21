$(document).ready(function() {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function() {};

    updater.start();
});

var updater = {
    socket: null,

    start: function() {
        var url = "ws://" + location.host + "/chatsocket";
        updater.socket = new WebSocket(url);
        updater.socket.onmessage = function(event) {
            updater.showMessage(JSON.parse(event.data));
        }
    },

    showMessage: function(message) {
        console.log(message);
    }
};

function sendData(num) {
  //console.log($(num).find('input[name="value"]'));
  toSend = {
    index: $(num).find('td[name="index"]').text(),
    value: $(num).find('td[name="value"]').text(),
    ton: $(num).find('input[name="ton"]').val(),
    toff: $(num).find('input[name="toff"]').val(),
    count: $(num).find('input[name="count"]').val()
  }
  updater.socket.send(JSON.stringify(toSend));
  console.log('Sent '+JSON.stringify(toSend))
}
