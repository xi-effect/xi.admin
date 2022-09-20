/* eslint-disable no-unused-vars */
import React, {FC, forwardRef} from 'react';
import {Checkbox, FormControlLabel, Tooltip} from '@mui/material';
import H from './H';

type AccessCheckboxT = {
  text: string;
  value: number;
  checked: boolean;
  disabled: boolean;
  disabledText: string;
};

const AccessCheckbox: FC<AccessCheckboxT> = forwardRef<HTMLButtonElement, AccessCheckboxT>(
  (props, ref) => {
    const {disabledText, text, checked, value, disabled, ...restProps} = props;
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
              ref={ref}
              value={value}
              disabled={disabled}
              defaultChecked={checked}
              {...restProps}
            />
          }
          label={<H color={disabled ? 'lightgray' : 'white'}>{text}</H>}
        />
      </Tooltip>
    );
  }
);

export default AccessCheckbox;
