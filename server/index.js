const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const { id } = socket;
  socket.on('send-message', (payload) => {
    console.log(`User ${id} send message:  ${payload.message}`);
    socket.broadcast.emit('receive-message', {
      forwardMessage: payload.message,
    });
  });
});

server.listen(3001, () => {
  console.log('SERVER IS RUNNING ON PORT 3001');
});
