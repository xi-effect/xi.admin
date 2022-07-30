/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import { useRouter, NextRouter } from 'next/router';
import Image from 'next/image';

import {
  Stack,
  // Link,
  useMediaQuery,
  Box,
  Button,
  Paper,
} from '@mui/material';

import { motion } from 'framer-motion';
import { inject, observer } from 'mobx-react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';

const schema = yup
  .object({
    useremail: yup.string().email().max(100),
    testeremail: yup.string().email().max(100).required(),
    type: yup.string().max(100).required(),
  })
  .required();

type Props = {
  rootStore?: any;
};

const Form: React.FC<Props> = inject('authorizationSt')(
  observer((props) => {
    const { rootStore } = props;
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    // @ts-ignore
    const mobileImage: boolean = useMediaQuery((theme) => theme.breakpoints.down('md'));
    // const router: NextRouter = useRouter();

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
      rootStore.fetchData(`${rootStore.url}/mub/sign-in/`, "POST", { "user-email": data.useremail, "tester-email": data.testeremail, "type": data.type })
        .then((data) => {
          console.log("data", data);
        });
    };

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          zIndex: 0,
        }}>
        <Paper
          elevation={24}
          sx={{
            mt: 4,
            zIndex: 500,
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ width: '100%' }}>
              <Image
                alt="alt"
                src="/assets/auth/Login.svg"
                quality={100}
                width={mobileImage ? 312 : 456}
                height={mobileImage ? 312 : 456}
              />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  width: '100%',
                  maxWidth: '386px',
                  mt: mobileImage ? '-16px' : '-32px',
                  pr: 1,
                  pl: 1,
                }}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="filled"
                      error={
                        errors?.useremail?.type
                      }
                      type="text"
                      fullWidth
                      label="user-email"
                      helperText={`
                      ${errors?.username?.type === 'email' ? 'Введите корректный e-mail' : ''}
                      `}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="testemail"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="filled"
                      fullWidth
                      label="Пароль"
                      type='text'
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextFieldCustom
                      variant="filled"
                      fullWidth
                      label="Пароль"
                      type='text'
                      {...field}
                    />
                  )}
                />
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', pt: 2, pb: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    type="submit"
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
                    }}>
                    Отправить
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Stack>
    );
  }),
);

export default Form;
