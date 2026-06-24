import { Button, Container, Paper, Box, Stack, Typography } from "@mui/material"
import { HowToVoteRounded, PlayArrowRounded, RecordVoiceOverRounded, VisibilityOffRounded} from "@mui/icons-material"
import theme from "../../theme"
import { useNavigate } from "react-router-dom"
import roleImage from "../../assets/screenshots/role.png"
import wordSelectImage from "../../assets/screenshots/wordSelect.png"
import canvasImage from "../../assets/screenshots/canvas.png"
import voteImage from "../../assets/screenshots/vote.png"

// using Swiper instead of react-slick
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import 'swiper/css/scrollbar';

const t = theme.palette.t
const displayFont = "'Playfair Display', Georgia, serif"
const cardBase = {
  p: 3,
  borderRadius: "16px",
  background: t.surface,
  border: `1px solid ${t.border}`,
  transition: "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
}
const Overline = ({ children, color }) => (
  <Typography sx={{
    fontSize: "0.65rem", fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: color || t.accent,
  }}>
    {children}
  </Typography>
)
// ─── Screenshot placeholder ──────────────────────────────────────────────────
function ScreenPlaceholder({ alt }) {
  return (
    <Box sx={{
      width: "100%",
      aspectRatio: "16 / 10",
      borderRadius: "12px",
      bgcolor: "rgba(255,255,255,0.03)",
      border: `1px dashed ${t.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Typography sx={{ fontSize: "0.75rem", color: t.textLowest }}>
        {alt}
      </Typography>
    </Box>
  )
}
const HowItWorks = () => {
    // ─── How-it-works step screenshots ──────────────────────────────────────────
// Replace src values with real screenshot paths
    const HOW_IT_WORKS = [
        

        {
            icon: (
            <VisibilityOffRounded
                sx={{ fontSize: 20, color: t.warm }}
            />
            ),
            title: "Get Your Role",
            desc:
            "Players become either Artists or Imposters. Artists receive the chosen word and know exactly what to draw. Imposters receive no word and must figure it out from the drawings.",
            screenshot: roleImage,
            screenshotAlt: "Role reveal screen",
        },
        {
            icon: (
            <RecordVoiceOverRounded
                sx={{ fontSize: 20, color: t.accent }}
            />
            ),
            title: "Choose the Secret Word",
            desc:
            "One player becomes the Selector and receives several word choices. Pick one within 20 seconds or the game automatically chooses for you.",
            screenshot: wordSelectImage,
            screenshotAlt: "Word selection screen",
        },

        {
            icon: (
            <VisibilityOffRounded
                sx={{ fontSize: 20, color: t.accent }}
            />
            ),
            title: "Draw & Blend In",
            desc:
            "Artists draw clues based on the secret word. Imposters secretly study everyone's artwork, guess the word, and create convincing drawings to avoid suspicion.",
            screenshot: canvasImage,
            screenshotAlt: "Drawing phase screen",
        },

        {
            icon: (
            <HowToVoteRounded
                sx={{ fontSize: 20, color: t.cool }}
            />
            ),
            title: "Vote & Eliminate",
            desc:
            "When drawing ends, everyone votes for the most suspicious player. The player with the most votes is eliminated. Artists win by eliminating every Imposter. Imposters win when their numbers equal the remaining Artists.",
            screenshot: voteImage,
            screenshotAlt: "Voting phase screen",
        },
        ]

    // slider settings with lazy loading
    const sliderSettings = {
      dots: true,
      arrows: true,
      lazyLoad: "ondemand",
      infinite: false,
      speed: 320,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 2 } },
        { breakpoint: 900, settings: { slidesToShow: 1 } },
      ],
    }
    // removed react-slick settings; Swiper breakpoints used below

    const navigate = useNavigate()
    return (
        <Container id="how-it-works" maxWidth="xl" sx={{ py: { xs: 7, md: 9 } }}>
            <Stack spacing={6}>
                <Stack spacing={0.75}>
                    <Overline>The Loop</Overline>
                    <Typography sx={{
                    fontFamily: displayFont,
                    fontWeight: 900,
                    fontSize: { xs: "1.6rem", md: "2rem" },
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    }}>
                    How It Works
                    </Typography>
                    <Typography sx={{ fontSize: "0.83rem", color: t.textLow }}>
                    Simple rules. Hidden roles. No one can be trusted.
                    </Typography>
                </Stack>

                {/* Swiper carousel (responsive) */}
                <Box>
                  <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    breakpoints={{
                      0: { slidesPerView: 1 },
                      900: { slidesPerView: 2 },
                      1200: { slidesPerView: 3 },
                    }}
                    
                    slidesPerView={3}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    a11y={{ enabled: true }}
                  >
                    {HOW_IT_WORKS.map((item, idx) => (
                      <SwiperSlide key={idx} style={{ padding: 8 }}>
                        <Paper elevation={0} sx={{
                          ...cardBase,
                          minHeight: 220,
                          "&:hover": {
                            borderColor: t.borderMid,
                            transform: "translateY(-3px)",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                          },
                        }}>
                          <Stack spacing={2.5}>
                            {item.screenshot ? (
                              <Box sx={{
                                width: "100%",
                                aspectRatio: "16 / 10",
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: `1px solid ${t.border}`,
                              }}>
                                <Box
                                  component="img"
                                  src={item.screenshot}
                                  alt={item.screenshotAlt}
                                  loading="lazy"
                                  sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                />
                              </Box>
                            ) : (
                              <ScreenPlaceholder alt={item.screenshotAlt} />
                            )}
                            <Stack spacing={1.25}>
                              <Stack direction="row" alignItems="center" spacing={1}>
                                {item.icon}
                                <Typography fontWeight={700} sx={{ fontSize: "0.97rem", color: t.textHi }}>
                                  {item.title}
                                </Typography>
                              </Stack>
                              <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.8, color: t.textMid }}>
                                {item.desc}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Paper>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>

                {/* Inline CTA */}
                <Stack alignItems="center" pt={1}>
                    <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowRounded />}
                    onClick={() => navigate("/play")}
                    sx={{
                        px: 4, py: 1.3,
                        borderRadius: "12px",
                        fontWeight: 800, fontSize: "0.9rem",
                        boxShadow: "none",
                        "&:hover": { boxShadow: "0 0 28px rgba(83,117,63,0.45)" },
                    }}
                    >
                    Play Now — It's Free
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
export default HowItWorks