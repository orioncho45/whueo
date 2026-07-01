const scrollToSection = (sectionId, navigate) => {
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      return
    }

    navigate("/#" + sectionId)
}
export default scrollToSection