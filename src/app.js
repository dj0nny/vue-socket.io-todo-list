const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));

const server = app.listen(5050, () =>{
  console.log('Server is up at http://localhost:5050');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Connection: ', socket.id);

  socket.on('todo', (data) => {
    io.sockets.emit('todo', data);
  });
});