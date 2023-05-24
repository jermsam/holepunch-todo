
import socketIO from "socket.io-client";
import DHT from '@hyperswarm/dht-relay';
import Stream from '@hyperswarm/dht-relay/ws';
import Hyperswarm from 'hyperswarm';
import goodbye from 'graceful-goodbye';

async function createTopic (topic) {
  const prefix = 'some-app-prefix-'
  const encoder = new TextEncoder();
  const data = encoder.encode(prefix + topic);
 
  return await crypto.subtle.digest("SHA-256", data)
  // return crypto.randomBytes(32)
}

export const socket = socketIO.connect("http://localhost:8080");

const dht = new DHT(new Stream(true, socket))

const swarm = new Hyperswarm({dht});

const topic = await  createTopic('todo-list')

if(topic) {
  console.log('line 26: ',topic);
  swarm.join(topic)
}


goodbye(async () => {
  if(topic) {
    await swarm.leave(topic)
    await swarm.destroy()
  }
})

export default swarm;
