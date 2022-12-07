import React, { useState } from 'react';
import { Stack, useMediaQuery, Theme, IconButton, Box, Menu } from '@mui/material';
import AboutModerator from 'components/Sidebar/AboutModerator';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import Nav from './Nav';

const Sidebar = () => {
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return md ? (
    <Stack
      sx={{
        pb: '65px',
        height: '100%',
        width: '220px',
        position: 'fixed',
      }}
    >
      <Nav />

      <AboutModerator />
    </Stack>
  ) : (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{
        zIndex: 1,
        width: '100%',
        p: '10px 20px',
        height: '60px',
        position: 'fixed',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(68,90,255,0.2)',
      }}
    >
      <Link href='/home'>
        <Stack sx={{ cursor: 'pointer' }} direction='row' alignItems='center'>
          <Image
            width={30}
            height={30}
            quality={100}
            src='/icons/logo.svg'
            alt='логотип xi.admin'
          />

          <Box ml='10px' fontWeight={500} fontSize='19px'>
            xi.admin
          </Box>
        </Stack>
      </Link>

      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: '40px',
          height: '40px',
          borderRadius: '7px',
          bgcolor: 'primary.dark',
          '&:hover': {
            bgcolor: 'primary.main',
          },
        }}
      >
        <MenuIcon sx={{ color: 'grayscale.0' }} />
      </IconButton>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          mt: '15px',
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0,0,0,0)',
          },
          '& .MuiMenu-list': {
            p: '8px',
          },
          '& .MuiPaper-elevation': {
            boxShadow: '0',
            borderRadius: '8px',
            border: '1px solid #E6E6E6',
          },
        }}
      >
        <Stack width='220px'>
          <Nav />
        </Stack>
      </Menu>
    </Stack>
  );
};

export default Sidebar;
