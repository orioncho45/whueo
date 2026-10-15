const DEFAULT_PARTYKIT_ORIGIN =
  process.env.NODE_ENV === "development"
    ? `ws://${window.location.hostname}:1999`
    : "https://kp.orioncho45.partykit.dev"

export const PARTYKIT_ORIGIN = (
  process.env.REACT_APP_PARTYKIT_ORIGIN || DEFAULT_PARTYKIT_ORIGIN
).replace(/\/$/, "")
