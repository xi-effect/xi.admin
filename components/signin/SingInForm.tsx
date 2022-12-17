import React from 'react';
import Image from 'next/image';
import * as yup from 'yup';
import { inject, observer } from 'mobx-react';
import { Stack, InputAdornment, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthorizationSt from 'store/user/authorizationSt';
import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import Input from 'kit/common/Input';
import { Eyeon } from '@xieffect/base.icons.eyeon';
import UserSt from 'store/user/userSt';
import ButtonC from '../../kit/common/ButtonC';

type SingInFormT = {
  userSt: UserSt;
  authorizationSt: AuthorizationSt;
};

type FormT = {
  username: string;
  password: string;
};

const schema = yup.object().shape({
  username: yup.string().max(100).required('Никнейм'),
  password: yup.string().min(6).max(100).required('Пароль'),
});

const SingInForm = inject(
  'authorizationSt',
  'userSt'
)(
  observer((props) => {
    const {
      authorizationSt,
      userSt: {
        settings: { mode },
      },
    }: SingInFormT = props;

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormT>({
      resolver: yupResolver(schema),
    });
    const onSubmit = (data) => authorizationSt.loginUser(data);

    return (
      <Stack
        component='form'
        direction='column'
        alignItems='center'
        justifyContent='flex-start'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: '32px',
          m: '30px 15px',
          maxWidth: '420px',
          borderRadius: '16px',
          border: '1px solid #E6E6E6',
          transition: 'background 0.2s ease-in-out',
          bgcolor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
        }}
      >
        <Image alt='логотип xi.admin' src='/icons/logo.svg' quality={100} width={56} height={56} />

        <Box fontWeight={600} fontSize='24px' m='24px 0 32px 0'>
          Вход в аккаунт
        </Box>

        <Input
          fullWidth
          variant='outlined'
          placeholder='Никнейм'
          helperText={authorizationSt.loginErrors.username}
          error={!!errors.username?.message || !!authorizationSt.loginErrors.username}
          sx={{
            marginBottom: '16px',
            border: ' 1 px solid #E6E6E6',
          }}
          {...register('username')}
        />

        <Input
          fullWidth
          variant='outlined'
          placeholder='Пароль'
          helperText={authorizationSt.loginErrors.password}
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password?.message || !!authorizationSt.loginErrors.password}
          sx={{
            marginBottom: '32px',
            border: ' 1 px solid #E6E6E6',
          }}
          {...register('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' sx={{ mr: '7px' }}>
                <Box
                  width='24px'
                  height='24px'
                  borderRadius='8px'
                  sx={{ cursor: 'pointer' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <Eyeoff sx={{ color: 'grayscale.100' }} />
                  ) : (
                    <Eyeon sx={{ color: 'grayscale.100' }} />
                  )}
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <ButtonC fullWidth type='submit' sx={{ marginBottom: '16px' }}>
          Войти
        </ButtonC>

        <Box
          sx={{
            fontSize: '14px',
            textAlign: 'center',
            color: 'grayscale.40',
          }}
        >
          Не удается войти? Напиши своему Lead для&nbsp;восстановления доступа
        </Box>
      </Stack>
    );
  })
);

export default SingInForm;
