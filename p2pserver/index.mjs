import { WebSocketServer } from 'ws'

import DHT from 'hyperdht'
import { relay } from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'

const port = 8080;
const dht = new DHT()
const server = new WebSocketServer({ port })

let todoList =[];
server.on('connection', (socket) => {
  relay(dht, new Stream(false, socket))
  
  socket.on("addTodo", (todo) => {
    console.log('received: %s', todo);
    //👇🏻 Adds the to-do object to the list of to-dos
    todoList.unshift(todo);
    //👇🏻 Sends all the to-dos to the Qwik app
    socket.send(todoList);
  });
  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
})




