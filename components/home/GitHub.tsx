import React from 'react';
import CardLayout from 'kit/layout/CardLayout';
import { Box, Stack, Theme, useMediaQuery } from '@mui/material';
import LinkC from 'kit/common/LinkC';

const GitHub = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  const LinkCS = {
    m: '4px',
    flex: sm ? '1 1 46%' : '1 1 100%',
  };

  return (
    <CardLayout>
      <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
        GitHub
      </Box>

      <Stack m='-4px' direction='row' flexWrap='wrap'>
        <LinkC sx={LinkCS} href='https://github.com/xi-effect/.github'>
          xi.github
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.backend'>
          xi.backend
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.front'>
          xi.front
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.admin'>
          xi.admin
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.land'>
          xi.land
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.docs'>
          xi.docs
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.core'>
          xi.core
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.actions'>
          xi.actions
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.bit'>
          xi.bit
        </LinkC>

        <LinkC sx={LinkCS} href='https://github.com/xi-effect/xi.emails'>
          xi.emails
        </LinkC>
      </Stack>
    </CardLayout>
  );
};

export default GitHub;
