import * as React from 'react';
import Box from '@mui/material/Box';

export default function CaseyFriedrichIcon() {
  return (
    <Box
      component="img"
      src="/images/Casey/CaseyFriedrich_Headshot.webp"
      srcSet={`
        /images/Casey/CaseyFriedrich_Headshot-250.webp 250w,
        /images/Casey/CaseyFriedrich_Headshot-500.webp 500w,
        /images/Casey/CaseyFriedrich_Headshot-1000.webp 1000w
      `}
      sizes="(max-width: 600px) 100px, (max-width: 900px) 200px, 400px"
      alt="Casey Friedrich"
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        objectFit: 'cover',
      }}
    />
  );
}
