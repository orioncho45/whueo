import CanvasWorkspace from "./drawing/workspace"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getSocket } from "../socket/test"

import { Box} from "@mui/material";

const Game = () => {
  const socket = getSocket();

  const roomData = useSelector(state => state.roomData.value)
  const socketId = useSelector(state => state.personal.value?.socketId)

  // Store liveChunk and finalStroke for each player
  const [liveChunk, setLiveChunk] = useState({});
  const [finalStroke, setFinalStroke] = useState({});
    // Handle live drawing chunk
  const onChunk = ({ chunk, socketId }) => {
    setLiveChunk(prev => ({ ...prev, [socketId]: chunk }));
  };

  // Handle completed stroke
  const onStroke = ({ stroke, socketId }) => {
    setFinalStroke(prev => ({ ...prev, [socketId]: stroke }));
    setLiveChunk(prev => ({ ...prev, [socketId]: null }));
  };

  // Handle user leaving
  const onUserLeft = ({ socketId }) => {
    setLiveChunk(prev => {
      const copy = { ...prev };
      if (Array.isArray(socketId)) {
        for(const sockId in socketId){
          delete copy[sockId]
        }
      } else {
        delete copy[socketId]
      }
      
      return copy;
    });
    setFinalStroke(prev => {
      const copy = { ...prev };
      if (Array.isArray(socketId)) {
        for(const sockId in socketId){
          delete copy[sockId]
        }
      } else {
        delete copy[socketId]
      }
      return copy;
    });
    
  };

  
  useEffect(() => {
    if (!socket || !roomData) return;
    socket.on("stroke_chunk", onChunk);
    socket.on("stroke_complete", onStroke);
    socket.on("user_left", onUserLeft);
    return () => {
      socket.off("stroke_chunk", onChunk);
      socket.off("stroke_complete", onStroke);
      socket.off("user_left", onUserLeft);
      
    };
  }, [socket, roomData]);

  if (!roomData) return null;
  
  console.log(roomData)
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
      >
        <CanvasWorkspace
          liveChunk={liveChunk}
          finalStroke={finalStroke}
        />
        
    </Box>
    
  );
};

export default Game;