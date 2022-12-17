import React from 'react';
import Image from 'next/image';
import * as yup from 'yup';
import { inject, observer } from 'mobx-react';
import { Stack, InputAdornment, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthorizationSt from 'store/user/authorizationSt';
import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import { Eyeon } from '@xieffect/base.icons.eyeon';
import Input from '../../kit/common/Input';

type SingInFormT = {
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

const SingInForm = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt }: SingInFormT = props;

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
          bgcolor: 'grayscale.0',
          border: '1px solid #E6E6E6',
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
          helperText={authorizationSt.login.username}
          error={!!errors.username?.message || !!authorizationSt.login.username}
          sx={{
            marginBottom: '16px',
            border: ' 1 px solid #E6E6E6',
            backgroundColor: 'grayscale.0',
          }}
          {...register('username')}
        />

        <Input
          fullWidth
          variant='outlined'
          placeholder='Пароль'
          helperText={authorizationSt.login.password}
          type={showPassword ? 'text' : 'password'}
          error={!!errors.password?.message || !!authorizationSt.login.password}
          sx={{
            marginBottom: '32px',
            border: ' 1 px solid #E6E6E6',
            backgroundColor: 'grayscale.0',
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

        <Button
          type='submit'
          variant='contained'
          sx={{
            fontSize: 18,
            width: '100%',
            height: '48px',
            fontWeight: 500,
            lineHeight: '22px',
            borderRadius: '8px',
            marginBottom: '16px',
            textTransform: 'capitalize',
            backgroundColor: 'primary.dark',
          }}
        >
          Войти
        </Button>

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
