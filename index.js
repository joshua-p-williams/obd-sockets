var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');
var creds = '';

var redis = require('redis');
var subscriber = '';

// Read credentials from JSON
fs.readFile('creds.json', 'utf-8', function (err, data) {
  if (err) throw err;
  creds = JSON.parse(data);
  if (creds.user) {
    subscriber = redis.createClient('redis://' + creds.user + ':' + creds.password + '@' + creds.host + ':' + creds.port);
  }
  else {
    subscriber = redis.createClient('redis://' + creds.host + ':' + creds.port);
  }

  subscriber.once('ready', function () {
    console.log('Redis subscriber ready...');

    subscriber.on("message", function(channel, message) {
      //console.log(channel);
      //console.log(message);

      var data = JSON.parse(message);
      io.emit(channel, data);
    });

    subscriber.subscribe("RPM");
  });

  subscriber.on("error", function (error) {
    console.error(error);
  });
});

var port = process.env.PORT || 8080;

// Start the Server
http.listen(port, function () {
  console.log('Server Started. Listening on *:' + port);
});

// Express Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Render Main HTML file
app.get('/', function (req, res) {
  res.sendFile('views/index.html', {
    root: __dirname
  });
});

// API - Send + Store Message
app.post('/send_message', function (req, res) {
  var message = req.body.message;
  console.log(message);
  res.send({
    'status': 'OK'
  });
});


// Socket Connection
// UI Stuff
io.on('connection', function (socket) {

  console.log('Connection to socket established');

  // Fire 'send' event for updating Message list in UI
  socket.on('message', function (data) {
    console.log('Received a socket message');
    console.log(data);
  });
});
