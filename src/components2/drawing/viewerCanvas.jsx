import { drawingPalette } from "../../theme"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef
} from "react";

import { drawStroke, drawAllStrokes } from "./helper/drawStroke";

const EMPTY_STROKES = [];

const ViewerCanvas = forwardRef(({
  initialCanvas = null,
  liveChunk,
  finalStroke,
  initialStrokes = EMPTY_STROKES,
  onClick = () => {},
  isEliminated = false
}, ref) => {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const loadingRef =
    useRef(false);

  const pendingStrokesRef =
    useRef([]);

  /*
  =========================================
  INIT
  =========================================
  */

  useEffect(() => {

    const canvas =
      canvasRef.current;

    canvas.width = 1200;
    canvas.height = 700;

    const ctx =
      canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;

  }, []);
  useEffect(() => {
    if (!initialCanvas && ctxRef.current && initialStrokes.length) {
      drawAllStrokes(initialStrokes, canvasRef, ctxRef);
    }
  }, [initialCanvas, initialStrokes]);

  /*
  =========================================
  LOAD SNAPSHOT
  =========================================
  */

  useEffect(() => {

    if (
      !initialCanvas ||
      !ctxRef.current
    ) {
      return;
    }

    loadingRef.current = true;

    const img =
      new Image();

    img.onload = () => {

      const ctx =
        ctxRef.current;

      ctx.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      ctx.drawImage(
        img,
        0,
        0,
        1200,
        700
      );

      /*
      ===============================
      REPLAY PENDING STROKES
      ===============================
      */

      pendingStrokesRef.current
        .forEach(stroke => {

          drawStroke(
            stroke,
            canvasRef,
            ctxRef
          );

        });

      pendingStrokesRef.current =
        [];

      loadingRef.current =
        false;
    };

    img.src =
      initialCanvas;

  }, [initialCanvas]);

  /*
  =========================================
  FINAL STROKE
  =========================================
  */

  useEffect(() => {

    if (
      !ctxRef.current ||
      !finalStroke
    ) {
      return;
    }

    /*
    ===============================
    IMAGE STILL LOADING
    ===============================
    */

    if (
      loadingRef.current
    ) {

      pendingStrokesRef.current
        .push(finalStroke);

      return;
    }

    drawStroke(
      finalStroke,
      canvasRef,
      ctxRef
    );

  }, [finalStroke]);

  /*
  =========================================
  LIVE CHUNK
  =========================================
  */

  useEffect(() => {

    if (
      !ctxRef.current ||
      !liveChunk
    ) {
      return;
    }

    const ctx =
      ctxRef.current;

    ctx.save();

    ctx.strokeStyle =
      liveChunk.tool === "eraser"
        ? drawingPalette[1]
        : liveChunk.color;

    ctx.lineWidth =
      liveChunk.size;

    const points =
      liveChunk.points;

    if (
      !points ||
      points.length < 2
    ) {

      ctx.restore();

      return;
    }

    ctx.beginPath();

    ctx.moveTo(
      points[0].x,
      points[0].y
    );

    for (
      let i = 1;
      i < points.length;
      i++
    ) {

      ctx.lineTo(
        points[i].x,
        points[i].y
      );

    }

    ctx.stroke();

    ctx.restore();

  }, [liveChunk]);
  useImperativeHandle(ref, ()=>({
    click: () => canvasRef.current?.click()
  }));

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        onClick={(e) => {
          e?.preventDefault?.();
          if (isEliminated) {
            return;
          }
          onClick(
            canvasRef.current.toDataURL(
              "image/png"
            )
          );
        }}
        style={{
          border: "2px solid var(--whueo-hex_333333)",
          background: "var(--whueo-hex_ffffff)",
          borderRadius: "8px",
          width: "100%",
          height: "100%"
        }}
      />
      {isEliminated && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--whueo-rgba_0_0_0_0p55)",
          color: "var(--whueo-hex_ffffff)",
          fontSize: 16,
          fontWeight: 700,
          borderRadius: 8,
          pointerEvents: "none"
        }}>
          Eliminated
        </div>
      )}
    </div>
  );
})
export default ViewerCanvas
