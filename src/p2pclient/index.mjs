
// import socketIO from "socket.io-client";
import {WebSocket} from 'ws';
import DHT from '@hyperswarm/dht-relay';
import Stream from '@hyperswarm/dht-relay/ws';
import Hyperswarm from 'hyperswarm';
import goodbye from 'graceful-goodbye';

// async function createTopic (topic) {
//   const prefix = 'some-app-prefix-'
//   const encoder = new TextEncoder();
//   const data = encoder.encode(prefix + topic);
//
//   return await crypto.subtle.digest("SHA-256", data)
//   // return crypto.randomBytes(32)
// }
const port = 3000;
// export const socket = socketIO.connect("ws://localhost:3000");
export const socket = new WebSocket(`ws://localhost:${port}`);

// socket.on('open', () => {
//   socket.send('Hi this is client A')
// })

const dht = new DHT(new Stream(true, socket))

export const swarm = new Hyperswarm({dht});


  
  const topicBuffer = Buffer.from('we-rock-todo', 'hex')
 
  swarm.join(topicBuffer)

swarm.on('connection', (conn, peerInfo) => {
  conn.on('data', (data) => {
    // console.log(data);
    console.log({data, peerInfo});
    // todos.value = data;
  });
  
  conn.on('close', () => {
    console.log('closed connection');
  });
  
  conn.on('error', (e) => {
    console.log(e);
  });
  
});
  
  goodbye(async () => {
   
      await swarm.leave(topicBuffer)
      await swarm.destroy()
    
  })

