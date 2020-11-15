var fs = require( 'fs' );
var app = require('express')();
var http = require('https').createServer({
    key: fs.readFileSync('./cert/privkey.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
},app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('client_absen', (data) => {
  	console.log('client '+data);
  	io.emit('server_absen', data)
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});