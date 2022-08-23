import { yupResolver } from '@hookform/resolvers/yup';
import React, { ChangeEvent, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { inject, observer } from 'mobx-react';
import { ManagePageT } from 'pages/manage-mode';
import { Close } from '@mui/icons-material';
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
import { formatAccessData } from '../../utils/dataFormatting';

type FormDataT = {
  username: string;
  password: string;
};

type PermsT = {
  'append-perms': Set<number>;
  'remove-perms': Set<number>;
};

type UserModalT = {
  userSt: UserSt;
};

const UserModal = inject(
  'manageSt',
  'userSt'
)(
  observer((props) => {
    const {
      manageSt: {
        data: { globalPermissions },
        controlModals: { main, variant },
        user: { current, permissions, id },
        toggleModal,
        updateModerator,
        createModerator,
      },
      userSt: {
        settings: { sections },
      },
    }: ManagePageT & UserModalT = props;

    const perms: PermsT = {
      'append-perms': new Set(),
      'remove-perms': new Set(),
    };

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
      const resultData = { ...data, 'append-perms': Array.from(perms['append-perms']) };

      if (id) {
        toggleModal('main', false);
        updateModerator({ id, ...resultData, 'remove-perms': Array.from(perms['remove-perms']) });
      } else {
        toggleModal('main', false);
        createModerator(resultData);
      }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const id = +e.currentTarget.value;

      if (e.currentTarget.checked) {
        if (perms['remove-perms'].has(id)) {
          perms['remove-perms'].delete(id);
        }

        perms['append-perms'].add(id);
      } else {
        if (perms['append-perms'].has(id)) {
          perms['append-perms'].delete(id);
        }

        perms['remove-perms'].add(id);
      }
    };

    const availablePermissions = globalPermissions.map((p) => (
      <AccessCheckbox
        key={p.id}
        value={p.id}
        text={p.name}
        onChange={onChange}
        disabledText='Вам недоступно это действие'
        disabled={!formatAccessData(sections, true).includes(p.name)}
        checked={!!permissions.filter((c) => c.id === p.id)[0]?.name}
      />
    ));

    useEffect(() => {
      reset();
      perms['append-perms'].clear();
      perms['remove-perms'].clear();
    }, [current]);

    return (
      <Dialog open={main} onClose={() => toggleModal('main', false)}>
        <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Stack direction='row' alignItems='center' justifyContent='space-between'>
              <H color='white'>
                {variant === 'creation' ? 'Создать пользователя' : 'Редактировать доступ'}
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
  })
);

export default UserModal;
