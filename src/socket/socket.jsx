import { io } from "socket.io-client"

const socket = io("http://192.168.68.100:5000")

export default socket
// class PartySocketIO {

//   constructor(url) {
//     this.url = url
//     this.ws = null
//     this.events = {}

//     this.pendingCallbacks = new Map()

//     this.connect()
//   }

//   connect() {
//     this.ws = new WebSocket(this.url)

//     this.ws.onmessage = (event) => {
//       const data = JSON.parse(event.data)

//       const { type, requestId, ...payload } = data

//       // handle callback response
//       if (type.endsWith("_response") && requestId) {
//         const cb = this.pendingCallbacks.get(requestId)
//         if (cb) {
//           cb(payload)
//           this.pendingCallbacks.delete(requestId)
//         }
//         return
//       }

//       // handle normal events
//       const handler = this.events[type]
//       if (handler) {
//         handler(payload)
//       }
//     }
//   }

//   emit(type, payload, callback) {

//     const requestId = crypto.randomUUID()

//     if (callback) {
//       this.pendingCallbacks.set(requestId, callback)
//     }

//     this.ws.send(JSON.stringify({
//       type,
//       payload,
//       requestId: callback ? requestId : undefined
//     }))
//   }

//   on(type, handler) {
//     this.events[type] = handler
//   }

//   off(type) {
//     delete this.events[type]
//   }
// }

// const socket = new PartySocketIO(
//   "ws://192.168.68.100:5000/parties/your-room-id"
// )

// export default socket