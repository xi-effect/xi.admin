import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Layout from 'kit/Layout/Layout';
import Navigation from 'kit/Navigation/Navigation';
import PageHeader from 'kit/Layout/PageHeader';
import ManageSt, { ModeratorsT } from 'store/manage-mode/manageSt';
import Moderator from 'components/ManageMode/Moderator';
import ModeratorModal from 'components/ManageMode/ModeratorModal';
import { Add } from '@mui/icons-material';
import AreYouSureModal from 'components/ManageMode/AreYouSureModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'utils/debounce';

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

    const [searchQuery, setSearchQuery] = useState<string>('');

    const createUser = () => {
      changeUser(null);
      changeModalVariant('creation');
      toggleModal('main', true);
    };

    const moderators = data.moderators.map((u: ModeratorsT) => (
      <Moderator key={u.id} moderator={u} />
    ));

    const searchModerators = debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);

      getModerators(e.target.value, true);
    });

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
            <PageHeader title='Управление модераторами' />

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
                label='Поиск модератора'
                onChange={searchModerators}
                sx={{ m: '10px 30px', flex: '0 1 500px' }}
              />

              <Button onClick={createUser} variant='contained' size='large'>
                Создать модератора
                <Add sx={{ ml: '10px' }} />
              </Button>
            </Stack>

            <Box sx={{ width: '100%' }}>
              <InfiniteScroll
                next={() => getModerators(searchQuery)}
                hasMore={data['has-next']}
                dataLength={data.moderators.length}
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
                  {moderators}
                </Stack>
              </InfiniteScroll>
            </Box>
          </Stack>

          <ModeratorModal />
          <AreYouSureModal />
        </Navigation>
      </Layout>
    );
  })
);

export default ManagePage;
