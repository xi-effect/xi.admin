import React, { ChangeEvent, useEffect } from 'react';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import PageHeader from 'kit/Layout/PageHeader';
import ManageSt, { UsersT } from 'store/manage-mode/manageSt';
import User from 'components/ManageMode/User';
import UserModal from 'components/ManageMode/UserModal';
import { Add } from '@mui/icons-material';
import AreYouSureModal from 'components/ManageMode/AreYouSureModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from '../../utils/debounce';

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
        searchUser,
      },
    }: ManagePageT = props;

    const createUser = () => {
      changeUser(null);
      changeModalVariant('creation');
      toggleModal('main', true);
    };

    const users = data.users.map((u: UsersT) => <User key={u.id} users={u} />);

    const search = debounce((e: ChangeEvent<HTMLInputElement>) => searchUser(e.target.value));

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

            <Stack
              m='20px 0'
              direction='row'
              alignItems='center'
              justifyContent='center'
              flexWrap='wrap'
              sx={{ width: '100%' }}
            >
              <TextField
                size='small'
                variant='outlined'
                onChange={search}
                label='Найти пользователя'
                sx={{ m: '10px 30px', flex: '0 1 500px' }}
              />

              <Button onClick={createUser} variant='contained' size='large'>
                Создать пользователя
                <Add sx={{ ml: '10px' }} />
              </Button>
            </Stack>

            <Box sx={{ width: '100%' }}>
              <InfiniteScroll
                next={getModerators}
                hasMore={data['has-next']}
                dataLength={data.users.length}
                loader={
                  <CircularProgress
                    sx={{
                      top: '50%',
                      left: '50%',
                      zIndex: '100',
                      position: 'fixed',
                      transform: 'translate(-50%,-50%)',
                    }}
                    size={80}
                  />
                }
              >
                <Stack
                  direction='row'
                  flexWrap='wrap'
                  justifyContent='space-around'
                  sx={{ m: '0 auto', maxWidth: '900px' }}
                >
                  {users}
                </Stack>
              </InfiniteScroll>
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
