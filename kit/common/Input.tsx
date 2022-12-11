import React, { forwardRef, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Box, InputAdornment } from '@mui/material';
import { Eyeoff } from '@xieffect/base.icons.eyeoff';
import { Eyeon } from '@xieffect/base.icons.eyeon';

const Input = forwardRef<
  HTMLInputElement,
  TextFieldProps & { password?: boolean; lightTheme?: boolean }
>((props, ref) => {
  const { password, lightTheme, sx, error, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(!password);

  return (
    <TextField
      sx={{
        borderRadius: '8px',
        borderColor: lightTheme ? 'grayscale.0' : '#666',
        backgroundColor: lightTheme ? 'grayscale.0' : 'grayscale.100',
        transition: 'background 0.2s ease-in-out, border 0.2s ease-in-out,',

        '& .MuiInputBase-input': {
          color: lightTheme ? 'grayscale.100' : 'grayscale.0',
          transition: 'color 0.2s ease-in-out',
        },

        '& .MuiInputBase-root': {
          height: '56px',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '20px',
          borderRadius: '8px',

          '& .MuiOutlinedInput-notchedOutline:hover': {
            border: '1px solid #445AFF !important',
          },
        },

        '& .MuiInputBase-root:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#445AFF',
          },
        },

        '& .MuiInputBase-input::placeholder': {
          opacity: 1,
          paddingLeft: '1px',
          color: `${error ? '#F42D2D' : '#999'}`,
        },

        '& .MuiFormHelperText-root': {
          fontSize: 14,
          marginLeft: 0,
          fontWeight: 400,
          color: '#F42D2D',
          marginTop: '4px',
          lineHeight: '16px',
        },

        '& .MuiOutlinedInput-notchedOutline': {
          transition: 'border 0.2s ease',
          border: `1px solid ${error ? '#F42D2D' : '#E6E6E6'}`,
        },
        ...sx,
      }}
      type={showPassword ? 'text' : 'password'}
      InputProps={
        password
          ? {
              endAdornment: (
                <InputAdornment position='end'>
                  <Box
                    width='24px'
                    height='24px'
                    borderRadius='8px'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <Eyeoff sx={{ color: lightTheme ? 'grayscale.100' : 'grayscale.0' }} />
                    ) : (
                      <Eyeon sx={{ color: lightTheme ? 'grayscale.100' : 'grayscale.0' }} />
                    )}
                  </Box>
                </InputAdornment>
              ),
              ...props.InputProps,
            }
          : undefined
      }
      ref={ref}
      {...restProps}
    />
  );
});

export default Input;
