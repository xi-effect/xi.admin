import React, { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Router from 'next/router';

type NavButtonT = {
  title: string;
  href: string;
  icon: ReactNode;
};

const NavButton: React.FC<NavButtonT> = (props) => {
  const { title, href, icon } = props;

  const styles = {
    bgcolor: Router.pathname.includes(href) ? 'primary.main' : '',
    borderRadius: 2,
    '&:hover': {
      bgcolor: Router.pathname.includes(href) ? 'primary.main' : '',
    },
  };

  return (
    <Tooltip placement='right' title={title}>
      <IconButton onClick={() => Router.push(href)} sx={styles}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default NavButton;
