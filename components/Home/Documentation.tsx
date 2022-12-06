import React from 'react';
import CardLayout from 'kit/Layout/CardLayout';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import LinkC from 'kit/common/LinkC';
import { inject, observer } from 'mobx-react';
import RootStore from 'store/rootStore';
import { copyToClipboard } from 'utils/copyToClipboard';

type DocumentationT = {
  rootStore: RootStore;
};

const Documentation = inject('rootStore')(
  observer((props) => {
    const { rootStore }: DocumentationT = props;

    return (
      <CardLayout>
        <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
          Документация
        </Box>

        <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
          Логин
        </Box>

        <Stack
          p='17px'
          mb='16px'
          fontSize={16}
          direction='row'
          borderRadius='8px'
          bgcolor='#F5F5F5'
          color='grayscale.100'
          justifyContent='space-between'
        >
          reader
          <Box sx={{ cursor: 'pointer' }} onClick={() => copyToClipboard(rootStore, 'reader')}>
            <Image
              width={24}
              height={24}
              quality={100}
              src='/icons/copy.svg'
              alt='скопировать текст'
            />
          </Box>
        </Stack>

        <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
          Пароль
        </Box>

        <Stack
          p='17px'
          mb='24px'
          fontSize={16}
          direction='row'
          bgcolor='#F5F5F5'
          borderRadius='8px'
          position='relative'
          color='grayscale.100'
          justifyContent='space-between'
        >
          <Box
            sx={{
              pr: '80px',
              width: '100%',
              overflow: 'hidden',
              position: 'absolute',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            5q9f5Kz6qzsj6jxwznSUeugEp8a5BWnd7R4JQb
          </Box>

          <Box
            sx={{
              ml: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => copyToClipboard(rootStore, '5q9f5Kz6qzsj6jxwznSUeugEp8a5BWnd7R4JQb')}
          >
            <Image
              width={24}
              height={24}
              quality={100}
              src='/icons/copy.svg'
              alt='скопировать пароль'
            />
          </Box>
        </Stack>

        <LinkC href='https://docs.xieffect.ru/'>Перейти</LinkC>
      </CardLayout>
    );
  })
);

export default Documentation;
