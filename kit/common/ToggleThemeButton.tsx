import React from 'react';
import { IconButton, Stack, SvgIcon, SxProps, Theme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import UserSt from 'store/user/userSt';
import { AnimatePresence, motion } from 'framer-motion';

type ToggleThemeButtonT = {
  userSt: UserSt;
  sx: SxProps<Theme>;
};

const ToggleThemeButton = inject('userSt')(
  observer((props) => {
    const {
      sx,
      userSt: {
        setSettings,
        settings: { mode },
      },
    }: ToggleThemeButtonT = props;

    const IconS = {
      width: '40px',
      height: '40px',

      '& svg': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    };

    return (
      <Stack direction='row' justifyContent='flex-end' height='40px' sx={sx}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            key={mode}
            exit={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            initial={{ y: -20, opacity: 0 }}
            style={{
              zIndex: 2,
              position: 'fixed',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            <IconButton
              sx={{ p: 0 }}
              onClick={() => setSettings('mode', mode === 'light' ? 'dark' : 'light')}
            >
              {mode === 'light' ? (
                <SvgIcon sx={IconS}>
                  <svg viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='40' height='40' rx='20' fill='white' />
                    <path
                      d='M26.3534 22.62C26.2467 22.44 25.9467 22.16 25.2 22.2933C24.7867 22.3667 24.3667 22.4 23.9467 22.38C22.3934 22.3133 20.9867 21.6 20.0067 20.5C19.14 19.5333 18.6067 18.2733 18.6 16.9133C18.6 16.1533 18.7467 15.42 19.0467 14.7267C19.34 14.0533 19.1334 13.7 18.9867 13.5533C18.8334 13.4 18.4734 13.1867 17.7667 13.48C15.04 14.6267 13.3534 17.36 13.5534 20.2867C13.7534 23.04 15.6867 25.3933 18.2467 26.28C18.86 26.4933 19.5067 26.62 20.1734 26.6467C20.28 26.6533 20.3867 26.66 20.4934 26.66C22.7267 26.66 24.82 25.6067 26.14 23.8133C26.5867 23.1933 26.4667 22.8 26.3534 22.62Z'
                      fill='#333333'
                    />
                  </svg>
                </SvgIcon>
              ) : (
                <SvgIcon sx={IconS}>
                  <svg viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='40' height='40' rx='20' fill='black' />
                    <path
                      d='M19.9999 24.6667C22.5772 24.6667 24.6666 22.5773 24.6666 20C24.6666 17.4227 22.5772 15.3333 19.9999 15.3333C17.4226 15.3333 15.3333 17.4227 15.3333 20C15.3333 22.5773 17.4226 24.6667 19.9999 24.6667Z'
                      fill='white'
                    />
                    <path
                      d='M20.0001 27.3067C19.6334 27.3067 19.3334 27.0333 19.3334 26.6667V26.6133C19.3334 26.2467 19.6334 25.9467 20.0001 25.9467C20.3667 25.9467 20.6667 26.2467 20.6667 26.6133C20.6667 26.98 20.3667 27.3067 20.0001 27.3067ZM24.7601 25.4267C24.5867 25.4267 24.4201 25.36 24.2867 25.2333L24.2001 25.1467C23.9401 24.8867 23.9401 24.4667 24.2001 24.2067C24.4601 23.9467 24.8801 23.9467 25.1401 24.2067L25.2267 24.2933C25.4867 24.5533 25.4867 24.9733 25.2267 25.2333C25.1001 25.36 24.9334 25.4267 24.7601 25.4267ZM15.2401 25.4267C15.0667 25.4267 14.9001 25.36 14.7667 25.2333C14.5067 24.9733 14.5067 24.5533 14.7667 24.2933L14.8534 24.2067C15.1134 23.9467 15.5334 23.9467 15.7934 24.2067C16.0534 24.4667 16.0534 24.8867 15.7934 25.1467L15.7067 25.2333C15.5801 25.36 15.4067 25.4267 15.2401 25.4267ZM26.6667 20.6667H26.6134C26.2467 20.6667 25.9467 20.3667 25.9467 20C25.9467 19.6333 26.2467 19.3333 26.6134 19.3333C26.9801 19.3333 27.3067 19.6333 27.3067 20C27.3067 20.3667 27.0334 20.6667 26.6667 20.6667ZM13.3867 20.6667H13.3334C12.9667 20.6667 12.6667 20.3667 12.6667 20C12.6667 19.6333 12.9667 19.3333 13.3334 19.3333C13.7001 19.3333 14.0267 19.6333 14.0267 20C14.0267 20.3667 13.7534 20.6667 13.3867 20.6667ZM24.6734 15.9933C24.5001 15.9933 24.3334 15.9267 24.2001 15.8C23.9401 15.54 23.9401 15.12 24.2001 14.86L24.2867 14.7733C24.5467 14.5133 24.9667 14.5133 25.2267 14.7733C25.4867 15.0333 25.4867 15.4533 25.2267 15.7133L25.1401 15.8C25.0134 15.9267 24.8467 15.9933 24.6734 15.9933ZM15.3267 15.9933C15.1534 15.9933 14.9867 15.9267 14.8534 15.8L14.7667 15.7067C14.5067 15.4467 14.5067 15.0267 14.7667 14.7667C15.0267 14.5067 15.4467 14.5067 15.7067 14.7667L15.7934 14.8533C16.0534 15.1133 16.0534 15.5333 15.7934 15.7933C15.6667 15.9267 15.4934 15.9933 15.3267 15.9933ZM20.0001 14.0267C19.6334 14.0267 19.3334 13.7533 19.3334 13.3867V13.3333C19.3334 12.9667 19.6334 12.6667 20.0001 12.6667C20.3667 12.6667 20.6667 12.9667 20.6667 13.3333C20.6667 13.7 20.3667 14.0267 20.0001 14.0267Z'
                      fill='white'
                    />
                  </svg>
                </SvgIcon>
              )}
            </IconButton>
          </motion.div>
        </AnimatePresence>
      </Stack>
    );
  })
);

export default ToggleThemeButton;