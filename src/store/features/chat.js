import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    value: {
        open: false,
        unreadCount: 0,
        messages: []
    }
  },

  reducers: {

    addMessage: (state, action) => {

      state.value.messages.push({
        id: (new Date()).getTime(),
        ...action.payload
      });

      if (!state.value.open) {
        state.value.unreadCount++;
      }

      if (state.value.messages.length > 100) {
        state.value.messages.shift();
      }
    },

    clearMessages: (state) => {
      state.value.messages = [];
      state.value.unreadCount = 0;
    },

    openChat: (state) => {
      state.value.open = true;
      state.value.unreadCount = 0;
    },

    closeChat: (state) => {
      state.value.open = false;
    }
  }
});

export const {
  addMessage,
  clearMessages,
  openChat,
  closeChat
} = chatSlice.actions;

export default chatSlice.reducer;