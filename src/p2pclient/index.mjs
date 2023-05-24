import DHT from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'
// import {SDK} from 'hyper-sdk';
import Hyperswarm from 'hyperswarm';
import goodbye from 'graceful-goodbye'

const socket = new WebSocket('ws://localhost:8080')
const dht = new DHT(new Stream(true, socket))

// or

// const sdk = await SDK.create({
//   swarmOpts: { dht }
// })

const swarm = new Hyperswarm({dht});
goodbye(() => swarm.destroy())

export default socket;
