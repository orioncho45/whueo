import { drawingPalette } from "../../../theme"
const { default: floodFill } = require("./floodFill")

const drawStroke = (
    stroke,
    canvasRef,
    ctxRef
  ) => {

    if (!stroke) return

    const ctx =
      ctxRef.current

    /*
    =======================================
    CLEAR
    =======================================
    */

    // if (
    //   stroke.tool === "clear"
    // ) {

    //   ctx.clearRect(
    //     0,
    //     0,
    //     canvasRef.current.width,
    //     canvasRef.current.height
    //   )

    //   return
    // }

    /*
    =======================================
    FILL
    =======================================
    */

    if (
      stroke.tool === "fill"
    ) {

      floodFill(
        stroke.x,
        stroke.y,
        stroke.color,
        canvasRef,
        ctxRef
      )

      return
    }

    /*
    =======================================
    STYLES
    =======================================
    */

    ctx.strokeStyle =
      stroke.tool === "eraser"
        ? drawingPalette[1]
        : stroke.color

    ctx.lineWidth =
      stroke.size

    /*
    =======================================
    LINE
    =======================================
    */

    if (
      stroke.tool === "line"
    ) {

      ctx.beginPath()

      ctx.moveTo(
        stroke.start.x,
        stroke.start.y
      )

      ctx.lineTo(
        stroke.end.x,
        stroke.end.y
      )

      ctx.stroke()

      return
    }

    /*
    =======================================
    BRUSH / ERASER
    =======================================
    */

    if (
      stroke.tool === "brush" ||
      stroke.tool === "eraser"
    ) {

      const points =
        stroke.points

      if (
        !points ||
        points.length < 2
      ) return

      ctx.beginPath()

      ctx.moveTo(
        points[0].x,
        points[0].y
      )

      for (
        let i = 1;
        i < points.length;
        i++
      ) {

        ctx.lineTo(
          points[i].x,
          points[i].y
        )

      }

      ctx.stroke()

      return
    }
  }

  /*
  =========================================
  RESTORE ALL STROKES
  =========================================
  */

  const drawAllStrokes = (
    strokes,
    canvasRef,
    ctxRef
  ) => {

    const ctx =
      ctxRef.current

    if (!ctx) return

    ctx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )

    strokes.forEach(
      (stroke) => {
        drawStroke(stroke,canvasRef,ctxRef)
      }
    )
  }
  export { drawStroke, drawAllStrokes }