import React from 'react';
import Image from 'next/image';
import {
  Stack,
  useMediaQuery,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
  Theme,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import AuthorizationSt from 'store/user/authorizationSt';

const schema = yup
  .object({
    username: yup.string().max(100).required(),
    password: yup.string().min(6).max(100).required(),
  })
  .required();

type SingInFormT = {
  authorizationSt: AuthorizationSt;
};

const SingInForm = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt }: SingInFormT = props;

    const mobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mobileImage: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      trigger();
      authorizationSt.loginUser(data, trigger);
    };

    return (
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          position: 'relative',
          width: 'calc(100% - 32px)',
          maxWidth: 512,
          zIndex: 0,
        }}
      >
        <Typography component='h1' variant='h4'>
          Вход
        </Typography>
        <Paper
          elevation={24}
          sx={{
            mt: 4,
            zIndex: 500,
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}
        >
          <Box component='form' onSubmit={handleSubmit(onSubmit)}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction='column'
              justifyContent='center'
              alignItems='center'
              sx={{ width: '100%' }}
            >
              <Image
                alt='alt'
                src='/assets/auth/Login.svg'
                quality={100}
                width={mobileImage ? 312 : 456}
                height={mobileImage ? 312 : 456}
              />
              <Stack
                direction='column'
                justifyContent='center'
                alignItems='center'
                spacing={1}
                sx={{
                  width: '100%',
                  maxWidth: '386px',
                  mt: mobileImage ? '-16px' : '-32px',
                  pr: 1,
                  pl: 1,
                }}
              >
                <Controller
                  name='username'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextFieldCustom
                      variant='filled'
                      error={
                        errors?.username?.type === 'username' ||
                        authorizationSt.login.error === "User doesn't exist"
                      }
                      type='text'
                      fullWidth
                      label='Имя Пользователя'
                      helperText={`
                      ${errors?.username?.type === 'email' ? 'Введите корректный e-mail' : ''}
                      `}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <TextFieldCustom
                      variant='filled'
                      error={
                        errors?.password?.type === 'min' ||
                        errors?.password?.type === 'required' ||
                        authorizationSt.login.error === 'Wrong password'
                      }
                      fullWidth
                      label='Пароль'
                      type={showPassword ? 'text' : 'password'}
                      helperText={`
                      ${errors?.password?.type === 'min' ? 'Минимальное число символов - 6' : ''}
                      ${
                        errors?.password?.type === 'max' ? 'Максимальное число символов - 100' : ''
                      } 
                      ${
                        authorizationSt.login.error === 'Wrong password' && !errors?.password?.type
                          ? 'Неверный Пароль'
                          : ''
                      } 
                      ${
                        authorizationSt.login.error === 'Server error' && !errors?.password?.type
                          ? 'Ошибка сервера'
                          : ''
                      }
                      `}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment sx={{ mr: 0.5 }} position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowPassword(!showPassword)}
                              edge='end'
                              size='large'
                            >
                              {showPassword ? (
                                <Visibility sx={{ color: 'text.secondary' }} />
                              ) : (
                                <VisibilityOff sx={{ color: 'text.secondary' }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      {...field}
                    />
                  )}
                />
                <Stack
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                  sx={{ width: '100%', pt: 2, pb: 4 }}
                >
                  <Button
                    variant='contained'
                    size='large'
                    type='submit'
                    sx={{
                      '&.MuiButton-root': {
                        fontFamily: 'Roboto',
                        fontSize: '15px',
                        lineHeight: '26px',
                        letterSpacing: '0.46000000834465027px',
                        width: mobile ? '196px' : '196px',
                        height: mobile ? '42px' : '42px',
                        color: 'text.primary',
                        bgcolor: 'secondary.main',
                        borderRadius: mobile ? '62px' : '88px',
                        '&:hover': {
                          bgcolor: 'secondary.dark',
                        },
                        boxShadow: 2,
                      },
                    }}
                  >
                    ВОЙТИ
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  })
);

export default SingInForm;
