import React from 'react';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';
import FormQA from 'components/qa/FormQA';
import Layout from 'kit/layout/Layout';
import { Box } from '@mui/material';

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
        <Box height='100vh'>{sections['quality assurance']?.emailing && <FormQA />}</Box>
      </Layout>
    );
  })
);

export default QAPage;
