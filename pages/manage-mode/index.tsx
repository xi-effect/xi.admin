import React, { useEffect } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import PageHeader from 'kit/Layout/PageHeader';
import ManageSt, { UsersT } from 'store/manage-mode/manageSt';
import User from 'components/ManageMode/User';
import UserModal from 'components/ManageMode/UserModal';
import { Add } from '@mui/icons-material';
import AreYouSureModal from 'components/ManageMode/AreYouSureModal';

export type ManagePageT = {
  manageSt: ManageSt;
};

const ManagePage = inject('manageSt')(
  observer((props) => {
    const {
      manageSt: {
        data,
        changeUser,
        toggleModal,
        getModerators,
        getPermissions,
        changeModalVariant,
      },
    }: ManagePageT = props;

    const onClick = () => {
      changeUser(null);
      changeModalVariant('creation');
      toggleModal('main', true);
    };

    const users = data.users.map((u: UsersT) => <User key={u.id} users={u} />);

    useEffect(() => {
      getModerators();
      getPermissions();
    }, []);

    return (
      <Layout title='Управление'>
        <Navigation>
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='center'
            spacing={0}
            sx={{
              width: '100%',
              height: '100%',
              m: 0,
              p: '10px 0',
              position: 'relative',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
          >
            <PageHeader title='Управление пользователями' />

            <Stack m='20px 0'>
              <Button onClick={onClick} variant='contained' size='large'>
                Создать пользователя
                <Add sx={{ ml: '10px' }} />
              </Button>
            </Stack>

            <Box sx={{ width: '100%' }}>
              <Stack
                justifyContent='space-around'
                direction='row'
                flexWrap='wrap'
                sx={{ m: '0 auto', maxWidth: '900px' }}
              >
                {users}
              </Stack>
            </Box>
          </Stack>

          <UserModal />

          <AreYouSureModal />
        </Navigation>
      </Layout>
    );
  })
);

export default ManagePage;
