import AboutPage from "../pages/about"
import {SEO} from "@power-seo/react"
export default function About(){
  return (
    <><SEO
      title="About Orion Chowdhury"
      description="
      Learn more about Orion Chowdhury — full-stack developer,
      multiplayer systems engineer, and embedded systems enthusiast.
      Specializing in scalable web platforms, real-time multiplayer
      architecture, mobile apps, desktop software, AR/VR experiences,
      and hardware-integrated solutions.
      "

      canonical="https://whueo-8qsk.vercel.app/about"

      openGraph={{
        url: "https://whueo-8qsk.vercel.app/about",

        title:
          "About Orion Chowdhury | Full-Stack & Multiplayer Systems Developer",

        description:
          "Explore the portfolio and background of Orion Chowdhury — developer focused on multiplayer games, scalable backend systems, embedded engineering, mobile apps, and modern web experiences.",

        
        siteName: "Whueo.io",
        type: "profile"
      }}


      additionalMetaTags={[
        {
          name: "keywords",
          content: [
            "Orion Chowdhury",
            "full-stack developer",
            "multiplayer systems engineer",
            "React developer",
            "MERN stack developer",
            "real-time multiplayer architecture",
            "embedded systems engineer",
            "PCB developer",
            "web developer portfolio",
            "software engineer Bangladesh",
            "mobile app developer",
            "desktop application developer",
            "AR VR developer",
            "backend architect",
            "game systems developer"
          ].join(", ")
        },

        {
          name: "robots",
          content:
            "index, follow"
        },

        {
          name: "author",
          content:
            "Orion Chowdhury"
        },

        {
          name: "theme-color",
          content:
            "#1f3729"
        }
      ]}
    />
      <AboutPage />
    </>
  )
}