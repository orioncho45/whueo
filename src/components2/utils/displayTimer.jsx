
import { Box, Typography } from '@mui/material';
import GameTimer from '../timer';

export default function DisplayTimerPill({text, startTime, totalTime, onFinish}) {


  return (
    <Box
      sx={{
       
        
        // Flex Layout
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        
        // Styling & Low Opacity
        px: 1.5,
        py: 0.5,
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Light opacity black
        backdropFilter: 'blur(4px)',          // Subtle glassmorphism effect
        border: '1px solid rgba(255, 255, 255, 0.1)',
        
        // Crucial for Games
        pointerEvents: 'none', // Lets players click right through the UI element
        userSelect: 'none',
      }}
    >
      

      {/* Ping Text */}
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'monospace', // Prevents layout shaking when numbers change
          fontWeight: 500,
          letterSpacing: '0.05em',
        }}
      >
        {text}:{' '}
        <Box component="span" sx={{ color: '#fff', fontWeight: 700 }}>
          <GameTimer startTime={startTime} totalTime={totalTime} onFinish={onFinish} />
        </Box>
        
      </Typography>
    </Box>
  );
}