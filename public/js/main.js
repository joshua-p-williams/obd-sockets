$(function () {
  var socket = io();

  socket.on('RPM', function (data) {
    var message = data.message;
    $('#rpm-message').text(message);
    console.log(data);
  });

  $('#send-message').click(function () {
      var message = $.trim($('#message').val());
      $.ajax({
          url: '/send_message',
          type: 'POST',
          dataType: 'json',
          data: {
              'message': message
          },
          success: function (response) {
              if (response.status == 'OK') {
                  socket.emit('message', {
                      'message': message
                  });
                  $('#message').val('');
              }
          }
      });
  });
});
