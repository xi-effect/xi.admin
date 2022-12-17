import React, { ReactNode } from 'react';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { navLinkS } from 'kit/Sidebar/Nav';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';

type NavButtonT = {
  href: string;
  visibility: boolean;
  userSt: UserSt;
  children: ReactNode;
};

const NavButton = inject('userSt')(
  observer((props) => {
    const {
      href,
      visibility,
      children,
      userSt: {
        settings: { mode },
      },
    }: NavButtonT = props;

    const router = useRouter();
    const activeLink = router.pathname.includes(href);

    const md = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    return visibility ? (
      <Link href={href}>
        <Box
          component='span'
          sx={{
            ...navLinkS,
            color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
            bgcolor: activeLink
              ? `${mode === 'light' ? `${md ? 'grayscale.0' : 'primary.light'}` : 'grayscale.100'}`
              : '',
          }}
        >
          {children}
        </Box>
      </Link>
    ) : null;
  })
);

export default NavButton;
