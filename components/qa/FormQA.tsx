import React, { useState } from 'react';
import * as yup from 'yup';
import { Box, Button, MenuItem, Stack } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RootStore from 'store/rootStore';
import Input from 'kit/common/Input';
import UserSt from 'store/user/userSt';
import ButtonC from 'kit/common/ButtonC';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuC from 'kit/common/MenuC';

type FormT = {
  userEmail: string;
  testerEmail: string;
};

type FormQAT = {
  userSt: UserSt;
  rootStore: RootStore;
};

type Type = 'confirm' | 'change' | 'password';

const schema = yup.object().shape({
  userEmail: yup.string().email('Неверный формат').max(100).required('useremail'),
  testerEmail: yup.string().email('Неверный формат').max(100).required('testeremail'),
});

const FormQA = inject(
  'rootStore',
  'userSt'
)(
  observer((props) => {
    const {
      rootStore,
      userSt: {
        settings: { mode },
      },
    }: FormQAT = props;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormT>({
      resolver: yupResolver(schema),
    });

    const [type, setType] = useState<Type>('confirm');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const setActiveType = (type: Type) => {
      setType(type);
      setAnchorEl(null);
    };

    const onSubmit = async (data: FormT) => {
      const res = await rootStore.fetchData(`/mub/emailer/send/`, 'POST', {
        'user-email': data.userEmail,
        'tester-email': data.testerEmail,
        type,
      });

      if (
        res.a !== 'User not found' ||
        res.a === 'Unsupported type' ||
        res.a === 'Not sufficient permissions'
      ) {
        rootStore.showSnackbar(`Письмо отправлено на ${data.testerEmail}`, 'success');
      }
    };

    return (
      <Stack
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: '24px',
          width: '100%',
          borderRadius: '8px',
          transition: 'background 0.2s ease-in-out',
          bgcolor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
        }}
      >
        <Input
          fullWidth
          variant='outlined'
          placeholder='useremail'
          lightTheme={mode === 'light'}
          sx={{ marginBottom: '16px' }}
          error={!!errors.userEmail?.message}
          helperText={errors.userEmail?.message}
          {...register('userEmail')}
        />

        <Input
          fullWidth
          variant='outlined'
          placeholder='testeremail'
          lightTheme={mode === 'light'}
          sx={{ marginBottom: '16px' }}
          error={!!errors.testerEmail?.message}
          helperText={errors.testerEmail?.message}
          {...register('testerEmail')}
        />

        <Button
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            height: '56px',
            p: '17px 20px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '16px !important',
            border: '1px solid #E6E6E6',
            textTransform: 'capitalize',
            color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
          }}
        >
          <Stack width='100%' direction='row' justifyContent='space-between'>
            <Box>{type}</Box>

            <KeyboardArrowDownIcon />
          </Stack>
        </Button>

        <ButtonC type='submit'>Отправить</ButtonC>

        <MenuC
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          sx={{
            '& .MuiPaper-root': {
              width: anchorEl?.offsetWidth,
              color: mode === 'light' ? '#000' : '#fff',
              backgroundColor: mode === 'light' ? '#fff' : '#202020',
            },

            '& .MuiPaper-elevation': {
              border: mode === 'light' ? 'none' : '1px solid #E6E6E6',
            },
          }}
        >
          <MenuItem onClick={() => setActiveType('confirm')}>Confirm</MenuItem>
          <MenuItem onClick={() => setActiveType('password')}>Password</MenuItem>
          <MenuItem onClick={() => setActiveType('change')}>Change</MenuItem>
        </MenuC>
      </Stack>
    );
  })
);

export default FormQA;
