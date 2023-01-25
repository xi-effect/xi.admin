import React from 'react';
import { Menu, MenuProps } from '@mui/material';

const MenuC = (props: MenuProps) => {
  const { children, sx, ...restP } = props;

  return (
    <Menu
      sx={{
        mt: '16px',
        fontSize: '16px',

        '& .MuiMenuItem-root:hover': {
          color: '#445AFF',
          borderRadius: '4px',
          backgroundColor: '#ECEFFF',
        },

        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0,0,0,0)',
        },

        '& .MuiMenu-list': {
          p: '8px 0',
        },

        '& .MuiPaper-root': {
          transition: 'background 0.2s ease-in-out',
        },

        '& .MuiPaper-elevation': {
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(27, 27, 27, 0.08)',
        },

        ...sx,
      }}
      {...restP}
    >
      {children}
    </Menu>
  );
};

export default MenuC;
