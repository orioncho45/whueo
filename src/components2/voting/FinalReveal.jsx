import { CheckCircle, HighlightOff, Person } from "@mui/icons-material";
import { Avatar, Box, Fade, Typography } from "@mui/material";
import { useSelector } from "react-redux"

const RenderFinalReveal = ({finalResults}) => {
    const roomData = useSelector(state=>state.roomData.value);
    const votedOutPlayer =
        finalResults.votedOut
            ? roomData.players[finalResults.votedOut]
            : null

    const wasImposter =
        finalResults.votedOut
            ? roomData.imposters.includes(
                finalResults.votedOut
            )
            : false

    return (
    <Fade in>
        <Box
        sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: wasImposter
            ? "#1a0f0f"
            : "#0f1a1a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 1s ease-in"
        }}
        >
        {finalResults.votedOut ? (
            <>
            {/* Ejected Player */}
            <Box
                sx={{
                textAlign: "center",
                mb: 6
                }}
            >
                <Avatar
                sx={{
                    width: 120,
                    height: 120,
                    bgcolor: wasImposter
                    ? "#e53935"
                    : "brand.light",
                    margin: "0 auto",
                    mb: 3,
                    border: `4px solid ${
                    wasImposter
                        ? "#ff5252"
                        : "brand.border"
                    }`
                }}
                >
                <Person
                    sx={{ fontSize: 60 }}
                />
                </Avatar>

                <Typography
                variant="h3"
                color="white"
                fontWeight="bold"
                mb={2}
                sx={{
                    textShadow: wasImposter
                    ? "0 0 20px #e53935"
                    : "0 0 20px brand.light"
                }}
                >
                {votedOutPlayer?.username ??
                    "Unknown"}
                </Typography>

                <Typography
                variant="h5"
                color={
                    wasImposter
                    ? "#e53935"
                    : "brand.light"
                }
                fontWeight="bold"
                >
                was ejected
                </Typography>

                <Typography
                color="#666"
                fontSize={18}
                mt={1}
                >
                (
                {finalResults.mostVotes}
                {" "}
                {finalResults.mostVotes === 1
                    ? "vote"
                    : "votes"}
                )
                </Typography>
            </Box>

            {/* Result */}
            <Box
                sx={{
                textAlign: "center",
                p: 4,
                borderRadius: 4,
                bgcolor: wasImposter
                    ? "#2d1111"
                    : "#112d2d",
                border: `3px solid ${
                    wasImposter
                    ? "#e53935"
                    : "green"
                }`,
                minWidth: 400
                }}
            >
                {wasImposter ? (
                <>
                    <CheckCircle
                    sx={{
                        fontSize: 80,
                        color: "#43a047",
                        mb: 2
                    }}
                    />

                    <Typography
                    variant="h4"
                    color="#43a047"
                    fontWeight="bold"
                    mb={1}
                    >
                    IMPOSTER ELIMINATED
                    </Typography>

                    <Typography
                    color="#4caf50"
                    fontSize={18}
                    >
                    One of the imposters
                    has been removed.
                    </Typography>
                </>
                ) : (
                <>
                    <HighlightOff
                    sx={{
                        fontSize: 80,
                        color: "#e53935",
                        mb: 2
                    }}
                    />

                    <Typography
                    variant="h4"
                    color="#e53935"
                    fontWeight="bold"
                    mb={1}
                    >
                    CREWMATE ELIMINATED
                    </Typography>

                    <Typography
                    color="#ff5252"
                    fontSize={18}
                    >
                    An innocent player
                    was voted out.
                    </Typography>
                </>
                )}
            </Box>
            </>
        ) : (
            <>
            {/* Tie */}
            <Box
                sx={{
                textAlign: "center"
                }}
            >
                <Typography
                variant="h3"
                color="brand.light"
                fontWeight="bold"
                mb={3}
                >
                No one was ejected
                </Typography>

                <Typography
                color="#888"
                fontSize={20}
                >
                The vote ended in a tie
                </Typography>

                <Box sx={{ mt: 4 }}>
                <HighlightOff
                    sx={{
                    fontSize: 80,
                    color: "#666"
                    }}
                />
                </Box>
            </Box>
            </>
        )}
        </Box>
    </Fade>
    )
}
export default RenderFinalReveal