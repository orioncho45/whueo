import { createSlice } from "@reduxjs/toolkit"

const roomIdSlice = createSlice({
  name: "roomId",

  initialState: {
    value: null
  },

  reducers: {
    setRoomId: (state, newState)=>{
        state.value = newState.payload;
    }
  }
})

export const {
  setConnection
} = roomIdSlice.actions

export default roomIdSlice.reducer