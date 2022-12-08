import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Stack } from '@mui/material';
import UserSt from 'store/user/userSt';
import { formatAccessData } from 'utils/dataFormatting';

type AboutModeratorT = {
  userSt: UserSt;
};

const AboutModerator = inject('userSt')(
  observer((props) => {
    const {
      userSt: {
        settings: { sections, id, username, mode },
      },
    }: AboutModeratorT = props;

    return (
      <Box
        sx={{
          mt: 'auto',
          mb: '120px',
          width: '100%',
          borderRadius: '8px',
          padding: '12px 16px',
          color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
          backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
          transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,',
        }}
      >
        <Stack
          direction='row'
          sx={{ fontWeight: 500, fontSize: 18, mb: '8px' }}
          justifyContent='space-between'
        >
          <Box component='span'>{username}</Box>

          <Box component='span' sx={{ color: 'grayscale.40' }}>
            {id}
          </Box>
        </Stack>

        <Stack direction='row' flexWrap='wrap'>
          {formatAccessData(sections).map((s) => (
            <Box
              component='span'
              key={s}
              sx={{
                m: '4px',
                p: '4px 6px',
                fontSize: '12px',
                borderRadius: '4px',
                backgroundColor: mode === 'light' ? '#F5F5F5' : '#202020',
                transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out,',
              }}
            >
              {s}
            </Box>
          ))}
        </Stack>
      </Box>
    );
  })
);

export default AboutModerator;
