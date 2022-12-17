import React from 'react';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';
import FormQA from 'components/Email/Form';
import Layout from 'kit/Layout/Layout';
import { Stack } from '@mui/material';

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
        <Stack justifyContent='center' direction='row' flexWrap='wrap'>
          {sections['quality assurance']?.emailing && <FormQA />}
        </Stack>
      </Layout>
    );
  })
);

export default QAPage;
