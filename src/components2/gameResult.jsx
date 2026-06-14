import { CheckCircle, HighlightOff, RestartAltOutlined } from "@mui/icons-material";
import { Box, CircularProgress, Fade, IconButton, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getSocket } from "../socket/test";
import { useState } from "react";
import { GameAvatar } from "./utils/avatar";


const GameResult = ({gameResult,showAlert})=>{
    const [loading, setLoading] = useState(false);
    
    const roomData = useSelector(state=>state.roomData.value);
    
    const socketId = useSelector(state=>state.personal.value?.socketId);

    const players = roomData.players

    const isHost = roomData.hostId === socketId

    const socket = getSocket();

    const imposters =
        gameResult.imposters
            .map(id =>
                players[id] ? ({username: players[id].username, userId: players[id].userId}) : null
            )
        
    const crewWin = gameResult.winner === "crewmates";
    const restartGame = ()=>{
        setLoading(true);
        socket.emit("restart_game", {}, (response)=>{
            if (!response.success) {
                setLoading(false);
                showAlert("error", "Something went wrong!")
            }
        })
    }
    return (

        <Fade in>

            <Box
            sx={{
                position: "fixed",
                inset: 0,

                bgcolor:
                crewWin
                    ? "#08120d"
                    : "#150909",

                display: "flex",
                flexDirection:
                "column",

                justifyContent:
                "center",

                alignItems:
                "center",

                zIndex: 99999
            }}
            >

            {/* BIG ICON */}

            {crewWin ? (

                <CheckCircle
                sx={{
                    fontSize: 160,
                    color: "#4caf50",
                    mb: 3
                }}
                />

            ) : (

                <HighlightOff
                sx={{
                    fontSize: 160,
                    color: "#f44336",
                    mb: 3
                }}
                />

            )}

            {/* WINNER */}

            <Typography
                variant="h2"
                fontWeight="bold"
                color={
                crewWin
                    ? "#4caf50"
                    : "#f44336"
                }
                sx={{
                textShadow:
                    crewWin
                    ? "0 0 40px #4caf50"
                    : "0 0 40px #f44336"
                }}
            >
                {crewWin
                ? "CREWMATES WIN"
                : "IMPOSTERS WIN"}
            </Typography>

            {/* REASON */}

            <Typography
                color="#ccc"
                mt={2}
                fontSize={24}
            >

                {
                gameResult.reason ===
                "all_imposters_eliminated"

                    ? "All imposters have been eliminated."

                    : gameResult.reason === "max_round_reached"
                        ? "Maximum rounds reached."

                        : "The imposters reached parity."
                }

            </Typography>

            {/* IMPOSTERS */}

            <Paper
                elevation={6}
                sx={{
                mt: 6,
                p: 4,

                bgcolor:
                    "#1f1f28",

                borderRadius: 4,

                minWidth: 500
                }}
            >

                <Typography
                color="#f44336"
                fontWeight="bold"
                fontSize={24}
                mb={2}
                align="center"
                >
                Imposters
                </Typography>
                <Box sx={{ display: "flex", alignItems:"center", flexWrap: "wrap", gap: 1 }}>
                    {imposters.map(imposter => imposter ? (
                        <Box
                        
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                        }}
                        >
                        <Box sx={{ position: "relative" }}>
                            {roomData.hostId === imposter.socketId && (
                            <Box
                                sx={{
                                position: "absolute",
                                top: -7,
                                left: "50%",
                                transform: "translateX(-50%)",
                                fontSize: "12px",
                                zIndex: 10,
                                }}
                            >
                                👑
                            </Box>
                            )}

                            <GameAvatar id={imposter.userId} size={30} />
                            
                        </Box>

                        <Box
                            sx={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.7)",
                            whiteSpace: "nowrap",
                            letterSpacing: "0.04em",
                            fontWeight: 500,
                            }}
                        >
                            {imposter.username}
                        </Box>
                        </Box>
                    ):"")}
                    </Box>
                {
                    isHost && (
                        <center>
                            <IconButton
                                onClick={restartGame}
                                sx={{
                                    bgcolor:
                                    "brand.light",
                                    color:
                                    "white"
                                }}
                            >

                                {loading ? <CircularProgress size={24} /> : <RestartAltOutlined />}

                            </IconButton>
                        </center>
                    )

                }

            </Paper>

            </Box>

        </Fade>

    );

    
}
export default GameResult