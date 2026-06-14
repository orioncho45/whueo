import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { closeChat, addMessage } from "../store/features/chat";
import { useState } from "react";
import { getSocket } from "../socket/test";
import { Send } from "@mui/icons-material";
import { GameAvatar } from "./utils/avatar";

const MAX_CHARACTERS = 300;

export default function Chat({ inGame = false }) {
  const socket = getSocket();
  const dispatch = useDispatch();

  const { open, messages } = useSelector(
    state => state.chat.value
  );
  
  const {userId, username} = useSelector(state=>state.personal.value)

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const remainingChars =
    MAX_CHARACTERS - input.length;

  const sendMessage = () => {
    const trimmed = input.trim();

    if (!trimmed || loading) return;

    setLoading(true);

    socket.emit(
      "message",
      {
        message: trimmed,
        userId
      },
      ({ success, ...response }) => {
        dispatch(addMessage(response));
        setLoading(false);
      }
    );

    setInput("");
  };

  return (
    <>
      {open && (
        <Paper
          sx={{
            position: "fixed",
            right: 20,
            top: inGame ? 80 : 40,
            width: 350,
            height: 500,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            borderRadius: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Light opacity black
            backdropFilter: 'blur(4px)',          // Subtle glassmorphism effect
            border: '1px solid rgba(255, 255, 255, 0.1)',
            
            color: "white",

            "@media (max-width: 768px)": {
              width: 280,
              height: 400,
              right: 10,
              bottom: inGame ? 70 : 15,
              top: "auto"
            }
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #333"
            }}
          >
            <Typography fontWeight="bold">
              Chat
            </Typography>

            <IconButton
              onClick={() => dispatch(closeChat())}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* MESSAGES */}
          
          <Stack
            spacing={1}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 1.5
            }}
          >
            {messages.map(msg => (
              <Box 
                key={msg.id}
                sx={{
                  display: "flex",
  
                  alignItems: "center",
                  // textAlign:"center",
  
                  justifyContent:
                    "space-between",
  
                  gap: 1.5,
  
                  p: 1.2,
  
                  borderRadius: 2,
  
                  bgcolor:
                    "rgba(91, 126, 91, 0.03)",
  
                  border:
                    "1px solid rgba(255,255,255,0.05)"
                }}
              
              
              >
                {msg.type === "system" ? (
                  <center>
                    <Typography
                        align="center"
                        sx={{
                          textAlign:"center",
                          fontSize: 12,
                          color: "#fbbf24",
                          fontWeight: 600,
                          letterSpacing: "0.02em"
                        }}
                      >
                        {msg.message}
                      </Typography>
                  </center>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      minWidth: 0
                    }}
                  >
    
                    <GameAvatar id={msg.userId} size={42} />
    
                    <Box
                      sx={{
                        minWidth: 0,
                        flexWrap: "wrap"
                      }}
                    >
    
                      <Typography
                        noWrap
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          fontSize: 14
                        }}
                      >
                        {msg.username}
    
                        {msg.username === username &&
                          " (You)"}
    
                      </Typography>
    
                      <Typography
                        sx={{
                          color:
                            "#ffffffff",
                          fontSize: 11,
                          wordBreak: "break-word",
                          textWrap: "revert-layer"
                        }}
                        
                      >
                        {msg.message}
                      </Typography>
    
                    </Box>
    
                  </Box>
                )}
              </Box>
            ))}
          </Stack>

          {/* INPUT */}
          <Box
            sx={{
              p: 1,
              borderTop: "1px solid #333"
            }}
          >
            {/* CHARACTER COUNTER */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 0.5
              }}
            >
              <Typography
                fontSize={12}
                color={
                  remainingChars <= 20
                    ? "#f87171"
                    : "#9ca3af"
                }
              >
                {input.length}/{MAX_CHARACTERS}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1
              }}
            >
              <TextField
                fullWidth
                size="small"
                value={input}
                placeholder="Type a message..."
                onChange={e => {
                  const value = e.target.value;

                  if (
                    value.length <= MAX_CHARACTERS
                  ) {
                    setInput(value);
                  }
                }}
                onKeyDown={e => {
                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                sx={{
                  "& input": {
                    color: "white"
                  },

                  "& .MuiOutlinedInput-root": {
                    color: "white",

                    "& fieldset": {
                      borderColor: "#444"
                    },

                    "&:hover fieldset": {
                      borderColor: "#666"
                    },

                    "&.Mui-focused fieldset": {
                      borderColor: "#60a5fa"
                    }
                  }
                }}
              />

              <Button
                variant="contained"
                disabled={
                  loading || !input.trim()
                }
                onClick={sendMessage}
                sx={{
                  minWidth: 90
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={22}
                    sx={{ color: "white" }}
                  />
                ) : (
                  <Send/>
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </>
  );
}