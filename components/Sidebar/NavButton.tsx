import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { navLinkS } from '../../kit/Sidebar/Nav';

type NavButtonT = {
  href: string;
  visibility: boolean;
};

const NavButton: React.FC<NavButtonT> = ({ href, visibility, children }) => {
  const router = useRouter();

  return visibility ? (
    <Link href={href}>
      <Box
        component='span'
        sx={{
          ...navLinkS,
          bgcolor: router.pathname.includes(href) ? 'grayscale.0' : '',
        }}
      >
        {children}
      </Box>
    </Link>
  ) : null;
};

export default NavButton;
