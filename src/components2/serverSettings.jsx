import { Close } from "@mui/icons-material"
import { Box, Fade, IconButton, Paper, Typography } from "@mui/material"
import BuilderForm from "./builder/builderForm"


const ServerSettings = ({settingsOpen, closeSettings = ()=>{}, showAlert = () => {}}) => {
    
    return (
        <Fade in={settingsOpen}>
            <Box
                sx={{
                position: "fixed",
                inset: 0,
                zIndex: 100000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,.55)",
                backdropFilter: "blur(6px)",
                p: 2,
                }}
            >
                <Paper
                sx={{
                    width: "100%",
                    maxWidth: 520,
                    maxHeight: "85vh",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    overflow: "hidden",
                }}
                >
                {/* Header */}
                <Box
                    sx={{
                    p: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #333",
                    }}
                >
                    <Typography fontWeight="bold">
                    Game Settings
                    </Typography>

                    <IconButton
                    onClick={closeSettings}
                    sx={{ color: "white" }}
                    >
                    <Close />
                    </IconButton>
                </Box>

                {/* Body */}
                <Box
                    sx={{
                    flex: 1,
                    overflowY: "auto",
                    p: 2,
                    }}
                >
                    <BuilderForm
                        showAlert={showAlert} changeSettings={true}
                    />
                </Box>
                </Paper>
            </Box>
            </Fade>
    )
}
export default ServerSettings