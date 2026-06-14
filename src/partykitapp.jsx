// import { useRef, useState } from "react"
// import {TestSocket as PartySocket} from "./socket/test"
// import generateRoomId from "./uniqueId"

// export default function App() {

//   const socketRef = useRef(null)

//   const [roomId, setRoomId] = useState("")
//   const [status, setStatus] = useState("idle")
//   const [log, setLog] = useState([])

//   const addLog = (msg) => {
//     setLog((prev) => [...prev, msg])
//   }

//   // =========================================
//   // CONNECT SOCKET
//   // =========================================
//   const connectSocket = (id, onOpen = () => {}) => {

//     setStatus("connecting")

//     const socket = new PartySocket(
//       `ws://192.168.68.100:1999/parties/room/${id}`
//     )

//     socketRef.current = socket

//      // =====================================
//   // OPEN
//   // =====================================
//   socket.onopen = () => {

//     console.log("OPENED")

//     setStatus("connected")

//     addLog(`connected -> ${id}`)

//     onOpen(socket)
//   }

//   // =====================================
//   // CLOSE
//   // =====================================
//   socket.onclose = () => {

//     setStatus("closed")

//     addLog("socket closed")
//   }

//   // =====================================
//   // ERROR
//   // =====================================
//   socket.onerror = (err) => {

//     console.log(err)

//     addLog("socket error")
//   }

//     // =========================================
//     // GAME EVENTS
//     // =========================================

//     socket.on("user_joined", (d) => {
//       addLog(
//         "user_joined -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("players_update", (d) => {
//       addLog(
//         "players_update -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("stroke_chunk", (d) => {
//       addLog(
//         "stroke_chunk -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("stroke_complete", (d) => {
//       addLog(
//         "stroke_complete -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("start_room", (d) => {
//       addLog(
//         "start_room -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("vote_start", (d) => {
//       addLog(
//         "vote_start -> " +
//         JSON.stringify(d)
//       )
//     })

//     socket.on("clear_canvas", () => {
//       addLog("clear_canvas")
//     })
//   }

//   // =========================================
//   // CREATE GAME
//   // =========================================
//   const createGame = () => {

//     const id = generateRoomId()

//     setRoomId(id)

//     connectSocket(id, (socket) => {

//       // SAFE:
//       // socket already OPEN here

//       socket.emit(
//         "create_game",
//         {
//           username: "host",
//           maxMembers: 10,
//           hiddenCanvas: null,
//           votingTime: 60,
//           wordSelection: "random"
//         },
//         (res) => {

//           addLog(
//             "create_game_response -> " +
//             JSON.stringify(res)
//           )
//         }
//       )
//     })
//   }

//   // =========================================
//   // EMIT WRAPPER
//   // =========================================
//   const emit = (type, payload = {}) => {

//     const socket = socketRef.current

//     if (!socket) {
//       addLog("socket missing")
//       return
//     }

//     if (socket.readyState !== WebSocket.OPEN) {
//       addLog("socket not open")
//       return
//     }

//     socket.emit(
//       type,
//       payload,
//       (res) => {

//         addLog(
//           `${type}_response -> ` +
//           JSON.stringify(res)
//         )
//       }
//     )
//   }

//   return (
//     <div style={{ padding: 20 }}>

//       <h2>🎈 PartyKit Test</h2>

//       <p>
//         Room: {roomId || "none"}
//       </p>

//       <p>
//         Status: {status}
//       </p>

//       {/* CREATE */}
//       <button onClick={createGame}>
//         Create Room
//       </button>

//       {/* JOIN */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("join_room", {
//             username: "player1"
//           })
//         }
//       >
//         Join Room
//       </button>

//       {/* START */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("start_room")
//         }
//       >
//         Start Room
//       </button>

//       {/* VOTE */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("vote_start")
//         }
//       >
//         Vote Start
//       </button>

//       {/* STROKE */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("stroke_chunk", {
//             chunk: {
//               x: 10,
//               y: 20
//             }
//           })
//         }
//       >
//         Stroke Chunk
//       </button>

//       {/* COMPLETE */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("stroke_complete", {
//             stroke: {
//               points: [
//                 { x: 1, y: 1 },
//                 { x: 2, y: 2 }
//               ],
//               color: "red",
//               size: 5
//             }
//           })
//         }
//       >
//         Stroke Complete
//       </button>

//       {/* CLEAR */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("clear_canvas")
//         }
//       >
//         Clear Canvas
//       </button>

//       {/* GET ROOM */}
//       <button
//         disabled={!roomId}
//         onClick={() =>
//           emit("get_room")
//         }
//       >
//         Get Room
//       </button>

//       {/* LOG */}
//       <pre
//         style={{
//           marginTop: 20,
//           background: "#111",
//           color: "#0f0",
//           padding: 10,
//           height: 400,
//           overflow: "auto"
//         }}
//       >
//         {log.join("\n")}
//       </pre>

//     </div>
//   )
// }

import { useEffect, useState } from "react"
import {
  connectSocket,
  getSocket
} from "./socket/test"

export default function StateTest() {

  const [socket, setSocket] =
    useState(null)

  const [response, setResponse] =
    useState(null)

  useEffect(() => {

    connectSocket(
      "TESTROOM",
      (sock) => {

        setSocket(sock)

        sock.onopen = () => {
          console.log(
            "connected"
          )
        }

      }
    )

  }, [])

  const createData = () => {
    console.log("hey")
    if (!socket) return
    console.log("hey2")
    socket.emit(
      "create",
      {requestId:(new Date()).getTime()},
      (res) => {
        console.log(res)
        setResponse(res)
      }
    )

  }

  const readData = () => {

    if (!socket) return

    socket.emit(
      "join",
      {requestId:(new Date()).getTime()},
      (res) => {
        console.log("H")
        setResponse(res)
      }
    )

  }

  return (

    <div>

      <button
        disabled={!socket}
        onClick={createData}
      >
        Create Data
      </button>

      <button
        disabled={!socket}
        onClick={readData}
      >
        Read Data
      </button>

      <pre>
        {
          JSON.stringify(
            response,
            null,
            2
          )
        }
      </pre>

    </div>

  )
}