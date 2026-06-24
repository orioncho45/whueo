import React, { useState, useEffect } from 'react';
import { Avatar, Skeleton, Box } from '@mui/material';

export const GameAvatar = ({ 
  id, 
  size = 56, 
  altText = "Game Avatar",
  imposter=false
}) => {
  // Ensure the ID stays within your 1-9 asset range
  const avatarId = Math.min(Math.max(id, 1), 9);
  const imageSrc = `/avatars/avatar_${avatarId}.png`;

  // Track loading per specific image URL to prevent flickering on re-renders
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    // Check if the browser already has this image cached natively
    const img = new Image();
    img.src = imageSrc;
    if (img.complete) {
      setLoadedSrc(imageSrc);
    }
  }, [imageSrc]);

  const isCurrentResourceLoading = loadedSrc !== imageSrc;

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      {/* Skeleton only shows if the specific URL hasn't finished loading yet */}
      {isCurrentResourceLoading && (
        <Skeleton 
          variant="circular" 
          width={size} 
          height={size} 
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      <Avatar
        alt={altText}
        src={imageSrc}
        imgProps={{
          onLoad: () => setLoadedSrc(imageSrc),
          style: { 
            // Smooth fade-in and zero layout shifting
            opacity: isCurrentResourceLoading ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out'
          }
        }}
        sx={{ 
          width: size, 
          height: size,
          border: `2px solid ${imposter  ? "red" : "brand.light"}`, // Matches the cool blue sunglasses
          boxShadow: `0px 4px 10px ${imposter ? "rgba(255, 0, 0, 0.15)" : "rgba(0, 0, 0, 0.15)"}`
        }}
      />
    </Box>
  );
};