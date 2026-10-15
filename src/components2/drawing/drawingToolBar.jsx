import { drawingPalette } from "../../theme"
import { useState } from "react"
import {
  Box,
  IconButton,
  Tooltip,
  Slider,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"

import BrushIcon from "@mui/icons-material/Brush"
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule"
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill"
import CleaningServicesIcon from "@mui/icons-material/CleaningServices"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

export default function DrawingToolbar({
  tool,
  setTool,
  color,
  setColor,
  size,
  setSize,
}) {
  const theme = useTheme()

  const mobile = useMediaQuery(
    theme.breakpoints.down("md")
  )

  const [colorAnchor, setColorAnchor] =
    useState(null)

  const [sizeAnchor, setSizeAnchor] =
    useState(null)

  const colors = drawingPalette

  const brushSizes = [
    { value: 2, preview: 4 },
    { value: 5, preview: 5 },
    { value: 10, preview: 7 },
    { value: 20, preview: 10 },
    { value: 35, preview: 13 },
    { value: 50, preview: 16 },
  ]

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      color="var(--whueo-hex_ffffff)"
      flexWrap="nowrap"
    >
      {/* BRUSH */}
      <Tooltip title="Brush">
        <IconButton
          
          sx={
            {
                bgcolor : tool === "brush" ? "brand.light" : "transparent",
                color: tool === "brush"
                    ? "primary"
                    : "brand.white"
                
            }
          }
          onClick={() => setTool("brush")}
        >
          <BrushIcon />
        </IconButton>
      </Tooltip>

      {/* LINE */}
      <Tooltip title="Line">
        <IconButton
          
          sx={
            {
                bgcolor : tool === "line" ? "brand.light" : "transparent",
                color: tool === "line"
                    ? "primary"
                    : "brand.white"
                
            }
          }
          onClick={() => setTool("line")}
        >
          <HorizontalRuleIcon />
        </IconButton>
      </Tooltip>

      {/* FILL */}
      <Tooltip title="Fill">
        <IconButton
          
          sx={
            {
                bgcolor : tool === "fill" ? "brand.light" : "transparent",
                color: tool === "fill"
                    ? "primary"
                    : "brand.white"
                
            }
          }
          onClick={() => setTool("fill")}
        >
          <FormatColorFillIcon />
        </IconButton>
      </Tooltip>

      {/* ERASER */}
      <Tooltip title="Eraser">
        <IconButton
          
          sx={
            {
                bgcolor : tool === "eraser" ? "brand.light" : "transparent",
                color: tool === "eraser"
                    ? "primary"
                    : "brand.white"
                
            }
          }
          onClick={() => setTool("eraser")}
        >
          <CleaningServicesIcon />
        </IconButton>
      </Tooltip>

      {/* DESKTOP */}
      {!mobile && (
        <>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            ml={2}
          >
            {colors.map((c) => (
              <Box
                key={c}
                onClick={() =>
                  setColor(c)
                }
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: c,
                  cursor: "pointer",
                  border:
                    color === c
                      ? "3px solid var(--whueo-hex_ffffff)"
                      : "1px solid var(--whueo-hex_888888)",
                }}
              />
            ))}
          </Box>

          <Box
            width={150}
            ml={2}
          >
            <Slider
              value={size}
              min={1}
              max={50}
              onChange={(
                e,
                value
              ) =>
                setSize(value)
              }
            />
          </Box>
        </>
      )}

      {/* MOBILE / TABLET */}
      {mobile && (
        <>
          {/* COLOR */}
          <Button
            size="small"
            variant="outlined"
            endIcon={
              <ArrowDropDownIcon />
            }
            onClick={(e) =>
              setColorAnchor(
                e.currentTarget
              )
            }
            sx={{
              minWidth: "unset",
              px: 1,
              ml: 1,
            }}
          >
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                bgcolor: color,
                border:
                  "1px solid var(--whueo-hex_999999)",
              }}
            />
          </Button>

          <Menu
            anchorEl={colorAnchor}
            open={Boolean(
              colorAnchor
            )}
            onClose={() =>
              setColorAnchor(null)
            }
          >
            <Box
              sx={{
                p: 1,
                display: "grid",
                gridTemplateColumns:
                  "repeat(5, 1fr)",
                gap: 1,
              }}
            >
              {colors.map((c) => (
                <Box
                  key={c}
                  onClick={() => {
                    setColor(c)
                    setColorAnchor(
                      null
                    )
                  }}
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius:
                      "50%",
                    bgcolor: c,
                    cursor: "pointer",
                    border:
                      color === c
                        ? "3px solid var(--whueo-hex_1976d2)"
                        : "1px solid var(--whueo-hex_888888)",
                  }}
                />
              ))}
            </Box>
          </Menu>

          {/* SIZE */}
          <Button
            size="small"
            variant="outlined"
            endIcon={
              <ArrowDropDownIcon />
            }
            onClick={(e) =>
              setSizeAnchor(
                e.currentTarget
              )
            }
            sx={{
              minWidth: "unset",
              px: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: "var(--whueo-hex_000000)",
              }}
            />
          </Button>

          <Menu
            anchorEl={sizeAnchor}
            open={Boolean(
              sizeAnchor
            )}
            onClose={() =>
              setSizeAnchor(null)
            }
          >
            {brushSizes.map(
              (brush) => (
                <MenuItem
                  key={
                    brush.value
                  }
                  onClick={() => {
                    setSize(
                      brush.value
                    )
                    setSizeAnchor(
                      null
                    )
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width:
                          brush.preview,
                        height:
                          brush.preview,
                        borderRadius:
                          "50%",
                        bgcolor:
                          "var(--whueo-hex_000000)",
                        flexShrink: 0,
                      }}
                    />

                    {brush.value}px
                  </Box>
                </MenuItem>
              )
            )}
          </Menu>
        </>
      )}
    </Box>
  )
}