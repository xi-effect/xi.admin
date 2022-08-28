import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const TextFieldPass = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={() => setShowPassword(!showPassword)}
              edge='end'
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
    />
  );
});

export default TextFieldPass;
