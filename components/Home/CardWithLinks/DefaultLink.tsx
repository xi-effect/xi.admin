import React from 'react';
import { Box, Link } from '@mui/material';

type LinkT = {
  href: string;
  text: string;
};

const DefaultLink: React.FC<LinkT> = ({ href, text }) => (
  <Box p='3px 0' fontSize='17px' display='block' component='span'>
    <Link color='#fff' href={href} rel='noopener' target='_black' underline='hover'>
      {text}
    </Link>
  </Box>
);

export default DefaultLink;
