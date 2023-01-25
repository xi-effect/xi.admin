import React from 'react';
import FormQA from 'components/qa/FormQA';
import Layout from 'kit/layout/Layout';
import { Box } from '@mui/material';

const QAPage = () => (
  <Layout title='Тестирование'>
    <Box height='100vh'>
      <FormQA />
    </Box>
  </Layout>
);

export default QAPage;
