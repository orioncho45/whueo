import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: {
    username: null,
    socketId: null,
    userId: null
  }
}

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    setPersonal: (state, action) => {
      state.value = { ...state.value, ...action.payload }
    },
    setUsername: (state, action) => {
      state.value.username = action.payload
    },
    setSocketId: (state, action) => {
      state.value.socketId = action.payload
    },
    setUserId: (state, action) => {
      state.value.userId = action.payload
    },
    clearPersonal: (state) => {
      state.value = { username: null, socketId: null, userId: null }
    }
  }
})

export const {
  setPersonal,
  setUsername,
  setSocketId,
  setUserId,
  clearPersonal
} = personalSlice.actions

export default personalSlice.reducer
