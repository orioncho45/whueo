import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,

  volume: 70,

  hotkeys: {
    brush: "B",
    line: "L",
    fill: "F",
    eraser: "E",
  },
};

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    openSettings: (state) => {
      state.open = true;
    },

    closeSettings: (state) => {
      state.open = false;
    },

    setVolume: (state, action) => {
      state.volume = action.payload;
    },

    setHotkey: (state, action) => {
      const { action: tool, key } =
        action.payload;

      state.hotkeys[tool] = key;
    },

    resetHotkeys: (state) => {
      state.hotkeys = {
        brush: "B",
        line: "L",
        fill: "F",
        eraser: "E",
      };
    },
  },
});

export const {
  openSettings,
  closeSettings,
  setVolume,
  setHotkey,
  resetHotkeys,
} = settingsSlice.actions;

export default settingsSlice.reducer;