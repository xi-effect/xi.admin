import React from 'react';
import Form from 'components/Email/Form';
import { Stack } from '@mui/material';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import { inject, observer } from 'mobx-react';
import { checkUserPermissions } from 'utils/checkPermissions';
import NotEnoughRights from 'kit/Layout/NotEnoughRights';

const QAPage = inject('userSt')(
  observer(({ userSt }) => {
    const {
      settings: { sections },
    } = userSt;

    return (
      <Layout title='Тестирование'>
        <Navigation>
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing={0}
            sx={{
              width: '100%',
              m: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {checkUserPermissions({ sections, arg: 'emailing' }) && <Form />}
            {!checkUserPermissions({ sections, arg: 'emailing' }) && <NotEnoughRights />}
          </Stack>
        </Navigation>
      </Layout>
    );
  })
);

export default QAPage;
