import { createTheme } from '@mui/material/styles';

// Pick one preset below, or edit its values to make a new occasion.
// Gameplay feedback and drawing ink keep their own recognizable colors below.
export const occasionPresets = {
  forest: {
    background: '#111911',
    pageBackground: '#0c1410',
    surface: '#1f3729',
    surfaceLow: '#161e15',
    surfaceHigh: '#1c2a1a',
    box: '#23382cff',
    primary: '#53753fff',
    accent: '#7db87a',
    border: '#4e6457',
    text: '#fff',
    softText: '#e9efe8'
  },
  ocean: {
    background: '#101a2d',
    pageBackground: '#091425',
    surface: '#1a3150',
    surfaceLow: '#14243d',
    surfaceHigh: '#213858',
    box: '#233e63',
    primary: '#3267b8',
    accent: '#73b5ff',
    border: '#466586',
    text: '#ffffff',
    softText: '#e4f0ff'
  },
  autumn: {
    background: '#211610',
    pageBackground: '#170e0a',
    surface: '#3a271c',
    surfaceLow: '#291b14',
    surfaceHigh: '#463022',
    box: '#503524',
    primary: '#b86532',
    accent: '#e6a15d',
    border: '#76513a',
    text: '#ffffff',
    softText: '#f4e4d4'
  },
  winter: {
    background: '#131c26',
    pageBackground: '#0b131d',
    surface: '#233545',
    surfaceLow: '#192734',
    surfaceHigh: '#2c4052',
    box: '#30495c',
    primary: '#568eaf',
    accent: '#a2d9f0',
    border: '#526e82',
    text: '#ffffff',
    softText: '#e2f1f8'
  }
}

export const occasion = occasionPresets.autumn

const withAlpha = (hex, alpha) => {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? [...value].map(char => char + char).join('') : value.slice(0, 6)
  const channels = [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16))
  return `rgba(${channels.join(',')},${alpha})`
}

const mix = (first, second, amount) => {
  const channels = hex => {
    const value = hex.replace('#', '').slice(0, 6)
    const full = value.length === 3 ? [...value].map(char => char + char).join('') : value
    return [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16))
  }
  const a = channels(first)
  const b = channels(second)
  return `#${a.map((value, index) => Math.round(value * (1 - amount) + b[index] * amount).toString(16).padStart(2, '0')).join('')}`
}

const hueOf = hex => {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? [...value].map(char => char + char).join('') : value.slice(0, 6)
  const [r, g, b] = [0, 2, 4].map(index => parseInt(full.slice(index, index + 2), 16) / 255)
  const high = Math.max(r, g, b)
  const low = Math.min(r, g, b)
  if (high === low) return 0
  const span = high - low
  const sector = high === r ? ((g - b) / span) % 6 : high === g ? (b - r) / span + 2 : (r - g) / span + 4
  return (sector * 60 + 360) % 360
}

const brightAccent = mix(occasion.accent, occasion.text, 0.18)
const mutedText = mix(occasion.softText, occasion.background, 0.45)

export const colors = {
  hex_000000: '#000',
  hex_0000ff: '#0000ff',
  hex_00aa00: '#00aa00',
  hex_00ff00: brightAccent,
  hex_0a0c11: occasion.pageBackground,
  hex_0b0b0b: occasion.pageBackground,
  hex_0c1410: occasion.pageBackground,
  hex_111111: occasion.background,
  hex_11141b: occasion.background,
  hex_111911: occasion.background,
  hex_15ff00: brightAccent,
  hex_161e15: occasion.surfaceLow,
  hex_1976d2: occasion.accent,
  hex_1c2a1a: occasion.surfaceHigh,
  hex_1e1e1e: occasion.surface,
  hex_1f2937: occasion.surface,
  hex_1f3729: occasion.surface,
  hex_222222: occasion.surfaceHigh,
  hex_23382cff: occasion.box,
  hex_24242b: occasion.surfaceHigh,
  hex_262626: occasion.surfaceHigh,
  hex_2b313d: occasion.border,
  hex_2d1f1f: '#2d1f1f',
  hex_2d2d33: occasion.surfaceHigh,
  hex_2e7d32: occasion.primary,
  hex_2f2f2f: occasion.surfaceHigh,
  hex_2f2f38: occasion.surfaceHigh,
  hex_333333: occasion.border,
  hex_374151: occasion.border,
  hex_3ddc84: brightAccent,
  hex_3f3f46: occasion.border,
  hex_43a047: occasion.accent,
  hex_444444: occasion.border,
  hex_4caf50: occasion.accent,
  hex_4e6457: occasion.border,
  hex_4e6457ff: occasion.border,
  hex_4fc3f7: brightAccent,
  hex_53753fff: occasion.primary,
  hex_60a5fa: brightAccent,
  hex_666666: mutedText,
  hex_6e9db8: mix(occasion.accent, occasion.text, 0.35),
  hex_7db87a: occasion.accent,
  hex_800080: '#800080',
  hex_838b9c: mutedText,
  hex_888888: mutedText,
  hex_8b4513: '#8b4513',
  hex_90caf9: brightAccent,
  hex_999999: mutedText,
  hex_9ca3af: mutedText,
  hex_aaaaaa: occasion.softText,
  hex_b71c1c: '#b71c1c',
  hex_bbbbbb: occasion.softText,
  hex_c8a96e: mix(occasion.primary, occasion.text, 0.4),
  hex_d32f2f: '#d32f2f',
  hex_db9f00: '#db9f00',
  hex_dc2626: '#dc2626',
  hex_dddddd: occasion.softText,
  hex_e53935: '#e53935',
  hex_e9efe8: occasion.softText,
  hex_eef0f4: occasion.softText,
  hex_f44336: '#f44336',
  hex_f4b400: '#f4b400',
  hex_f87171: '#f87171',
  hex_fbbf24: '#fbbf24',
  hex_ff0000: '#ff0000',
  hex_ff3b3b: '#ff3b3b',
  hex_ff5252: '#ff5252',
  hex_ff5c5c: '#ff5c5c',
  hex_ff69b4: '#ff69b4',
  hex_ffa500: '#ffa500',
  hex_ffeb3b: '#ffeb3b',
  hex_fffdf5: mix(occasion.text, occasion.accent, 0.06),
  hex_ffff00: '#ffff00',
  hex_ffffff: occasion.text,
  hex_ffffffff: occasion.text,
  rgba_0_0_0_0p15: 'rgba(0,0,0,0.15)',
  rgba_0_0_0_0p25: 'rgba(0,0,0,0.25)',
  rgba_0_0_0_0p3: 'rgba(0,0,0,0.3)',
  rgba_0_0_0_0p4: 'rgba(0,0,0,0.4)',
  rgba_0_0_0_0p5: 'rgba(0,0,0,0.5)',
  rgba_0_0_0_0p55: 'rgba(0,0,0,0.55)',
  rgba_0_0_0_0p6: 'rgba(0,0,0,0.6)',
  rgba_0_0_0_0p8: 'rgba(0,0,0,0.8)',
  rgba_0_0_0_0p9: 'rgba(0,0,0,0.9)',
  rgba_0_0_0_p35: 'rgba(0,0,0,.35)',
  rgba_0_0_0_p45: 'rgba(0,0,0,.45)',
  rgba_0_0_0_p55: 'rgba(0,0,0,.55)',
  rgba_0_0_0_p65: 'rgba(0,0,0,.65)',
  rgba_0_0_0_p72: 'rgba(0,0,0,.72)',
  rgba_110_157_184_0p10: withAlpha(brightAccent, 0.10),
  rgba_110_157_184_0p25: withAlpha(brightAccent, 0.25),
  rgba_200_169_110_0p10: withAlpha(occasion.primary, 0.10),
  rgba_200_169_110_0p28: withAlpha(occasion.primary, 0.28),
  rgba_21_21_21_0p75: 'rgba(21,21,21,0.75)',
  rgba_21_255_0_0p12: withAlpha(occasion.accent, 0.12),
  rgba_233_239_232_0p22: withAlpha(occasion.softText, 0.22),
  rgba_233_239_232_0p38: withAlpha(occasion.softText, 0.38),
  rgba_233_239_232_0p60: withAlpha(occasion.softText, 0.60),
  rgba_239_68_68_0p08: 'rgba(239,68,68,0.08)',
  rgba_239_68_68_0p15: 'rgba(239,68,68,0.15)',
  rgba_255_0_0_0p12: 'rgba(255,0,0,0.12)',
  rgba_255_0_0_0p15: 'rgba(255,0,0,0.15)',
  rgba_255_0_0_0p6: 'rgba(255,0,0,0.6)',
  rgba_255_120_120_0p9: 'rgba(255,120,120,0.9)',
  rgba_255_255_255: withAlpha(occasion.text, 1),
  rgba_255_255_255_0p03: withAlpha(occasion.text, 0.03),
  rgba_255_255_255_0p035: withAlpha(occasion.text, 0.035),
  rgba_255_255_255_0p04: withAlpha(occasion.text, 0.04),
  rgba_255_255_255_0p045: withAlpha(occasion.text, 0.045),
  rgba_255_255_255_0p05: withAlpha(occasion.text, 0.05),
  rgba_255_255_255_0p06: withAlpha(occasion.text, 0.06),
  rgba_255_255_255_0p07: withAlpha(occasion.text, 0.07),
  rgba_255_255_255_0p08: withAlpha(occasion.text, 0.08),
  rgba_255_255_255_0p09: withAlpha(occasion.text, 0.09),
  rgba_255_255_255_0p1: withAlpha(occasion.text, 0.1),
  rgba_255_255_255_0p12: withAlpha(occasion.text, 0.12),
  rgba_255_255_255_0p14: withAlpha(occasion.text, 0.14),
  rgba_255_255_255_0p18: withAlpha(occasion.text, 0.18),
  rgba_255_255_255_0p2: withAlpha(occasion.text, 0.2),
  rgba_255_255_255_0p22: withAlpha(occasion.text, 0.22),
  rgba_255_255_255_0p25: withAlpha(occasion.text, 0.25),
  rgba_255_255_255_0p28: withAlpha(occasion.text, 0.28),
  rgba_255_255_255_0p3: withAlpha(occasion.text, 0.3),
  rgba_255_255_255_0p35: withAlpha(occasion.text, 0.35),
  rgba_255_255_255_0p4: withAlpha(occasion.text, 0.4),
  rgba_255_255_255_0p45: withAlpha(occasion.text, 0.45),
  rgba_255_255_255_0p5: withAlpha(occasion.text, 0.5),
  rgba_255_255_255_0p55: withAlpha(occasion.text, 0.55),
  rgba_255_255_255_0p6: withAlpha(occasion.text, 0.6),
  rgba_255_255_255_0p7: withAlpha(occasion.text, 0.7),
  rgba_255_255_255_0p72: withAlpha(occasion.text, 0.72),
  rgba_255_255_255_0p75: withAlpha(occasion.text, 0.75),
  rgba_255_255_255_0p8: withAlpha(occasion.text, 0.8),
  rgba_255_255_255_p84: withAlpha(occasion.text, 0.84),
  rgba_33_150_243_0p14: withAlpha(occasion.accent, 0.14),
  rgba_78_100_87_0p45: withAlpha(occasion.border, 0.45),
  rgba_78_100_87_0p70: withAlpha(occasion.border, 0.70),
  rgba_79_195_247_0p6: withAlpha(brightAccent, 0.6),
  rgba_83_117_63_0p12: withAlpha(occasion.primary, 0.12),
  rgba_83_117_63_0p35: withAlpha(occasion.primary, 0.35),
  rgba_83_117_63_0p45: withAlpha(occasion.primary, 0.45),
  rgba_83_117_63_0p55: withAlpha(occasion.primary, 0.55),
  rgba_8_14_10_0p1: withAlpha(occasion.pageBackground, 0.1),
  rgba_8_14_10_0p2: withAlpha(occasion.pageBackground, 0.2),
  rgba_8_14_10_0p7: withAlpha(occasion.pageBackground, 0.7),
  rgba_8_14_10_0p72: withAlpha(occasion.pageBackground, 0.72),
  rgba_8_14_10_0p9: withAlpha(occasion.pageBackground, 0.9),
  rgba_8_14_10_0p92: withAlpha(occasion.pageBackground, 0.92),
  rgba_8_14_10_0p95: withAlpha(occasion.pageBackground, 0.95),
  rgba_90_200_120_0p1: withAlpha(occasion.accent, 0.1),
  rgba_90_200_120_0p12: withAlpha(occasion.accent, 0.12),
  rgba_90_200_120_0p18: withAlpha(occasion.accent, 0.18),
  rgba_90_200_120_0p22: withAlpha(occasion.accent, 0.22),
  rgba_90_200_120_0p45: withAlpha(occasion.accent, 0.45),
  rgba_90_200_120_0p6: withAlpha(occasion.accent, 0.6),
  rgba_90_200_120_0p8: withAlpha(occasion.accent, 0.8),
  rgba_90_200_120_0p9: withAlpha(occasion.accent, 0.9),
  rgba_90_200_120_1: occasion.accent,
  rgba_91_126_91_0p03: withAlpha(occasion.border, 0.03),
  rgba_96_165_250_p12: withAlpha(occasion.accent, 0.12),
  rgba_96_165_250_p18: withAlpha(occasion.accent, 0.18),
}

// Ink is gameplay data. Keep these colors stable when a room uses another theme.
export const drawingPalette = [
  '#000000', '#ffffff', '#ff0000', '#ffa500', '#ffff00',
  '#00aa00', '#0000ff', '#800080', '#8b4513', '#ff69b4'
]

if (typeof document !== "undefined") {
  for (const [name, value] of Object.entries(colors)) {
    document.documentElement.style.setProperty(`--whueo-${name}`, value)
  }
  // Branding illustrations were drawn in the original green palette.
  // Shift their hue along with the occasion accent; drawing ink and screenshots stay intact.
  const artworkHueShift = hueOf(occasion.accent) - hueOf('#7db87a')
  document.documentElement.style.setProperty('--whueo-artwork-filter', `hue-rotate(${artworkHueShift}deg)`)
  if (!document.getElementById('whueo-artwork-theme')) {
    const artworkStyle = document.createElement('style')
    artworkStyle.id = 'whueo-artwork-theme'
    artworkStyle.textContent = `
      img[src*="logo.png"],
      img[src*="/static/media/hero."],
      img[src*="/static/media/drawing."],
      img[src*="/static/media/create_game."],
      img[src*="/static/media/join_room."],
      img[src*="/static/media/join_public_room."] {
        filter: var(--whueo-artwork-filter);
      }
    `
    document.head.appendChild(artworkStyle)
  }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', occasion.surface)
}


const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: occasion.pageBackground,
      paper: occasion.surface,
    },
    divider: occasion.border,
    primary: {
      main: colors.hex_53753fff,
    },
    secondary: { main: occasion.accent },
    success: { main: colors.hex_43a047 },
    error: { main: colors.hex_d32f2f },
    warning: { main: colors.hex_f4b400 },
    text: {
        primary: occasion.text,
        secondary: occasion.softText,
    },
    brand: {
        dark: colors.hex_111911,
        light: colors.hex_1f3729,
        boxLight: colors.hex_23382cff,
        border: colors.hex_4e6457ff,
        white: colors.hex_ffffff,
    },
    // design tokens (moved from landing.jsx)
    t: {
      bg:           colors.hex_0c1410,
      surface:      colors.hex_161e15,
      surfaceUp:    colors.hex_1c2a1a,
      overlay:      colors.rgba_0_0_0_0p25,
      border:       colors.rgba_78_100_87_0p45,
      borderMid:    colors.rgba_78_100_87_0p70,
      borderHi:     colors.hex_4e6457,
      borderAccent: colors.rgba_83_117_63_0p55,
      textHi:       colors.hex_e9efe8,
      textMid:      colors.rgba_233_239_232_0p60,
      textLow:      colors.rgba_233_239_232_0p38,
      textLowest:   colors.rgba_233_239_232_0p22,
      accent:       colors.hex_7db87a,
      accentDim:    colors.rgba_83_117_63_0p12,
      accentBorder: colors.rgba_83_117_63_0p35,
      warm:         colors.hex_c8a96e,
      warmDim:      colors.rgba_200_169_110_0p10,
      warmBorder:   colors.rgba_200_169_110_0p28,
      cool:         colors.hex_6e9db8,
      coolDim:      colors.rgba_110_157_184_0p10,
      coolBorder:   colors.rgba_110_157_184_0p25,
      boxShadow: colors.rgba_83_117_63_0p45,
    }
  },
  components: {
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          disablePortal: true
        }
      },
      styleOverrides: {
        root: {
          color: colors.hex_53753fff,
          fontSize: '16px',
          '& .MuiSelect-select': {
            color: colors.hex_ffffff,
            paddingRight: '32px',
          },
          '& .MuiSvgIcon-root': {
            color: colors.hex_53753fff,
          },
        },
        outlined: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.rgba_255_255_255_0p4,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.hex_53753fff,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.hex_53753fff,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.hex_1e1e1e, // Give the dropdown panel a dark background
          color: colors.hex_ffffff,
          zIndex: 200000             // Default text color for the dropdown options
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.hex_ffffff,
          '&.Mui-focused': {
            color: colors.hex_ffffff,
          },
        },
      },
    },
  },
  // ...add other theme properties if needed...
});

export default theme;
