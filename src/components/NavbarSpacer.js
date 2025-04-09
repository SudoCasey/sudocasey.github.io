"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';


const StyledBox = styled('div')(({ theme }) => ({
    alignSelf: 'center',
    width: '100%',
    marginTop: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  }));

export default function NavbarSpacer() {
  return (
    <StyledBox />
  );
}