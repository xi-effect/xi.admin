import React, { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const Input = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { sx, error, ...restProps } = props;

  return (
    <TextField
      sx={{
        '& .mui-style-12ks9wv-MuiInputBase-root-MuiOutlinedInput-root:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#445AFF',
          },
        },

        '& .mui-style-12ks9wv-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#445AFF',
          },
        },

        '& .MuiInputBase-root': {
          height: '56px',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '20px',
          borderRadius: '8px',
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
          border: `1px solid ${error ? '#F42D2D' : '#E6E6E6'}`,
        },
        ...sx,
      }}
      ref={ref}
      {...restProps}
    />
  );
});

export default Input;
