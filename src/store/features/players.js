import { createSlice } from "@reduxjs/toolkit";


const playersSlice = createSlice({
  name: "players",
  initialState: {
    value: {
      open: false
    }
  },
  reducers: {
    openPlayers: (state) => { 
      state.value.open = true
    },
    closePlayers: (state) => { state.value.open = false },
    togglePlayers: (state) => { state.value.open = !state.value.open }
  }
});

export const { openPlayers, closePlayers, togglePlayers } = playersSlice.actions;
export default playersSlice.reducer;
