import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { inject, observer } from 'mobx-react';
import { ManagePageT } from 'pages/manage-mode';
import { Close } from '@mui/icons-material';
import { formatAccessData } from 'utils/dataFormatting';
import UserSt from 'store/user/userSt';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Stack,
  FormControl,
} from '@mui/material';
import TextFieldPass from './TextFieldPass';
import AccessCheckbox from './AccessCheckbox';
import H from './H';

type FormDataT = {
  username: string;
  password: string;
  currentPerms: number[];
};

type ModerModalT = {
  userSt: UserSt;
};

const ModeratorModal = inject(
  'manageSt',
  'userSt',
)(
  observer((props) => {
    const {
      manageSt: {
        data: { globalPermissions },
        controlModals: { main, variant },
        moderator: { current, permissions, id },
        toggleModal,
        updateModerator,
        createModerator,
      },
      userSt: {
        settings: { sections },
      },
    }: ManagePageT & ModerModalT = props;

    const schema = yup.object().shape({
      username: yup.string().max(100).required('Name is a required field'),
      password:
        variant === 'creation'
          ? yup.string().max(100).required('Password is a required field!')
          : yup.string().max(100),
    });

    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormDataT>({
      mode: 'onChange',
      resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormDataT> = (data) => {
      toggleModal('main', false);

      const { currentPerms, username, password } = data;
      const oldPerms = permissions.map((p) => p.id);
      const newPerms = currentPerms.map(Number);

      const createModerData = {
        username,
        password,
        'append-perms': newPerms.filter((id) => !oldPerms.includes(id)),
      };

      if (id) {
        const updateModerData = {
          id,
          ...createModerData,
          'remove-perms': oldPerms.filter((id) => !newPerms.includes(id)),
        };

        updateModerator(updateModerData);
      } else {
        createModerator(createModerData);
      }
    };

    const availablePermissions = globalPermissions.map((p) => (
      <AccessCheckbox
        {...register('currentPerms')}
        key={p.id}
        value={p.id}
        text={p.name}
        disabledText='Вам недоступно это действие'
        disabled={!formatAccessData(sections, true).includes(p.name)}
        checked={!!permissions.filter((c) => c.id === p.id)[0]?.name}
      />
    ));

    useEffect(() => {
      reset();
    }, [current]);

    return (
      <Dialog open={main} onClose={() => toggleModal('main', false)}>
        <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <H color='white'>
                {variant === 'creation' ? 'Создать модератора' : 'Редактировать доступ'}
              </H>
              <IconButton onClick={() => toggleModal('main', false)}>
                <Close />
              </IconButton>
            </Stack>
          </DialogTitle>

          <DialogContent>
            <TextField
              margin='normal'
              fullWidth
              type='text'
              label='Name'
              variant='outlined'
              defaultValue={current}
              error={!!errors.username}
              autoFocus={variant === 'creation'}
              {...register('username')}
              helperText={errors.username?.message}
            />

            <TextFieldPass
              sx={{ pb: '10px' }}
              fullWidth
              margin='normal'
              variant='outlined'
              error={!!errors.password}
              {...register('password')}
              autoFocus={variant === 'editing'}
              helperText={errors.password?.message}
              label={variant === 'creation' ? 'Password' : 'New password'}
            />

            {availablePermissions}
          </DialogContent>

          <DialogActions>
            <Button fullWidth type='submit' variant='contained' sx={{ m: '0 10px 10px 10px' }}>
              Сохранить
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    );
  }),
);

export default ModeratorModal;
