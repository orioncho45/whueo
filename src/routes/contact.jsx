import ContactPage from "../pages/contact"
import {SEO} from "@power-seo/react"

export default function Contact(){
  return (
    <><SEO
      title="Contact Developer"
      description="
      Get in touch with Orion Chowdhury — full-stack developer and
      multiplayer systems engineer. Reach out for collaborations,
      projects, partnerships, or inquiries about web development,
      mobile apps, embedded systems, and AR/VR experiences.
      "

      canonical="https://whueo-8qsk.vercel.app/contact"

      openGraph={{
        url: "https://whueo-8qsk.vercel.app/contact",

        title:
          "Contact Orion Chowdhury | Full-Stack Developer & Systems Engineer",

        description:
          "Connect with Orion Chowdhury for project inquiries, collaboration opportunities, and technical consultations on full-stack development, multiplayer systems, and embedded engineering.",

        siteName: "Whueo.io",
        type: "website"
      }}

      additionalMetaTags={[
        {
          name: "keywords",
          content: [
            "contact Orion Chowdhury",
            "hire full-stack developer",
            "multiplayer systems engineer",
            "web development consultation",
            "mobile app developer contact",
            "embedded systems engineer",
            "PCB design consultation",
            "AR VR developer",
            "backend architect consultation",
            "software engineer Bangladesh",
            "technical partnership"
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
      <ContactPage />
    </>
  )
}
