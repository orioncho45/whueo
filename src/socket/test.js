import { store } from "../store/index"
import { PARTYKIT_ORIGIN } from "../helper/partykitEndpoint"

const SESSION_KEY = "whueo.playerSession"
const ROOM_ENDPOINT = `${PARTYKIT_ORIGIN}/parties/room/`
let socket = null
let memorySession = null
let nextRequestId = 0

export function getSavedSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    return session?.roomId && session?.token ? session : memorySession
  } catch {
    return memorySession
  }
}

export function saveSession(roomId, token) {
  if (!roomId || !token) return
  memorySession = { roomId, token }
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(memorySession)) } catch {}
}

export function clearSession() {
  memorySession = null
  try { sessionStorage.removeItem(SESSION_KEY) } catch {}
}

class TestSocket {
  constructor(roomId) {
    this.roomId = roomId
    this.events = {}
    this.callbacks = new Map()
    this.closedByUser = false
    this.retryCount = 0
    this.connect()
  }

  connect() {
    this.ws = new WebSocket(`${ROOM_ENDPOINT}${this.roomId}`)
    this.ws.onopen = async (event) => {
      this.retryCount = 0
      const session = getSavedSession()
      if (session?.roomId === this.roomId) {
        try {
          const result = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error("Resume timed out")), 10000)
            this.emit("resume_session", { token: session.token }, response => {
              clearTimeout(timeout)
              resolve(response)
            })
          })
          if (result.success) {
            this.lastRestored = result
            this.dispatch("session_restored", result)
          }
          else if (result.message === "Connection lost") return
          else {
            clearSession()
            this.dispatch("session_expired", result)
          }
        } catch {
          if (this.ws.readyState !== WebSocket.OPEN) return
          this.ws.close()
          return
        }
      }
      if (this.onopen) this.onopen(event)
    }
    this.ws.onclose = (event) => {
      this.lastRestored = null
      for (const callback of this.callbacks.values()) callback({ success: false, message: "Connection lost" })
      this.callbacks.clear()
      if (this.onclose) this.onclose(event)
      if (!this.closedByUser) {
        const delay = Math.min(1000 * 2 ** this.retryCount++, 10000)
        this.retryTimer = setTimeout(() => this.connect(), delay)
      }
    }
    this.ws.onerror = event => { if (this.onerror) this.onerror(event) }
    this.ws.onmessage = message => {
      let data
      try { data = JSON.parse(message.data) } catch { return }
      if (data.type === "session_taken_over") {
        this.closedByUser = true
        clearSession()
        this.dispatch(data.type, data.payload)
        this.ws.close()
        return
      }
      if (data.requestId && data.type?.endsWith("_response")) {
        const callback = this.callbacks.get(data.requestId)
        if (callback) {
          this.callbacks.delete(data.requestId)
          callback(data)
        }
        return
      }
      this.dispatch(data.type, data.payload)
    }
  }

  dispatch(type, payload) {
    this.events[type]?.forEach(callback => callback(payload))
  }

  get readyState() { return this.ws.readyState }

  emit(type, payload = {}, callback) {
    if (this.ws.readyState !== WebSocket.OPEN) {
      if (callback) callback({ success: false, message: "Connection lost" })
      return
    }
    const { roomId, personal } = store.getState()
    const requestId = `${Date.now()}-${++nextRequestId}`
    if (callback) this.callbacks.set(requestId, callback)
    this.ws.send(JSON.stringify({
      type,
      payload: { ...payload, roomId: roomId.value, username: personal.value.username, socketId: personal.value.socketId },
      requestId
    }))
  }

  on(type, callback) {
    if (!this.events[type]) this.events[type] = new Set()
    this.events[type].add(callback)
  }

  off(type, callback) {
    if (callback) this.events[type]?.delete(callback)
    else this.events[type]?.clear()
  }

  clearAllEvents() { this.events = {} }

  close() {
    this.closedByUser = true
    clearTimeout(this.retryTimer)
    if (this.ws.readyState === WebSocket.OPEN) {
      const connection = this.ws
      const timeout = setTimeout(() => connection.close(), 1000)
      this.emit("leave_room", {}, () => {
        clearTimeout(timeout)
        connection.close()
      })
    } else this.ws.close()
  }
}

export function connectSocket(roomId, onConnect = () => {}) {
  if (socket && socket.roomId === roomId && !socket.closedByUser) {
    onConnect(socket)
    return socket
  }
  if (socket) socket.close()
  socket = new TestSocket(roomId)
  onConnect(socket)
  return socket
}

export function getSocket() { return socket }

export function closeSocket() {
  clearSession()
  if (socket) socket.close()
  socket = null
}

export { TestSocket }
