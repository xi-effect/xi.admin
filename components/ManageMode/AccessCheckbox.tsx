/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FC } from 'react';
import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import H from './H';

type AccessCheckboxT = {
  text: string;
  value: number;
  checked: boolean;
  disabled: boolean;
  disabledText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const AccessCheckbox: FC<AccessCheckboxT> = (props) => {
  const { disabledText, text, checked, value, disabled, onChange } = props;
  return (
    <Tooltip title={disabled ? disabledText : ''} placement='left'>
      <FormControlLabel
        labelPlacement='start'
        sx={{
          '&.MuiFormControlLabel-root': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
        control={
          <Checkbox
            value={value}
            onChange={onChange}
            disabled={disabled}
            defaultChecked={checked}
          />
        }
        label={<H color={disabled ? 'lightgray' : 'white'}>{text}</H>}
      />
    </Tooltip>
  );
};

export default AccessCheckbox;
