import React, { useState } from 'react';
import { Stack, useMediaQuery, Theme, IconButton, Box } from '@mui/material';
import AboutModerator from 'components/manage-mode/Moderators/AboutModerator';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';
import ToggleThemeButton from 'kit/common/ToggleThemeButton';
import MenuC from 'kit/common/MenuC';
import { formatAccessData } from 'utils/dataFormatting';
import Nav from './Nav';

type SidebarT = {
  userSt: UserSt;
};

const Sidebar = inject('userSt')(
  observer((props) => {
    const {
      userSt: {
        settings: { id, sections, username, mode },
      },
    }: SidebarT = props;

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

        <AboutModerator username={username} id={id} permissions={formatAccessData(sections)} />
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

            <Box
              ml='10px'
              fontSize='19px'
              fontWeight={500}
              color={mode === 'light' ? 'grayscale.100' : 'grayscale.0'}
            >
              xi.admin
            </Box>
          </Stack>
        </Link>

        <Stack direction='row' alignItems='center'>
          <ToggleThemeButton />

          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{
              ml: '20px',
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
        </Stack>

        <MenuC
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          sx={{
            '& .MuiMenu-list': {
              p: '8px',
            },
            '& .MuiPaper-root': {
              backgroundColor: mode === 'light' ? '#fff' : '#202020',
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
        </MenuC>
      </Stack>
    );
  })
);

export default Sidebar;
