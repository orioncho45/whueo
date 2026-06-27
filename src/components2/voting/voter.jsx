import { useState, useEffect } from "react"
import {
  Avatar,
  Box,
  Button,
  Typography,
  Fade,
  Paper
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import GameTimer from "../timer"
import { useSelector } from "react-redux"
import { getSocket } from "../../socket/test"
import RenderVotingResults from "./votingResult"
import RenderFinalReveal from "./FinalReveal"
import { green } from "@mui/material/colors"
import { GameAvatar } from "../utils/avatar"
export default function VotingScreen() {
  const roomData = useSelector(state => state.roomData.value)
  const username = useSelector(state => state.personal.value?.username)
  const socketId = useSelector(state => state.personal.value?.socketId)
  const playersObj = roomData.players
  const players = Object.values(playersObj)
  const socket = getSocket()
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [votingEnded, setVotingEnded] = useState(false)
  const [waitingResult, setWaitingResult] = useState(false)
  const [votingResults, setVotingResults] = useState(null)
  const [finalResults, setFinalResults] = useState(null)
  const [showFinalReveal, setShowFinalReveal] = useState(false)

  // Timer values (replace with actual values if needed)
  const startTime = roomData.voteStart
  const duration = roomData.settings?.votingTime || 30

  const handleVotingResults = (data) => {
    //console.log(g(data)
    setVotingResults(data.voteResults)
    setWaitingResult(false)
    setVotingEnded(true)
  }
  const handleResults = (data) => {
    setFinalResults(data.results)
    // Delay the dramatic reveal
    //console.log(g(data)
    setTimeout(() => {
      setShowFinalReveal(true)
    }, 2000)
  }

  // Listen for results event (final outcome)
  useEffect(() => {
    socket.on("result", handleVotingResults);
    socket.on("final_result", handleResults);
    return () => {
      socket.off("result", handleVotingResults)
      socket.off("final_result", handleResults)
    }
  }, [socket])

  // Voting logic
  const handleVote = (skip=false) => {
    if (!selectedPlayer && !skip) return
    //console.log(g(skip===true ? null:selectedPlayer)
    setWaitingResult(true)
    socket.emit("vote", { vote: skip===true ? null:selectedPlayer }, (response)=>{
      //console.log(g(response)
    })
  }

  // Timer finish
  const handleFinish = () => {
    setWaitingResult(true)
    setVotingEnded(true)
  }

  // Main render logic
  if (showFinalReveal && finalResults) {
    return <RenderFinalReveal finalResults={finalResults} />
  }

  if (votingEnded && votingResults) {
    return <RenderVotingResults finalResults={finalResults} analyzing={!showFinalReveal && finalResults} votingResults={votingResults} />
  }
  


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
      {/* ================================= */}
      {/* TOP */}
      {/* ================================= */}
     
      <Box
        sx={{
          px: 3,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",

          borderBottom:
            "2px solid #2d2d33"
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          mb={2}
        >
          Voting Time
        </Typography>
        <Typography variant="h6" >Voting ends in: <GameTimer startTime={startTime} totalTime={duration} onFinish={handleFinish} /></Typography>
      </Box>

      {/* ================================= */}
      {/* PLAYER LIST */}
      {/* ================================= */}

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",

          p: 3,

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",

          gap: 2,

          alignContent: "start"
        }}
      >
        {players.map((player) => {

          const selected =
            selectedPlayer === player.socketId

          const isSelf =
            player.username === username
          const isEliminated = player.eliminated === true // Check if eliminate
          return (
            <Box
              key={player.socketId}
              onClick={() => {
                // ADDED: Prevent voting if player is eliminated
                if (votingEnded || waitingResult || isEliminated) return
                setSelectedPlayer(selected ? null : player.socketId)
              }}
              sx={{
                p: 2,
                borderRadius: 4,
                bgcolor: selected ? "brand.light" : "transparent",
                border: selected ? "2px solid green" : "1px solid #24242b",
                display: "flex",
                alignItems: "center",
                gap: 2,
                
                // ADDED: Lower visual weight if eliminated
                opacity: isEliminated ? 0.4 : 1, 
                
                // UPDATED: Cursor rule to account for elimination
                cursor: !votingEnded && !waitingResult && !isEliminated ? "pointer" : "default",
                transition: "0.2s",
                userSelect: "none",

                "&:hover": {
                  // UPDATED: No scale effect on hover if eliminated
                  transform: !votingEnded && !waitingResult && !isEliminated ? "scale(1.02)" : "none"
                }
              }}
            >
              {/* AVATAR */}
              <GameAvatar id={player.userId} />

              {/* INFO */}
              <Box>
                <Typography
                  fontWeight="bold"
                  fontSize={18}
                  color="white"
                  sx={{ textDecoration: isEliminated ? "line-through" : "none" }} // Optional: Cross out name
                >
                  {player.username}
                </Typography>

                <Typography
                  color="#aaa"
                  fontSize={14}
                >
                  {/* ADDED: Display distinct sub-label for out-of-game players */}
                  {isEliminated ? "Eliminated" : isSelf ? "You" : "Crewmate"}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* ================================= */}
      {/* BOTTOM */}
      {/* ================================= */}

      <Box
        sx={{
          p: 3,

          borderTop:
            "2px solid #2d2d33",

          display: "flex",
          justifyContent: "center"
        }}
      >
        {waitingResult ? (
          <Typography color="#90caf9" fontWeight="bold" fontSize={22}>
            Waiting for result...
          </Typography>
        ) : (
          <>
              <Button
              variant="contained"
              size="large"

              disabled={
                !selectedPlayer ||
                votingEnded || roomData.players[socketId].eliminated
              }

              onClick={handleVote}

              sx={{
                px: 6,
                py: 1.5,

                borderRadius: 999,

                fontWeight: "bold",

                fontSize: 18
              }}
            >
              {roomData.players[socketId]?.eliminated ? "You are eliminated" : "Vote"}
              
            </Button>   <Button
              variant="contained"
              size="large"

              disabled={
                votingEnded || roomData.players[socketId]?.eliminated
              }

              onClick={()=>{handleVote(true)}}

              sx={{
                px: 6,
                py: 1.5,

                borderRadius: 999,

                fontWeight: "bold",

                fontSize: 18
              }}
            >
              {roomData.players[socketId]?.eliminated ? "You are eliminated" : "Skip vote"}
              
            </Button>
          
          </> 
        )}
      </Box>
    </Box>
  )
}