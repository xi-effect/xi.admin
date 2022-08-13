import React, { ReactNode } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

type NavButtonT = {
  title: string;
  href: string;
  icon: ReactNode;
};

const NavButton: React.FC<NavButtonT> = (props) => {
  const router = useRouter();
  const { title, href, icon } = props;
  const onClickHandler = () => router.push(href);

  const styles = {
    bgcolor: router.pathname.includes(href) ? 'primary.main' : '',
    borderRadius: 2,
    '&:hover': {
      bgcolor: router.pathname.includes(href) ? 'primary.main' : '',
    },
  };

  return (
    <Tooltip placement='right' title={title}>
      <IconButton onClick={onClickHandler} sx={styles}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default NavButton;
