import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { inject, observer } from 'mobx-react';
import ManageSt, { ModeratorsT } from 'store/manage-mode/manageSt';
import Moderator from 'components/manage-mode/Moderators/Moderator';
import ModeratorModal from 'components/manage-mode/Moderators/ModeratorModal';
import { Add } from '@mui/icons-material';
import AreYouSureModal from 'components/manage-mode/Moderators/AreYouSureModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'utils/debounce';
import Layout from 'kit/layout/Layout';

export type ManagePageT = {
  manageSt: ManageSt;
};

const Moderators = inject('manageSt')(
  observer((props) => {
    const {
      manageSt: {
        storage: { moderators },
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

    const moderatorsJSX = moderators.data.map((u: ModeratorsT) => (
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
      <Layout title='Управление модераторами'>
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
            hasMore={moderators['has-next']}
            dataLength={moderators.data.length}
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
              {moderatorsJSX}
            </Stack>
          </InfiniteScroll>
        </Box>

        <ModeratorModal />
        <AreYouSureModal />
      </Layout>
    );
  })
);

export default Moderators;
