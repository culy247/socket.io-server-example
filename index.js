const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const cors = require('cors')

app.use(cors());

app.get('/', (req, res) => {
  res.json({msg: 'Hi'});
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    console.log('Received:', msg)
    io.emit('message', msg)
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
