import { useEffect } from "react";
import AboutPage from "../pages/about"
export default function About(){
  useEffect(() => {
    document.title = "About Developer | Whueo?.io";
  }, []);
  return (
    <>
      <AboutPage />
    </>
  )
}