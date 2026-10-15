import { createSlice } from "@reduxjs/toolkit"

const roomDataSlice = createSlice({
  name: "roomData",

  initialState: {
    value: null
  },

  reducers: {
    setRoomData: (state, action) => {
      const next = action.payload
      if (next && state.value && next.round === state.value.round) {
        state.value = {
          ...next,
          word: next.word || state.value.word,
          imposters: next.imposters?.length ? next.imposters : state.value.imposters,
          drawings: next.drawings || state.value.drawings
        }
      } else state.value = next
    },
    removePlayer: (state, action) => {
      if (state.value && state.value.players) {
        delete state.value.players[action.payload]
      }
    },
    voteStart: (state) => {
      state.value.state = "vote"
    },
    selectWord: (state,data)=>{
      state.value.word = data.payload
      
    }
  }
})

export const {
  setRoomData,
  removePlayer,
  voteStart,
  selectWord
} = roomDataSlice.actions

export default roomDataSlice.reducer
