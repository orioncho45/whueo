import { HighlightOff, HowToVote } from "@mui/icons-material";
import { Box, Fade, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux"
import { GameAvatar } from "../utils/avatar";

const RenderVotingResults = ({votingResults, analyzing, finalResults}) => {
    const roomData = useSelector(state=>state.roomData.value);
    const players = Object.values(roomData.players);
    const getVotersFor = (targetId) => {
        if (!votingResults) return []
        return players.filter(p => votingResults[p.socketId] === targetId)
    }    
    
    return (
      <Fade in>
        <Box
          sx={{

            minHeight: "100%",
            bgcolor: "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4
          }}
        >
          <Typography variant="h4" color="white" fontWeight="bold" mb={4}>
            Voting Results
          </Typography>
          
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            {players.map((player) => {
              const voters = getVotersFor(player.socketId)
              const isVotedOut = finalResults && finalResults.votedOut === player.socketId
              
              return (
                <Paper
                  key={player.socketId}
                  elevation={3}
                  sx={{
                    bgcolor: "transparent",
                    borderRadius: 3,
                    border: isVotedOut
                      ? "3px solid #e53935"
                      : "2px solid #2f2f38",
                    overflow: "hidden",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Main player row */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      columnGap: 2,
                      bgcolor: isVotedOut ? "#2d1f1f" : "transparent"
                    }}
                  >
                    <GameAvatar size={36} id={player.userId} ></GameAvatar>
                    <Typography color="white" fontWeight="bold" fontSize={18} sx={{ flex: 1 }}>
                      {player.username}
                    </Typography>
                    <Box
                      sx={{
                        bgcolor: isVotedOut ? "#e53935" : "brand.light",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                      }}
                    >
                      <HowToVote sx={{ fontSize: 20 }} />
                      <Typography fontWeight="bold" color="white">
                        {voters.length} {voters.length === 1 ? 'vote' : 'votes'}
                      </Typography>
                    </Box>
                    {isVotedOut && (
                      <HighlightOff sx={{ color: "#e53935", ml: 2, fontSize: 32 }} />
                    )}
                  </Box>

                  {/* Voters list */}
                  {voters.length > 0 && (
                    <Box
                      sx={{
                        borderTop: "1px solid #2f2f38",
                        bgcolor: "transparent",
                        p: 2
                      }}
                    >
                      <Typography color="#888" fontSize={12} mb={1}>
                        VOTED BY:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {voters.map(voter => (
                          <Box
                            
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Box sx={{ position: "relative" }}>
                              {roomData.hostId === voter.socketId && (
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

                                <GameAvatar id={voter.userId} size={30} />
                              
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
                              {voter.username}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              )
            })}
          </Box>

          {analyzing && (
            <Typography color="#888" fontWeight="bold" fontSize={16} mt={4}>
              Analyzing results...
            </Typography>
          )}
        </Box>
      </Fade>
    )
}
export default RenderVotingResults