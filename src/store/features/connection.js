import { createSlice } from "@reduxjs/toolkit"

const connectionSlice = createSlice({
  name: "connection",

  initialState: {
    value: "connecting"
  },

  reducers: {
    setConnection: (state, newState)=>{
        state.value = newState;
    }
  }
})

export const {
  setConnection
} = connectionSlice.actions

export default connectionSlice.reducer