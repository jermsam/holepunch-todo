
import socketIO from "socket.io-client";
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

export const socket = socketIO.connect("http://localhost:8080");

const dht = new DHT(new Stream(true, socket))

export const swarm = new Hyperswarm({dht});


  
  const topicBuffer = Buffer.from('we-rock-todo', 'hex')
  
  console.log('line 26: ',topicBuffer);
  swarm.join(topicBuffer)
  
  goodbye(async () => {
   
      await swarm.leave(topicBuffer)
      await swarm.destroy()
    
  })

