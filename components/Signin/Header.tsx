import React from 'react';
import { Stack, Theme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import XiLogo from 'kit/XiLogo';

const Header: React.FC = () => {
  const mobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Stack
      component={motion.header}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        height: mobile ? '100px' : '110px',
        p: 4,
        width: '100%',
      }}
    >
      <XiLogo />
    </Stack>
  );
};

export default Header;
