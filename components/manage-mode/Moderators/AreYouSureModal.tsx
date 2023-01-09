import React from 'react';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { inject, observer } from 'mobx-react';
import { Close } from '@mui/icons-material';
import ButtonC from 'kit/common/ButtonC';
import ManageSt from 'store/manage-mode/manageSt';
import UserSt from 'store/user/userSt';

type AreYouSureModalT = {
  title: string;
  content: string;
  userSt: UserSt;
  manageSt: ManageSt;
  confirmLabel: string;
  confirmHandler: () => void;
};

const AreYouSureModal = inject(
  'manageSt',
  'userSt'
)(
  observer((props) => {
    const {
      title,
      content,
      confirmLabel,
      confirmHandler,
      userSt: {
        settings: { mode },
      },
      manageSt: {
        toggleModal,
        controlModals: { confirmation },
      },
    }: AreYouSureModalT = props;

    return (
      <Dialog
        sx={{
          '& .MuiPaper-root,.MuiDialog-paper ': {
            p: '32px',
            width: '100%',
            maxWidth: '420px',
            borderRadius: '16px',
            backgroundImage: 'none',
            backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
            border: mode === 'light' ? '1px solid #E6E6E6' : '1px solid #666666',
          },
          '& .MuiTypography-root,.MuiDialogContent-root,.MuiDialogActions-root ': {
            p: '0',
          },
        }}
        open={confirmation}
        onClose={() => toggleModal('confirmation', false)}
      >
        <DialogTitle>
          <Box
            mb='16px'
            lineHeight='32px'
            fontSize='24px'
            fontWeight={600}
            textAlign='center'
            position='relative'
            color={mode === 'light' ? '#000' : '#fff'}
          >
            {title}
            <IconButton
              sx={{
                p: 0,
                top: '-17px',
                right: '-17px',
                position: 'absolute',
              }}
              onClick={() => toggleModal('confirmation', false)}
            >
              <Close sx={{ color: '#999', height: '24px', width: '24px' }} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            color: '#999',
            fontSize: '16px',
            mb: '32px',
            textAlign: 'center',
          }}
        >
          {content}
        </DialogContent>

        <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <ButtonC
            fullWidth
            onClick={confirmHandler}
            sx={{ mb: '8px', backgroundColor: '#F42D2D' }}
          >
            {confirmLabel || 'Удалить'}
          </ButtonC>

          <ButtonC
            fullWidth
            sx={{
              m: '0 !important',
              border: '2px solid #B8B8B8',
              color: mode === 'light' ? 'grayscale.100' : 'grayscale.0',
              backgroundColor: mode === 'light' ? 'grayscale.0' : 'grayscale.100',
            }}
            onClick={() => toggleModal('confirmation', false)}
          >
            Отмена
          </ButtonC>
        </DialogActions>
      </Dialog>
    );
  })
);

export default AreYouSureModal;
