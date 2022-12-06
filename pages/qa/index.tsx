import React from 'react';
import { inject, observer } from 'mobx-react';
import NotEnoughRights from 'kit/Layout/NotEnoughRights';
import UserSt from 'store/user/userSt';
import FormQA from 'components/Email/Form';
import MainLayout from 'kit/Layout/MainLayout';

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
      <MainLayout title='Тестирование'>
        {sections['quality assurance']?.emailing && <FormQA />}
        {!sections['quality assurance']?.emailing && <NotEnoughRights />}
      </MainLayout>
    );
  })
);

export default QAPage;
