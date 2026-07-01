import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography
} from "@mui/material"

import { useEffect, useState } from "react"

// IMPORT YOUR IMAGES
import createGameBg from "../../assets/menu/create_game.jpg"
import joinGameBg from "../../assets/menu/join_room.jpg"
import publicGameBg from "../../assets/menu/join_public_room.jpg"
import useSound from "../../sounds/player"

const cards = [
  {
    title: "Create Game",
    description:
      "Create your own room and invite friends",
    action: "create_username",
    image: createGameBg
  },
  {
    title: "Join Game",
    description:
      "Join an existing room using room code",
    action: "join_room",
    image: joinGameBg
  },
  {
    title: "Public Rooms",
    description:
      "Browse and join public rooms from the list",
    action: "public_room",
    image: publicGameBg
  }
]

const preloadImages = images => {
  return Promise.all(
    images.map(src => {
      return new Promise(resolve => {
        const img = new Image()

        img.src = src

        img.onload = resolve
        img.onerror = resolve
      })
    })
  )
}

const SelectorCard = ({
  card,
  onClick
}) => {
  return (
    <Paper
      onClick={() => onClick(card.action)}
      sx={{
        position: "relative",

        width: {
          xs: "100%",
          sm: 440,
          md: 420
        },

        maxWidth: "100%",

        overflow: "hidden",

        borderRadius: "32px",

        bgcolor: "#111",

        cursor: "pointer",

        border:
          "1px solid rgba(255,255,255,0.08)",

        transition:
          "transform 0.25s ease, box-shadow 0.25s ease",

        "&:hover": {
          transform: {
            xs: "none",
            md: "translateY(-6px) scale(1.02)"
          },

          boxShadow:
            "0 18px 36px rgba(0,0,0,0.45)"
        }
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src={card.image}
        alt={card.title}
        sx={{
          display: "block",

          width: "100%",
          height: "auto",

          objectFit: "contain",

          userSelect: "none",
          pointerEvents: "none"
        }}
      />

      {/* OVERLAY */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background: `
            linear-gradient(
              rgba(0,0,0,0.45),
              rgba(0,0,0,0.65)
            )
          `
        }}
      />

      {/* CONTENT */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          zIndex: 2,

          display: "flex",
          alignItems: "center",

          px: {
            xs: 4,
            md: 5
          }
        }}
      >
        <Stack spacing={1}>
          <Typography
            sx={{
              fontSize: {
                xs: 28,
                md: 34
              },

              fontWeight: 800,

              lineHeight: 1,

              textShadow:
                "0 2px 12px rgba(0,0,0,0.45)"
            }}
          >
            {card.title}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,

              color:
                "rgba(255,255,255,0.84)",

              lineHeight: 1.5,

              maxWidth: 260,

              textShadow:
                "0 2px 8px rgba(0,0,0,0.45)"
            }}
          >
            {card.description}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  )
}
const Selector = ({
  onClick = () => {}
}) => {
  const [loaded, setLoaded] =
    useState(true)
  const playSound = useSound()
  const handleClick = (e)=>{
    playSound({type: "click"});
    onClick(e)
  }

  // useEffect(() => {
  //   preloadImages(
  //     cards.map(card => card.image)
  //   ).then(() => {
  //     setLoaded(true)
  //   })
  // }, [])

  if (!loaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress
          size={46}
          sx={{
            color: "white"
          }}
        />
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      px={2}
    //   py={2}
    >
      {/* MOBILE */}
      <Stack
        spacing={2.5}
        sx={{
          width: "100%",
          alignItems: "center",

          display: {
            xs: "flex",
            md: "none"
          }
        }}
      >
        {cards.map(card => (
          <SelectorCard
            key={card.title}
            card={card}
            onClick={handleClick}
          />
        ))}
      </Stack>

      {/* DESKTOP */}
      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex"
          },

          flexDirection: "column",
          alignItems: "center",
          gap: 3
        }}
      >
        {/* TOP TWO */}
        <Stack
          direction="row"
          spacing={3}
        >
          <SelectorCard
            card={cards[0]}
            onClick={handleClick}
          />

          <SelectorCard
            card={cards[1]}
            onClick={handleClick}
          />
        </Stack>

        {/* BOTTOM CENTER */}
        <SelectorCard
          card={cards[2]}
          onClick={handleClick}
        />
      </Box>
    </Box>
  )
}

export default Selector