import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import DHT from 'hyperdht';
import {relay} from '@hyperswarm/dht-relay';
import Stream from '@hyperswarm/dht-relay/ws';
import cors from 'cors';

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "*"}});
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const port = 3000;
const dht = new DHT();

let todoList = [];
io.on('connection', async (socket) => {
 
  await relay(dht, new Stream(false, socket));
  
  socket.on('addTodo', (todo) => {
    console.log('received: %s', todo);
    //👇🏻 Adds the to-do object to the list of to-dos
    todoList.unshift(todo);
    //👇🏻 Sends all the to-dos to the Qwik app
    socket.send(todoList);
  });
  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});
server.listen(port, () => {
  console.log('listening on *:'+ port);
});









