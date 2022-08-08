const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('send-message', (payload) => {
    console.log(payload);
  });

  socket.broadcast.emit('re');
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001');
});
