import * as React from 'react';
import Box from '@mui/material/Box';

export default function CaseyFriedrichIcon() {
  return (
    <Box
      component="img"
      src="/images/Casey/CaseyFriedrich-100.webp"
      srcSet={`
        /images/Casey/CaseyFriedrich-100.webp 100w,
        /images/Casey/CaseyFriedrich-200.webp 200w,
        /images/Casey/CaseyFriedrich-400.webp 400w
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
