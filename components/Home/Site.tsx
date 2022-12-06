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

const Site = inject('rootStore')(
  observer((props) => {
    const { rootStore }: DocumentationT = props;

    return (
      <CardLayout>
        <Box component='span' mb='24px' fontSize={24} fontWeight={500}>
          Сайт
        </Box>

        <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
          Почта
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
          test@test.test
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => copyToClipboard(rootStore, 'test@test.test')}
          >
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
          borderRadius='8px'
          bgcolor='#F5F5F5'
          color='grayscale.100'
          justifyContent='space-between'
        >
          <Box
            sx={{
              mr: '15px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            123456
          </Box>

          <Box sx={{ cursor: 'pointer' }} onClick={() => copyToClipboard(rootStore, '123456')}>
            <Image
              width={24}
              height={24}
              quality={100}
              src='/icons/copy.svg'
              alt='скопировать пароль'
            />
          </Box>
        </Stack>

        <Stack direction='row' justifyContent='space-between'>
          <LinkC sx={{ flex: '0 0 49%' }} href='https://xieffect.ru/'>
            Prod
          </LinkC>

          <LinkC sx={{ flex: '0 0 49%' }} href='https://xieffect.netlify.app/'>
            PreProd
          </LinkC>
        </Stack>
      </CardLayout>
    );
  })
);

export default Site;
