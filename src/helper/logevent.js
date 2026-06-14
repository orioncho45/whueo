async function logEvent(data) {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbz9tV1MZi_M8WTwx02dTfSsSVEcTNYCjzoSZqxRkI1NHJpY2tmuHfXpsflL8Bh9Ozy3Ow/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    console.log(response)
  } catch (err) {
    // silent fail
    console.log("Analytics failed (ignored)")
  }
}
export default logEvent;