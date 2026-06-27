// FinalRevealMock.jsx
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Box, Stack, Button } from "@mui/material";
import { useState } from "react";
import RenderFinalReveal from "./FinalReveal";

const mockStore = configureStore({
  reducer: {
    roomData: () => ({
      value: {
        players: {
          p1: { username: "Orion" },
          p2: { username: "Sarah" },
          p3: { username: "Alex" },
          p4: { username: "Emma" },
          p5: { username: "Ryan" }
        },
        imposters: ["p2", "p5"]
      }
    })
  }
});

export default function FinalRevealMock() {
  const [scenario, setScenario] =
    useState("imposter");

  const mockResults = {
    imposter: {
      votedOut: "p2",
      mostVotes: 4
    },

    innocent: {
      votedOut: "p3",
      mostVotes: 3
    },

    tie: {
      votedOut: null,
      mostVotes: 2
    }
  };

  return (
    <Provider store={mockStore}>
      <Box
        sx={{
          p: 3,
          bgcolor: "#111",
          minHeight: "100vh"
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 10000
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              setScenario("imposter")
            }
          >
            Imposter
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              setScenario("innocent")
            }
          >
            Innocent
          </Button>

          <Button
            variant="contained"
            onClick={() =>
              setScenario("tie")
            }
          >
            Tie
          </Button>
        </Stack>

        <RenderFinalReveal
          finalResults={
            mockResults[scenario]
          }
        />
      </Box>
    </Provider>
  );
}