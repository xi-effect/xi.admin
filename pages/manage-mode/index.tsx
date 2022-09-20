import React from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import { IconButton, Tooltip, Stack } from '@mui/material';
import { Group, FileCopy } from '@mui/icons-material';
import MainLayout from '../../kit/Layout/MainLayout';

const ManagePage = inject()(
  observer(() => {
    const styles = {
      p: 3,
      m: 5,
      border: '2px solid #5F85D8',
      borderRadius: 2,
      '&:hover': {
        bgcolor: 'primary.main',
      },
    };

    return (
      <MainLayout title='Управление'>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          flexWrap='wrap'
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <Tooltip placement='top' title='Управление модераторами'>
            <IconButton sx={styles} onClick={() => Router.push('/manage-mode/moderators')}>
              <Group
                sx={{
                  width: '70px',
                  height: '70px',
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip placement='top' title='Управление файлами'>
            <IconButton sx={styles} onClick={() => Router.push('/manage-mode/files')}>
              <FileCopy
                sx={{
                  width: '70px',
                  height: '70px',
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </MainLayout>
    );
  })
);

export default ManagePage;
