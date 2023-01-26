import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Breakpoint, CircularProgress, Stack, Theme, useMediaQuery } from '@mui/material';
import { inject, observer } from 'mobx-react';
import ManageSt, { ModeratorsT } from 'store/manage-mode/manageSt';
import ModeratorCard from 'components/manage-mode/Moderators/ModeratorCard';
import ModeratorModal from 'components/manage-mode/Moderators/ModeratorModal';
import AreYouSureModal from 'components/manage-mode/Moderators/AreYouSureModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from 'utils/debounce';
import Layout from 'kit/layout/Layout';
import Input from 'kit/common/Input';
import ButtonC from 'kit/common/ButtonC';
import UserSt from 'store/user/userSt';
import Image from 'next/image';

export type ManagePageT = {
  manageSt: ManageSt;
  userSt: UserSt;
};

const Moderators = inject(
  'manageSt',
  'userSt'
)(
  observer((props) => {
    const {
      userSt: {
        settings: { mode },
      },
      manageSt: {
        changeUser,
        toggleModal,
        getModerators,
        getPermissions,
        deleteModerator,
        changeModalVariant,
        storage: { moderators },
        currentModerator: { id, current },
      },
    }: ManagePageT = props;

    const [searchQuery, setSearchQuery] = useState<string>('');
    const dl = useMediaQuery((theme: Theme) => theme.breakpoints.up('dl' as Breakpoint));
    const createUser = () => {
      changeUser(null);
      changeModalVariant('creation');
      toggleModal('main', true);
    };

    const moderatorsJSX = moderators.data.map((u: ModeratorsT) => (
      <ModeratorCard key={u.id} moderator={u} />
    ));

    const searchModerators = debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);

      getModerators(e.target.value, true);
    });

    const deleteModeratorHandler = () => {
      if (id) {
        deleteModerator(id);
        toggleModal('confirmation', false);
      }
    };

    useEffect(() => {
      getModerators();
      getPermissions();
    }, []);

    return (
      <Layout title='Управление модераторами'>
        <Box height={dl ? '100vh' : '100%'}>
          <Stack
            mb='32px'
            direction='row'
            alignItems='center'
            justifyContent='center'
            flexWrap={dl ? 'nowrap' : 'wrap'}
          >
            <Input
              fullWidth
              variant='outlined'
              placeholder='Поиск модератора'
              lightTheme={mode === 'light'}
              onChange={searchModerators}
              sx={{
                flex: '1 1 614px',
                mr: dl ? '16px' : 0,
                mb: dl ? 0 : '16px',
              }}
            />

            <ButtonC
              onClick={createUser}
              sx={{
                p: '0 26px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px !important',
                flex: dl ? '0 0 298px' : '1 1 100%',
              }}
            >
              <Box height='22px' mr='21px'>
                <Image
                  width={23}
                  height={22}
                  quality={100}
                  src='/icons/add.svg'
                  alt='создать модератора'
                />
              </Box>
              Создать модератора
            </ButtonC>
          </Stack>

          <Box sx={{ m: '-8px' }}>
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
              <Stack direction='row' flexWrap='wrap' justifyContent='center'>
                {moderatorsJSX.length ? (
                  moderatorsJSX
                ) : (
                  <Box
                    p='20px 0'
                    width='100%'
                    fontSize='25px'
                    fontWeight='500'
                    textAlign='center'
                    color={mode === 'light' ? 'grayscale.100' : 'grayscale.0'}
                  >
                    Модераторы отсутствуют
                  </Box>
                )}
              </Stack>
            </InfiniteScroll>
          </Box>

          <ModeratorModal />

          <AreYouSureModal
            content={current}
            title='Удалить модератора?'
            confirmHandler={deleteModeratorHandler}
          />
        </Box>
      </Layout>
    );
  })
);

export default Moderators;
