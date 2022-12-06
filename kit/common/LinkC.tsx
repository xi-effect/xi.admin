import React from 'react';
import { Link, SxProps, Theme } from '@mui/material';

type LinkCT = {
  href: string;
  sx?: SxProps<Theme>;
};
const LinkC: React.FC<LinkCT> = ({ href, children, sx }) => (
  <Link
    href={href}
    target='_blank'
    sx={{
      p: '12px',
      fontSize: '16px',
      textAlign: 'center',
      borderRadius: '8px',
      color: 'grayscale.0',
      textDecoration: 'none',
      bgcolor: 'primary.dark',
      ...sx,
    }}
  >
    {children}
  </Link>
);

export default LinkC;
