import * as React from 'react';
import Box from '@mui/material/Box';

export default function CaseyFriedrichIcon() {
  return (
    <Box
      component="img"
      src="/images/Casey/CaseyFriedrich.webp"
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
