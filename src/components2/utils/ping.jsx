
import { Box, Typography } from '@mui/material';

export default function PingHUD({ping}) {
  
  // Dynamic color helper for the status indicator
  const getPingColor = (ms) => {
    if (ms < 60) return 'var(--whueo-hex_4caf50)'; // Green (Good)
    if (ms < 130) return 'var(--whueo-hex_ffeb3b)'; // Yellow (Moderate)
    return 'var(--whueo-hex_f44336)'; // Red (High Ping)
  };

  return (
    <Box
      sx={{
        // Positioning
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        
        // Flex Layout
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        
        // Styling & Low Opacity
        px: 1.5,
        py: 0.5,
        borderRadius: '16px',
        backgroundColor: 'var(--whueo-rgba_0_0_0_0p4)', // Light opacity black
        backdropFilter: 'blur(4px)',          // Subtle glassmorphism effect
        border: '1px solid var(--whueo-rgba_255_255_255_0p1)',
        
        // Crucial for Games
        pointerEvents: 'none', // Lets players click right through the UI element
        userSelect: 'none',
      }}
    >
      {/* Ping Status Dot */}
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: getPingColor(ping),
          // Subtle pulse animation if ping is good
          animation: ping < 60 ? 'pulse 2s infinite ease-in-out' : 'none',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 },
          },
        }}
      />

      {/* Ping Text */}
      <Typography
        variant="caption"
        sx={{
          color: 'var(--whueo-rgba_255_255_255_0p7)',
          fontFamily: 'monospace', // Prevents layout shaking when numbers change
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        PING:{' '}
        <Box component="span" sx={{ color: 'var(--whueo-hex_ffffff)', fontWeight: 700 }}>
          {ping}
        </Box>
        ms
      </Typography>
    </Box>
  );
}