const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.static('public'));

const server = app.listen(port, () =>{
  console.log('Server is up at http://localhost:5050');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Connection: ', socket.id);

  socket.on('todo', (data) => {
    io.sockets.emit('todo', data);
  });

  socket.on('marked', (data) => {
    io.sockets.emit('marked', data);
  });
});