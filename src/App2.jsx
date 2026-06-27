import { BrowserRouter, Routes, Route, useParams, useOutletContext } from "react-router-dom"

import GameRoomFlow from "./components2/game"
import Game from "./components2/gameWorkspace"
import { useSelector } from "react-redux"
import { ThemeProvider } from "@mui/material"
import GameLobby from "./components2/lobby"
import VotingScreen from "./components2/voting/voter"
import theme from "./theme"
import About from "./routes/about"
import Layout from "./routes/layout"
import NewsletterPage from "./routes/newsletter"
import NotFound from "./pages/404"
import { DefaultSEO } from "@power-seo/react"
import LandingPage from "./pages/landing"
import SiteLayout from "./routes/siteLayout"
import PrivacyPolicy from "./routes/privacy"
import Terms from "./routes/terms"
import Contact from "./routes/contact"
import ScrollToTop from "./components2/utils/scrollToTop"
import useSound from "./sounds/player"
import { useEffect } from "react"
import GameResultDemo from "./components2/gameResultMock"
import FinalRevealMock from "./components2/voting/fnalRevealMock"

function AppContent({room=false}) {
  const { showAlert, confirmAction } = useOutletContext()
  const roomData = useSelector(state=>state.roomData.value);
  const { roomId, preStep } = useParams()

  return (
    
    
          roomData?.state === null ||
          roomData?.state === undefined ||
          roomData?.state === "build" ? (
            <GameRoomFlow showAlert={showAlert} preStep={preStep} confirmAction={confirmAction} join_code={room?roomId:null} />
          ) : roomData.state==="started" ? (
            <Game showAlert={showAlert}  confirmAction={confirmAction} />
          ) : roomData.state === "lobby" ? (
            <GameLobby showAlert={showAlert} confirmAction={confirmAction} />
          ) : roomData.state === "vote" ? (
            <VotingScreen confirmAction={confirmAction} showAlert={showAlert}/>
          ) : ""
          
  )
}

export default function App() {
  const playSound = useSound();
  useEffect(() => {
    
    const handleClick = (e) => {
      const isButton = e.target.closest(
        "button, [role='button']"
      );

      if (isButton) {
        playSound({type: "click"})
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <DefaultSEO
        titleTemplate="%s | Whueo?.io"
        defaultTitle="Whueo?.io - Multiplayer Social Deduction Drawing Game"
        description="Play Whueo.io — a fast-paced multiplayer social deduction and drawing game inspired by hidden-role gameplay. Join public rooms, draw, vote, find the imposter, and play with friends online instantly."

        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://whueo-8qsk.vercel.app",
          siteName: "Whueo.io",

          title:
            "Whueo.io - Multiplayer Social Deduction Drawing Game",

          description:
            "Play online with friends in this real-time multiplayer drawing and social deduction game. Draw, discuss, vote, survive, and expose the imposter.",

          images: [
            {
              url: "https://whueo-8qsk.vercel.app/banner.png",
              width: 1200,
              height: 630,
              alt: "Whueo.io Multiplayer Game"
            }
          ]
        }}

        twitter={{
          handle: "@whueoio",
          site: "@whueoio",
          cardType: "summary_large_image"
        }}

        additionalMetaTags={[
          {
            name: "keywords",
            content:
              [
                "multiplayer game",
                "drawing game",
                "social deduction game",
                "online party game",
                "imposter game",
                "browser multiplayer",
                "real-time multiplayer game",
                "drawing and guessing game",
                "among us style game",
                "online friends game",
                "voice party game",
                "websocket game",
                "party game online",
                "guessing game",
                "multiplayer browser game",
                "pictionary",
                "skribbl",
                "skribble io",
                "among us",
                "imposter game"
              ].join(", ")
          },

          {
            name: "theme-color",
            content: "#1f3729"
          },

          {
            name: "robots",
            content:
              "index, follow, max-image-preview:large"
          },

          {
            property: "og:image:alt",
            content:
              "Whueo.io Multiplayer Drawing Game"
          }
        ]}
      />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop/>
        <Routes>

          <Route element={<SiteLayout/>} >
            <Route index element={<LandingPage/>} ></Route>
              <Route path="about" element={<About/>}/>
          <Route path="subscribe" element={<NewsletterPage />}/>
          <Route path="*" element={<NotFound/>} ></Route> 
          <Route path="privacy" element={<PrivacyPolicy/>} ></Route>
          <Route path="terms" element={<Terms/>} ></Route> 
          <Route path="contact" element={<Contact/>} ></Route> 
          </Route>
          <Route path="play" element={<Layout/>} >
            <Route  path=":preStep?" element={<AppContent/>} ></Route>
            <Route path="room/:roomId?" element={<AppContent room={true} />} />
            
            <Route path="*" element={<NotFound/>} ></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}