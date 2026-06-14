import { configureStore } from "@reduxjs/toolkit"
import connectionReducer from "./features/connection"
import roomIdReducer from "./features/roomId"
import roomDataReducer from "./features/roomData"
import chatReducer from "./features/chat"
import playersReducer from "./features/players" // added
import personalReducer from "./features/personal" // NEW
import setiingsReducer from "./features/settings"
export const store = configureStore({
  reducer: {
    connection: connectionReducer,
    roomId: roomIdReducer,
    roomData: roomDataReducer,
    personal: personalReducer, // merged personal state
    chat: chatReducer,
    players: playersReducer, // added
    settings: setiingsReducer
  }
})
