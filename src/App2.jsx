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
import LandingPage from "./pages/landing"
import SiteLayout from "./routes/siteLayout"
import PrivacyPolicy from "./routes/privacy"
import Terms from "./routes/terms"
import Contact from "./routes/contact"
import ScrollToTop from "./components2/utils/scrollToTop"
import useSound from "./sounds/player"
import { useEffect } from "react"
import LaunchingSoonHero from "./pages/launching"

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
      
     {/* <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
      </BrowserRouter> */}
      <LaunchingSoonHero/>
    </ThemeProvider>
  )
}