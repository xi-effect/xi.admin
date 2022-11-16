/* eslint-disable no-unused-vars */
import React from 'react';
import { FilesT } from 'store/manage-mode/manageSt';
import { IconButton, Stack, Link, Typography } from '@mui/material';
import { Clear, AttachFile } from '@mui/icons-material';

const File: React.FC<{ file: FilesT; handler: (id: number) => void }> = ({ file, handler }) => {
  const reg = /.+(\.jpg|\.jpeg|\.gif|\.png|\.raw|\.tiff|\.webp)$/i;
  const link = `${process.env.NEXT_PUBLIC_SERVER_URL}/files/${file.filename}`;

  return (
    <Stack
      sx={{
        m: 1,
        flex: '1 1 400px',
        position: 'relative',
      }}
    >
      <Link
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        target='_blank'
        href={link}
      >
        <Stack
          alignItems='center'
          justifyContent='center'
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '300px',
            backgroundColor: '#333',
          }}
        >
          {reg.test(file.filename) ? (
            <img src={link} width='100%' height='100%' alt={file.filename} />
          ) : (
            <AttachFile sx={{ width: '100px', height: '100px' }} />
          )}
        </Stack>
      </Link>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          left: 0,
          bottom: 0,
          p: '0 15px',
          width: '100%',
          height: '50px',
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <Typography>{file.filename}</Typography>

        <IconButton onClick={() => handler(file.id)}>
          <Clear />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default File;
