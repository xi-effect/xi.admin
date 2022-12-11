import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { inject, observer } from 'mobx-react';
import { ManagePageT } from 'pages/manage-mode/moderators';
import { Close } from '@mui/icons-material';
import { formatAccessData } from 'utils/dataFormatting';
import UserSt from 'store/user/userSt';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  FormControl,
  Box,
} from '@mui/material';
import Input from 'kit/common/Input';
import ButtonC from 'kit/common/ButtonC';
import AccessCheckbox from './AccessCheckbox';

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
  'userSt'
)(
  observer((props) => {
    const {
      manageSt: {
        storage: {
          moderators: { globalPermissions },
        },
        controlModals: { main, variant },
        currentModerator: { current, permissions, id },
        toggleModal,
        updateModerator,
        createModerator,
      },
      userSt: {
        settings: { sections, mode },
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
      const newPerms = currentPerms.length ? currentPerms.map(Number) : [];

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
        lightTheme={mode === 'light'}
        disabledText='Вам недоступно это действие'
        disabled={!formatAccessData(sections).includes(p.name)}
        checked={!!permissions.filter((c) => c.id === p.id)[0]?.name}
      />
    ));

    useEffect(() => {
      reset();
    }, [current]);

    return (
      <Dialog
        sx={{
          '& .MuiPaper-root,.MuiDialog-paper ': {
            p: '32px',
            maxWidth: '420px',
            borderRadius: '16px',
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
            border: mode === 'light' ? '1px solid #E6E6E6' : '1px solid #666666',
          },
          '& .MuiTypography-root,.MuiDialogContent-root,.MuiDialogActions-root ': {
            p: '0',
          },
        }}
        open={main}
        onClose={() => toggleModal('main', false)}
      >
        <FormControl component='form' onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            <Box
              mb='32px'
              lineHeight='32px'
              fontSize='24px'
              fontWeight={600}
              textAlign='center'
              position='relative'
              color={mode === 'light' ? '#000' : '#fff'}
            >
              {variant === 'creation' ? 'Создать модератора' : 'Редактировать доступ'}

              <IconButton
                sx={{
                  p: 0,
                  top: '-17px',
                  right: '-17px',
                  position: 'absolute',
                }}
                onClick={() => toggleModal('main', false)}
              >
                <Close sx={{ color: '#999', height: '24px', width: '24px' }} />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
              Логин
            </Box>

            <Input
              fullWidth
              sx={{
                mb: '16px',
              }}
              variant='outlined'
              defaultValue={current}
              error={!!errors.username}
              lightTheme={mode === 'light'}
              autoFocus={variant === 'creation'}
              helperText={errors.username?.message}
              {...register('username')}
            />

            <Box component='span' mb='8px' color='grayscale.40' fontSize={16}>
              Пароль
            </Box>

            <Input
              password
              fullWidth
              variant='outlined'
              sx={{ mb: '24px' }}
              error={!!errors.password}
              lightTheme={mode === 'light'}
              autoFocus={variant === 'editing'}
              helperText={errors.password?.message}
              {...register('password')}
            />

            {availablePermissions}
          </DialogContent>

          <DialogActions>
            <ButtonC fullWidth type='submit' sx={{ mt: '24px' }}>
              Создать
            </ButtonC>
          </DialogActions>
        </FormControl>
      </Dialog>
    );
  })
);

export default ModeratorModal;
