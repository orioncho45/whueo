import { useEffect } from "react";
import ContactPage from "../pages/contact"

export default function Contact(){
  useEffect(() => {
    document.title = "Contact Us | Whueo?.io";
  }, []);
  return (
    <>
      <ContactPage />
    </>
  )
}
