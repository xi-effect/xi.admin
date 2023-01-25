/* eslint-disable no-unused-vars */
import React from 'react';
import ManageSt, { FilesT } from 'store/manage-mode/manageSt';
import { IconButton, Link, Box } from '@mui/material';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';
import Image from 'next/image';

type FileT = {
  manageSt: ManageSt;
  userSt: UserSt;
  file: FilesT;
  deleteFiles: (id: number) => void;
};

const File = inject(
  'userSt',
  'manageSt'
)(
  observer((props) => {
    const {
      file,
      manageSt: { toggleModal, changeFile },
      userSt: {
        settings: { mode },
      },
    }: FileT = props;

    const link = `${process.env.NEXT_PUBLIC_SERVER_URL}/files/${file.filename}`;

    const changeFileHandler = () => {
      toggleModal('confirmation', true);
      changeFile({ current: file.filename, id: file.id });
    };

    return (
      <Link
        href={link}
        target='_blank'
        sx={{
          m: '8px',
          p: '16px',
          width: '298px',
          height: '312px',
          display: 'flex',
          fontWeight: 500,
          borderRadius: '8px',
          textDecoration: 'none',
          flexDirection: 'column',
          transition: 'background 0.2s ease-in-out',
          color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
          backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
        }}
      >
        <Box position='relative' flex='1 1 auto'>
          <Box
            sx={{
              width: '90%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              position: 'absolute',
              textOverflow: 'ellipsis',
            }}
          >
            {file.filename}
          </Box>
        </Box>

        <IconButton
          onClick={(e) => {
            changeFileHandler();
            e.preventDefault();
          }}
          sx={{
            ml: 'auto',
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            transition: 'background 0.2s ease-in-out',
            backgroundColor: mode === 'light' ? '#F5F5F5' : '#202020',

            '&:hover': {
              backgroundColor: '#cacaca',
            },
          }}
        >
          <Image
            width={16}
            height={17}
            quality={100}
            src='/icons/delete.svg'
            alt='удалить модератора'
          />
        </IconButton>
      </Link>
    );
  })
);

export default File;
