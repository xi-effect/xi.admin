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
        settings: { sections, id, username },
      },
    }: AboutModeratorT = props;

    return (
      <Box
        sx={{
          mt: 'auto',
          mb: '65px',
          width: '100%',
          borderRadius: '8px',
          padding: '12px 16px',
          backgroundColor: 'grayscale.0',
        }}
      >
        <Stack
          direction='row'
          sx={{ fontWeight: 500, fontSize: 18, mb: '8px' }}
          justifyContent='space-between'
        >
          <Box component='span' sx={{ color: 'grayscale.100' }}>
            {username}
          </Box>

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
                backgroundColor: '#F5F5F5',
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
