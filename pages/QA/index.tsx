import React from 'react';
import Form from 'components/Email/Form';
import { Stack } from '@mui/material';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import { inject, observer } from 'mobx-react';
import { SectionsDataT } from 'utils/dataFormatting';
import NotEnoughRights from 'kit/Layout/NotEnoughRights';

const QAPage = inject('userSt')(
  observer(({ userSt }) => {
    const {
      settings: { sections },
    }: { settings: { sections: SectionsDataT } } = userSt;

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
            {sections['quality assurance']?.emailing && <Form />}
            {!sections['quality assurance']?.emailing && <NotEnoughRights />}
          </Stack>
        </Navigation>
      </Layout>
    );
  })
);

export default QAPage;
