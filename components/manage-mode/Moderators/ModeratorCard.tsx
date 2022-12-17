import React from 'react';
import Image from 'next/image';
import { ManagePageT } from 'pages/manage-mode/moderators';
import { inject, observer } from 'mobx-react';
import { ModeratorsT } from 'store/manage-mode/manageSt';
import { Stack, IconButton } from '@mui/material';
import ButtonC from 'kit/common/ButtonC';
import AboutModerator from './AboutModerator';

type ModeratorT = {
  moderator: ModeratorsT;
};

const ModeratorCard = inject(
  'manageSt',
  'userSt'
)(
  observer((props) => {
    const {
      userSt: {
        settings: { mode },
      },
      moderator: { id, username, permissions },
      manageSt: { toggleModal, changeModalVariant, changeUser },
    }: ManagePageT & ModeratorT = props;

    const editUserHandler = () => {
      changeModalVariant('editing');
      toggleModal('main', true);
      changeUser({ current: username, permissions, id });
    };

    const deleteUserHandler = () => {
      toggleModal('confirmation', true);
      changeUser({ current: username, permissions, id });
    };

    return (
      <AboutModerator
        id={id}
        username={username}
        sx={{ m: '8px', flex: '0 1 298px' }}
        permissions={permissions.map((p) => p.name)}
      >
        <Stack direction='row' mt='24px'>
          <ButtonC fullWidth sx={{ mr: '8px' }} onClick={editUserHandler}>
            Редактировать
          </ButtonC>

          <IconButton
            sx={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              transition: 'background 0.2s ease-in-out',
              backgroundColor: mode === 'light' ? '#F5F5F5' : '#202020',

              '&:hover': {
                backgroundColor: mode === 'light' ? '#F5F5F5' : '#202020',
              },
            }}
            onClick={deleteUserHandler}
          >
            <Image
              width={16}
              height={17}
              quality={100}
              src='/icons/delete.svg'
              alt='удалить модератора'
            />
          </IconButton>
        </Stack>
      </AboutModerator>
    );
  })
);

export default ModeratorCard;
