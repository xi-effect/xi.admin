import React from 'react';
import { Stack } from '@mui/material';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import { inject, observer } from 'mobx-react';
import NotEnoughRights from 'kit/Layout/NotEnoughRights';
import UserSt from 'store/user/userSt';
import FormQA from 'components/Email/Form';
import PageHeader from '../../kit/Layout/PageHeader';

type QAPageT = {
  userSt: UserSt;
};

const QAPage = inject('userSt')(
  observer((props) => {
    const {
      userSt: {
        settings: { sections },
      },
    }: QAPageT = props;

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
            <PageHeader title='Тестирование' />

            {sections['quality assurance']?.emailing && <FormQA />}
            {!sections['quality assurance']?.emailing && <NotEnoughRights />}
          </Stack>
        </Navigation>
      </Layout>
    );
  })
);

export default QAPage;
