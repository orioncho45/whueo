import {
  Backdrop,
  Fade,
  Typography
} from "@mui/material";

import {
  useEffect,
  useState
} from "react";
import { useSelector } from "react-redux";

export default function RoundOverlay({
  onDone = () => {}
}) {
  const {round} = useSelector(state=>state.roomData.value);
  const [visible, setVisible] =
    useState(true);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setVisible(false);

        setTimeout(() => {
          onDone();
        }, 300); // wait for fade out

      }, 1000);

    return () =>
      clearTimeout(timer);

  }, [onDone]);

  return (

    <Backdrop
      open={true}
      sx={{
        zIndex: 99999,
        bgcolor: "brand.dark",
      }}
    >

      <Fade in={visible} timeout={300}>

        <Typography
          variant="h1"
          fontWeight="bold"
          color="white"
          sx={{
            userSelect: "none",
            textShadow:
              "0 0 20px rgba(255,255,255,0.3)"
          }}
        >
          Round {Number(round)+1}
        </Typography>

      </Fade>

    </Backdrop>

  );
}