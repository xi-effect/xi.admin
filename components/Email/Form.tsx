/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import { Stack, useMediaQuery, Button, Paper, NativeSelect } from '@mui/material';

import { inject, observer } from 'mobx-react';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

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

const Form: React.FC<Props> = inject('rootStore')(
  observer((props) => {
    const { rootStore } = props;
    // @ts-ignore
    const mobile: boolean = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    const { enqueueSnackbar } = useSnackbar();

    const {
      control,
      handleSubmit,
      trigger,
      // formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
      trigger();
      rootStore
        .fetchData(`${rootStore.url}/mub/emailer/send/`, 'POST', {
          'user-email': data.useremail,
          'tester-email': data.testeremail,
          type: data.type,
        })
        .then((data) => {
          if (data.a === 'User not found') {
            enqueueSnackbar('User not found', {
              variant: 'info',
            });
          } else if (data.a === 'Unsupported type') {
            enqueueSnackbar('Unsupported type', {
              variant: 'info',
            });
          } else if (data.a === 'Not sufficient permissions') {
            enqueueSnackbar('Not sufficient permissions', {
              variant: 'info',
            });
          } else {
            enqueueSnackbar(`Успех! Письмо отправлено на ${data.testeremail}`, {
              variant: 'info',
            });
          }
        });
    };

    return (
      <Stack
        direction='column'
        justifyContent='flex-start'
        alignItems='center'
        sx={{
          zIndex: 0,
        }}
      >
        <Paper
          elevation={24}
          sx={{
            p: 2,
            mt: 4,
            zIndex: 500,
            bgcolor: 'grey.800',
            borderRadius: '20px',
          }}
        >
          <Stack
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            direction='column'
            justifyContent='center'
            alignItems='center'
            sx={{ width: '100%' }}
          >
            <Controller
              name='useremail'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextFieldCustom
                  variant='filled'
                  type='text'
                  fullWidth
                  label='useremail'
                  {...field}
                />
              )}
            />
            <Controller
              name='testeremail'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <TextFieldCustom
                  variant='filled'
                  fullWidth
                  label='testeremail'
                  type='text'
                  {...field}
                />
              )}
            />
            <Controller
              name='type'
              control={control}
              defaultValue='confirm'
              render={({ field }) => (
                <NativeSelect
                  variant='filled'
                  sx={{
                    mt: 1,
                  }}
                  fullWidth
                  {...field}
                >
                  <option value='confirm'>confirm</option>
                  <option value='password'>password</option>
                  <option value='change'>change</option>
                </NativeSelect>
              )}
            />
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
                  mt: 2,
                },
              }}
            >
              Отправить
            </Button>
          </Stack>
        </Paper>
      </Stack>
    );
  })
);

export default Form;
