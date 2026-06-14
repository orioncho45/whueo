import { useParams, useOutletContext } from "react-router-dom"

import GameRoomFlow from "./components2/game"
import Game from "./components2/gameWorkspace"
import { useSelector } from "react-redux"
import GameLobby from "./components2/lobby"
import VotingScreen from "./components2/voting/voter"

export default function AppContent({room=false}) {
  const { showAlert } = useOutletContext()
  const roomData = useSelector(state=>state.roomData.value);
  const { roomId } = useParams()

  return (
    
    
          roomData?.state === null ||
          roomData?.state === undefined ||
          roomData?.state === "build" ? (
            <GameRoomFlow showAlert={showAlert} join_code={room?roomId:null} />
          ) : roomData.state==="started" ? (
            <Game showAlert={showAlert} />
          ) : roomData.state === "lobby" ? (
            <GameLobby showAlert={showAlert} />
          ) : roomData.state === "vote" ? (
            <VotingScreen/>
          ) : ""
          
  )
}
