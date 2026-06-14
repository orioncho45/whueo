const rooms = {}

function generateRoomId() {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  let roomId = ""

  do {

    // time part
    const timePart =
      Date.now()
        .toString(36)
        .slice(-3)
        .toUpperCase()
        .replace(/[0-9]/g, () =>
          chars[
            Math.floor(
              Math.random() * 26
            )
          ]
        )

    // random part
    const randomPart =
      Array.from(
        { length: 3 },
        () =>
          chars[
            Math.floor(
              Math.random() * 26
            )
          ]
      ).join("")

    roomId =
      timePart + randomPart

  } while (rooms[roomId])

  return roomId
}
export default generateRoomId;