"use client";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CaseyFriedrichIcon from './CaseyFriedrichIcon';
import ColorModeIconDropdown from '../app/shared-theme/ColorModeIconDropdown';
import NextLink from 'next/link';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  backdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.7)`
    : alpha(theme.palette.background.default, 0.7),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    marginbottom: theme.spacing(10),
  },
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  /*const NavbarSpacer = styled('div')(({ theme }) => ({
      height: theme.spacing(8),
  }));*/

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar 
            variant="dense" 
            sx={{
              padding: scrolled ? '8px 12px' : '12px 16px',
              transition: 'padding 0.3s ease',
            }}
          >
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src="/images/Casey/CaseyFriedrich_Headshot-250.webp"
                  alt="Casey Friedrich"
                  component={NextLink}
                  href="/"
                  sx={{ 
                    width: scrolled ? 50 : 100, 
                    height: scrolled ? 50 : 100,
                    transition: 'width 0.3s ease, height 0.3s ease',
                  }}
                />
                <Typography variant="h6" component="h2" sx={{ 
                  flexGrow: 1,
                  color: (theme) => theme.palette.mode === 'light' ? 'text.primary' : 'inherit',
                  marginRight: 2,
                }}>
                  Casey Friedrich
                </Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                <Button 
                  variant="text" 
                  href="/" 
                  color="secondary" 
                  component={NextLink}
                  sx={{
                    height: scrolled ? '2.5rem' : '4rem',
                    transition: 'height 0.3s ease',
                  }}
                >
                  Home
                </Button>
                <Button 
                  variant="text" 
                  href="/contact" 
                  color="secondary" 
                  component={NextLink}
                  sx={{
                    height: scrolled ? '2.5rem' : '4rem',
                    transition: 'height 0.3s ease',
                  }}
                >
                  Contact
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 1,
                alignItems: 'center',
              }}
            >
              {/*<Button color="primary" variant="text" size="small">
                Sign in
              </Button>
              <Button color="primary" variant="contained" size="small">
                Sign up
              </Button>*/}
              <ColorModeIconDropdown />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
              <ColorModeIconDropdown size="medium" />
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    top: 'var(--template-frame-height, 0px)',
                  },
                }}
              >
                <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>

                  <MenuItem href="/" color="secondary" component={NextLink}>Home</MenuItem>
                  <MenuItem href="/contact" color="secondary" component={NextLink}>Contact</MenuItem>
                  {/*<MenuItem>Features</MenuItem>
                  <MenuItem>Testimonials</MenuItem>
                  <MenuItem>Highlights</MenuItem>
                  <MenuItem>Pricing</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                  <MenuItem>Blog</MenuItem>
                  <Divider sx={{ my: 3 }} />
                  <MenuItem>
                    <Button color="primary" variant="contained" fullWidth>
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button color="primary" variant="outlined" fullWidth>
                      Sign in
                    </Button>
                  </MenuItem>*/}
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}
