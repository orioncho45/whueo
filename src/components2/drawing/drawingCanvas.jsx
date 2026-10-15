import { drawingPalette } from "../../theme"
import { useEffect, useRef, useState } from "react"
import {
  Box,
} from "@mui/material"

import floodFill from "./helper/floodFill"
import { drawStroke, drawAllStrokes } from "./helper/drawStroke"
import DrawingToolbar from "./drawingToolBar"
import { useSelector } from "react-redux"

const EMPTY_STROKES = []

export default function DrawingCanvas({onDrawing=()=>{}, onChunk=()=>{}, isEliminated, initialCanvas, initialStrokes=EMPTY_STROKES}) {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const loadingRef =
    useRef(false);

  const pendingStrokesRef =
    useRef([]);

  const startPos = useRef({ x: 0, y: 0 })

  const currentStroke = useRef(null)
  const pendingPoints = useRef([])

  const [tool, setTool] = useState("brush")
  const [drawing, setDrawing] = useState(false)

  const [color, setColor] = useState(drawingPalette[0])
  const [size, setSize] = useState(4)

  // read hotkeys from settings slice
  const hotkeys = useSelector((state) => state.settings?.hotkeys || {})

  useEffect(() => {
    if(isEliminated) return 
    const canvas = canvasRef.current

    canvas.width = 1200
    canvas.height = 700

    const ctx = canvas.getContext("2d")

    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctxRef.current = ctx
    //console.log(g("setup")

  }, [isEliminated])
  useEffect(() => {
    if (!initialCanvas && ctxRef.current && initialStrokes.length) {
      drawAllStrokes(initialStrokes, canvasRef, ctxRef)
    }
  }, [initialCanvas, initialStrokes])
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
  useEffect(() => {

    const interval = setInterval(() => {

      if (
        pendingPoints.current.length === 0
      ) return

      onChunk({
        tool,
        color,
        size,
        points: pendingPoints.current
      })

      pendingPoints.current = []

    }, 40)

    return () => clearInterval(interval)

  }, [tool, color, size])

  // =========================
  // HELPERS
  // =========================

  const getPos = (e) => {

    const canvas = canvasRef.current

    const rect =
      canvas.getBoundingClientRect()

    const scaleX =
      canvas.width / rect.width

    const scaleY =
      canvas.height / rect.height

    return {
      x:
        (e.clientX - rect.left)
        * scaleX,

      y:
        (e.clientY - rect.top)
        * scaleY
    }
  }

  

  

  // =========================
  // START DRAW
  // =========================
  const emitStrokes=(stroke)=>{
    onDrawing({...stroke});
   
  }

  const startDrawing = (e) => {

    const pos = getPos(e)

    startPos.current = pos

    setDrawing(true)

    currentStroke.current = {
      tool,
      color,
      size,
      points: [pos]
    }

    // FILL
    if (tool === "fill") {

      const fillStroke = {
        tool: "fill",
        color,
        x: pos.x,
        y: pos.y
      }

      emitStrokes(fillStroke)

      floodFill(
        pos.x,
        pos.y,
        color,
        canvasRef,
        ctxRef
      )

      return
    }

    // BRUSH / ERASER
    if (
      tool === "brush" ||
      tool === "eraser"
    ) {

      const ctx = ctxRef.current

      ctx.beginPath()

      ctx.moveTo(
        pos.x,
        pos.y
      )
    }
  }

  // =========================
  // DRAW MOVE
  // =========================

  const draw = (e) => {

    if (!drawing) return

    const pos = getPos(e)

    // Update current stroke and pending points
    if (
      tool === "brush" ||
      tool === "eraser"
    ) {
      currentStroke.current.points.push(pos)
      pendingPoints.current.push(pos)

      // Use drawStroke to render the current stroke segment
      drawStroke(
        {
          ...currentStroke.current,
          points: [
            currentStroke.current.points[
              currentStroke.current.points.length - 2
            ],
            pos
          ]
        },
        canvasRef,
        ctxRef
      )
    }
  }

  // =========================
  // FINISH DRAW
  // =========================

  const finishDrawing = (e) => {

    if (!drawing) return

    const pos = getPos(e)

    const start =
      startPos.current

    // LINE
    if (tool === "line") {
      currentStroke.current = {
        tool,
        color,
        size,
        start,
        end: pos
      }
      // Use drawStroke for line
      drawStroke(currentStroke.current, canvasRef, ctxRef)
    }

    // STORE STROKE
    if (tool !== "fill") {
      emitStrokes(currentStroke.current)
     
    }

    setDrawing(false)
  }

  // KEYBOARD HOTKEYS: map configured keys to tools
  useEffect(() => {
    const handler = (e) => {
      if (isEliminated) return
      if (e.defaultPrevented) return
      if (e.altKey || e.ctrlKey || e.metaKey) return
      // ignore when typing in inputs / contenteditable
      const tgt = e.target
      const tag = tgt && tgt.tagName && tgt.tagName.toLowerCase()
      if (tag === "input" || tag === "textarea" || tgt?.isContentEditable) return

      const pressed = e.key.length === 1 ? e.key.toUpperCase() : e.key

      for (const [toolName, keyVal] of Object.entries(hotkeys)) {
        if (!keyVal) continue
        if (pressed === keyVal.toUpperCase()) {
          e.preventDefault()
          setTool(toolName)
          // focus canvas so further pointer events come from it
          canvasRef.current?.focus?.()
          break
        }
      }
    }

    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [hotkeys, isEliminated])

  return (

    <Box
      display="flex"
      flexDirection="column"
      sx={
        {height: "100%"}
      }
      // gap={1}
    >
      

      <DrawingToolbar color={color} setColor={setColor} setSize={setSize} setTool={setTool} size={size} tool={tool} />

      {/* CANVAS */}
      {/* Container to enforce exact same sizing */}
      <div style={{ 
        position: "relative", 
        width: "100%", 
        height: "100%",
        minHeight: "400px" // Ensure the container has a height if parent is flexible
      }}>
        
        {isEliminated ? (
          /* Elimination Overlay Box */
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            
            // Matching your canvas design exactly
            background: "var(--whueo-hex_ffffff)",
            border: "2px solid var(--whueo-hex_333333)",
            borderRadius: "8px",
            
            // Flexbox to perfectly center the text
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10
          }}>
            <h2 style={{ 
              color: "var(--whueo-hex_dc2626)", // Eye-catching elimination red
              fontSize: "2rem", 
              fontWeight: "bold",
              margin: 0,
              fontFamily: "sans-serif",
              letterSpacing: "1px"
            }}>
              You are eliminated
            </h2>
          </div>
        ) : (
          /* Your Original Canvas */
          <canvas
            ref={canvasRef}
            tabIndex={0}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={finishDrawing}
            onPointerLeave={finishDrawing}
            onPointerCancel={finishDrawing}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              border: "2px solid var(--whueo-hex_333333)",
              background: "var(--whueo-hex_ffffff)",
              borderRadius: "8px",
              cursor: "crosshair",
              touchAction: "none"
            }}
          />
        )}

      </div>

    </Box>
  )
}
