import React from 'react';
import { Stack, useMediaQuery, Button, NativeSelect, Box, Theme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';

import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';
import RootStore from 'store/rootStore';

const schema = yup
  .object({
    useremail: yup.string().email().max(100),
    testeremail: yup.string().email().max(100).required(),
    type: yup.string().max(100).required(),
  })
  .required();

type FormQAT = {
  rootStore: RootStore;
};

const FormQA = inject('rootStore')(
  observer((props) => {
    const { rootStore }: FormQAT = props;

    const mobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { enqueueSnackbar } = useSnackbar();

    const {
      control,
      handleSubmit,
      trigger,
      // formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
      trigger();

      const response = await rootStore.fetchData(`/mub/emailer/send/`, 'POST', {
        'user-email': data.useremail,
        'tester-email': data.testeremail,
        type: data.type,
      });

      if (response.a === 'User not found') {
        enqueueSnackbar('User not found', {
          variant: 'info',
        });
      } else if (response.a === 'Unsupported type') {
        enqueueSnackbar('Unsupported type', {
          variant: 'info',
        });
      } else if (response.a === 'Not sufficient permissions') {
        enqueueSnackbar('Not sufficient permissions', {
          variant: 'info',
        });
      } else {
        enqueueSnackbar(`Успех! Письмо отправлено на ${data.testeremail}`, {
          variant: 'info',
        });
      }
    };

    return (
      <Box
        sx={{
          p: 2,
          mt: 4,
          width: '100%',
        }}
      >
        <Stack
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          direction='column'
          justifyContent='center'
          alignItems='center'
          sx={{
            padding: '20px',
            margin: '0 auto',
            backgroundColor: '#424242',
            maxWidth: '450px',
            borderRadius: '10px',
          }}
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
                sx={{ margin: '25px 0' }}
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
                mt: 4,
              },
            }}
          >
            Отправить
          </Button>
        </Stack>
      </Box>
    );
  })
);

export default FormQA;
