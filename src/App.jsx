import { useEffect, useState } from "react"
import socket from "./socket/socket"
import useAlertDialog from "./hooks/alert"
import GameRoomFlow from "./components/game"
import Game from "./components/gameWorkspace"
export default function App() {
  const [status, setStatus] = useState("connecting")
  const [uname, setUname] = useState("");
  const {AlertDialog, showAlert} = useAlertDialog()
  const [roomData, setRoomData] = useState(null);
  useEffect(() => {
    // 1. CONNECTION STATUS
    socket.on("connect", () => {
      //console.log("Connected:", socket.id)
      setStatus("connected")
    })

    socket.on("disconnect", () => {
      //console.log("Disconnected")
      setStatus("disconnected")
    })

    

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    
    }
  }, [])
    

  return (
    <div>
      <AlertDialog/>
      {
        status === "connected" ? (
          <GameRoomFlow showAlert={showAlert} socket={socket} onStart={(roomData, username)=>{
            setUname(username)
            setRoomData(roomData);
            setStatus("started")
            //console.log(roomData, username);
          }}/>
        ): status === "started" ? (
          <Game roomData={roomData} username={uname} socket={socket} status={status} />
        ):"connected"
      }
      
        
      
    </div>
  )
}