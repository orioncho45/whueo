import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // useLocation hooks into the current URL path
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the path changes, scroll to the top-left of the screen
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs every time the 'pathname' changes

  return null; // This component doesn't need to render any HTML
}