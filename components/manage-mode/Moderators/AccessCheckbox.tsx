import React, { forwardRef } from 'react';
import { Box, Checkbox, FormControlLabel, SvgIcon, Tooltip } from '@mui/material';

type AccessCheckboxT = {
  text: string;
  value: number;
  checked: boolean;
  disabled: boolean;
  disabledText: string;
};

const AccessCheckbox = forwardRef<HTMLButtonElement, AccessCheckboxT & { lightTheme?: boolean }>(
  (props, ref) => {
    const { lightTheme, disabledText, text, checked, value, disabled, ...restProps } = props;

    return (
      <Tooltip title={disabled ? disabledText : ''} placement='left'>
        <FormControlLabel
          labelPlacement='start'
          sx={{
            '&.MuiFormControlLabel-root': {
              mr: 0,
              ml: 0,
              mb: '8px',
              p: '9px 16px',
              height: '40px',
              display: 'flex',
              borderRadius: '4px',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: lightTheme ? '#F5F5F5' : '#202020',

              '& .MuiTypography-root': {
                fontSize: '16px',
                color: lightTheme ? 'grayscale.100' : 'grayscale.0',
              },
            },
          }}
          control={
            <Checkbox
              icon={
                <Box
                  sx={{
                    height: '24px',
                    width: '24px',
                    borderRadius: '6px',
                    border: '1px solid #B8B8B8',
                    backgroundColor: lightTheme ? '#fff' : '#333',
                  }}
                />
              }
              checkedIcon={
                <SvgIcon
                  sx={{
                    width: '24px',
                    height: '24px',

                    '& svg': {
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    },
                  }}
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect x='0.5' y='0.5' width='23' height='23' rx='5.5' fill='#445AFF' />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17.5893 8.07742C17.9148 8.40286 17.9148 8.9305 17.5893 9.25593L10.9227 15.9226C10.5972 16.248 10.0696 16.248 9.74416 15.9226L6.41083 12.5893C6.08539 12.2638 6.08539 11.7362 6.41083 11.4108C6.73626 11.0853 7.2639 11.0853 7.58934 11.4108L10.3334 14.1548L16.4108 8.07742C16.7363 7.75198 17.2639 7.75198 17.5893 8.07742Z'
                      fill='white'
                    />
                    <rect x='0.5' y='0.5' width='23' height='23' rx='5.5' stroke='#445AFF' />
                  </svg>
                </SvgIcon>
              }
              ref={ref}
              value={value}
              disabled={disabled}
              defaultChecked={checked}
              {...restProps}
            />
          }
          label={<Box color={disabled ? 'lightgray' : 'currentcolor'}>{text}</Box>}
        />
      </Tooltip>
    );
  }
);

export default AccessCheckbox;
