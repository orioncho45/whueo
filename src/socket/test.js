import {store} from "../store/index"

let socket = null;
// let connectAttempt= null
class TestSocket {

  constructor(url) {
    
    this.ws = new WebSocket(url)

    this.events = {}

    this.callbacks = new Map()

    // =====================================
    // PROXY NATIVE EVENTS
    // =====================================

    this.ws.onopen = (e) => {
      if (this.onopen) {
        this.onopen(e)
      }
    }

    this.ws.onclose = (e) => {
      // this.ws.close()
      if (this.onclose) {
        this.onclose(e)
      }
    }

    this.ws.onerror = (e) => {
      // this.ws.close();
      if (this.onerror) {
        this.onerror(e)
      }
    }

    // =====================================
    // MESSAGE
    // =====================================

    this.ws.onmessage = (msg) => {

      const data = JSON.parse(msg.data)

      // callback response
      if (
        data.requestId &&
        data.type?.endsWith("_response")
      ) {

        const cb =
          this.callbacks.get(data.requestId)

        if (cb) {

          cb(data)

          this.callbacks.delete(
            data.requestId
          )
        }

        return
      }

      // normal events
      const handlerSet = this.events[data.type];

      if (handlerSet) {
        handlerSet.forEach(cb => cb(data.payload));
      }
    }
  }

  // =====================================
  // READY STATE
  // =====================================

  get readyState() {
    return this.ws.readyState
  }

  // =====================================
  // EMIT
  // =====================================
  clearAllEvents() {
  this.events = {}
}
  emit(type, payload = {}, callback) {
    const {roomId, personal} = store.getState()
    const {username, socketId} = personal.value
    if (
      this.ws.readyState !== WebSocket.OPEN
    ) {
      console.error(
        "WebSocket not open"
      )
      return
    }

    const requestId =
      (new Date()).getTime()

    if (callback) {
      this.callbacks.set(
        requestId,
        callback
      )
    }

    this.ws.send(JSON.stringify({
      type,
      payload: {...payload, roomId: roomId.value, username, socketId},
      requestId
    }))
  }

  // =====================================
  // EVENTS
  // =====================================

  on(type, cb) {
    if (!this.events[type]) {
      this.events[type] = new Set();
    }
    this.events[type].add(cb);
  }

  off(type, cb) {
    if (!this.events[type]) return;

    if (cb) {
      this.events[type].delete(cb);
    } else {
      this.events[type].clear();
    }
  }

  // =====================================
  // CLOSE
  // =====================================

  close() {
    this.ws.close()
  }
}

const connectSocket = (roomId, onConnect) => {
  socket = new TestSocket(
    `https://kp.orioncho45.partykit.dev/parties/room/${roomId}`
  )
  // socket = new TestSocket(
  //   `ws://192.168.68.103:1999/parties/room/${roomId}`
  // )
  console.log(getSocket())
  onConnect(socket);
}

const getSocket = ()=>{
  return socket;
}
const closeSocket = () => {
  if (socket) {
      socket.close();
    socket =null;  
  }
  
}

export {TestSocket, connectSocket, getSocket, closeSocket}