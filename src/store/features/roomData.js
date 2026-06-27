import { createSlice } from "@reduxjs/toolkit"

const roomDataSlice = createSlice({
  name: "roomData",

  initialState: {
    value: null
  },

  reducers: {
    setRoomData: (state, action) => {
      //console.log(g(action.payload)
      state.value = action.payload;
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