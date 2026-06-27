import { useState } from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Button, Stack } from "@mui/material";
import GameResult from "./gameResult";

// ---- Mock players/room state (matches your roomData.value shape) ----
const mockPlayers = {
  user1: { username: "Alice", userId: 1 },
  user2: { username: "Bob", userId: 2 },
  user3: { username: "Charlie", userId: 3 },
  user4: { username: "Dana", userId: 4 },
};

const roomDataSlice = createSlice({
  name: "roomData",
  initialState: {
    value: { hostId: "socket-1", players: mockPlayers },
  },
  reducers: {},
});

const personalSlice = createSlice({
  name: "personal",
  // set socketId === hostId to preview the host-only restart button
  initialState: { value: { socketId: "socket-1" } },
  reducers: {},
});

const mockStore = configureStore({
  reducer: {
    roomData: roomDataSlice.reducer,
    personal: personalSlice.reducer,
  },
});

// ---- Scenarios ----
const crewWin = {
  winner: "crewmates",
  reason: "all_imposters_eliminated",
  imposters: ["user2"],
};

const imposterWin = {
  winner: "imposters",
  reason: "parity_reached",
  imposters: ["user2", "user3"],
};

const maxRounds = {
  winner: "crewmates",
  reason: "max_round_reached",
  imposters: ["user2", "user3", "user4"],
};

export default function GameResultDemo() {
  const [scenario, setScenario] = useState(crewWin);

  return (
    <Provider store={mockStore}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ position: "fixed", top: 16, left: 16, zIndex: 100000 }}
      >
        <Button variant="contained" color="success" onClick={() => setScenario(crewWin)}>
          Crew Win
        </Button>
        <Button variant="contained" color="error" onClick={() => setScenario(imposterWin)}>
          Imposter Win
        </Button>
        <Button variant="contained" onClick={() => setScenario(maxRounds)}>
          Max Rounds
        </Button>
      </Stack>

      <GameResult
        gameResult={scenario}
        // showAlert={(severity, msg) => //console.log(severity, msg)}
      />
    </Provider>
  );
}