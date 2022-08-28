import { ManagePageT } from 'pages/manage-mode';
import { inject, observer } from 'mobx-react';
import {
  BugReport,
  ManageAccounts,
  Clear,
  ModeEdit,
  FormatListBulleted,
} from '@mui/icons-material';
import { ModeratorsT } from 'store/manage-mode/manageSt';
import { Stack, Paper, Avatar, IconButton, Tooltip } from '@mui/material';
import H from './H';

type ModeratorT = {
  moderator: ModeratorsT;
};

const Moderator = inject('manageSt')(
  observer((props) => {
    const {
      moderator: { id, username, permissions },
      manageSt: { toggleModal, changeModalVariant, changeUser },
    }: ManagePageT & ModeratorT = props;

    const access = permissions.length ? permissions.map((p) => p.name) : undefined;

    const icon = access?.map((n) => {
      if (n === 'emailing') return <BugReport fontSize='large' />;
      if (n === 'manage mods' || n === 'manage' || n === 'manage files')
        return <ManageAccounts fontSize='large' />;

      return null;
    })[0];

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
      <Paper
        elevation={4}
        sx={{
          width: '250px',
          margin: '10px',
          padding: '15px',
          backgroundColor: 'background.main',
        }}
      >
        <Stack mb={4} direction='row' alignItems='flex-start' justifyContent='space-between'>
          <Tooltip placement='top' title='Редактировать доступ'>
            <IconButton aria-label='change access' onClick={editUserHandler}>
              <ModeEdit />
            </IconButton>
          </Tooltip>

          <Avatar sx={{ mt: '40px', width: '70px', height: '70px' }}>{icon}</Avatar>

          <Tooltip placement='top' title='Удалить модератора'>
            <IconButton aria-label='delete user' onClick={deleteUserHandler}>
              <Clear />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack mb={2} direction='row' justifyContent='space-between'>
          <H color='white'>Name</H>
          <H>{username}</H>
        </Stack>

        <Stack mb={2} direction='row' justifyContent='space-between'>
          <H color='white'>Id</H>
          <H>{id}</H>
        </Stack>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <H color='white'>Access</H>

          {access && access.length > 1 ? (
            <Tooltip
              placement='top'
              title={access.map((a, i) => (
                <H color='white' key={i}>
                  {a}
                </H>
              ))}
            >
              <Stack direction='row' alignItems='center' sx={{ cursor: 'pointer' }}>
                List <FormatListBulleted fontSize='small' sx={{ ml: '10px' }} />
              </Stack>
            </Tooltip>
          ) : (
            <H>{access ? access.join(' ') : 'No access'}</H>
          )}
        </Stack>
      </Paper>
    );
  }),
);

export default Moderator;
