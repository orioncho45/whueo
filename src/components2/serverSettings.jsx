import { Close } from "@mui/icons-material"
import { Box, Fade, IconButton, Paper, Typography } from "@mui/material"
import BuilderForm from "./builder/builderForm"
import { useSelector } from "react-redux"


const ServerSettings = ({settingsOpen, closeSettings = ()=>{}, showAlert = () => {}}) => {
    const roomData = useSelector(state=>state.roomData.value)
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
                bgcolor: "var(--whueo-rgba_0_0_0_p55)",
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
                    backgroundColor: "var(--whueo-rgba_0_0_0_0p4)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid var(--whueo-rgba_255_255_255_0p1)",
                    color: "var(--whueo-hex_ffffff)",
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
                    borderBottom: "1px solid var(--whueo-hex_333333)",
                    }}
                >
                    <Typography fontWeight="bold">
                    Game Settings
                    </Typography>

                    <IconButton
                    onClick={closeSettings}
                    sx={{ color: "var(--whueo-hex_ffffff)" }}
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
                        showAlert={showAlert} initialSettings={roomData?.settings} changeSettings={true} onSubmit={closeSettings}
                    />
                </Box>
                </Paper>
            </Box>
            </Fade>
    )
}
export default ServerSettings