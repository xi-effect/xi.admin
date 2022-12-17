import { Box, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { ManagePageT } from 'pages/manage-mode/moderators';
import { Close } from '@mui/icons-material';
import ButtonC from 'kit/common/ButtonC';

const AreYouSureModal = inject(
  'manageSt',
  'userSt'
)(
  observer((props) => {
    const {
      userSt: {
        settings: { mode },
      },
      manageSt: {
        toggleModal,
        deleteModerator,
        currentModerator: { id },
        controlModals: { confirmation },
      },
    }: ManagePageT = props;

    const confirmDeletion = () => {
      if (id) {
        deleteModerator(id);
        toggleModal('confirmation', false);
      }
    };

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
            mb='32px'
            lineHeight='32px'
            fontSize='24px'
            fontWeight={600}
            textAlign='center'
            position='relative'
            color={mode === 'light' ? '#000' : '#fff'}
          >
            Удалить модератора
            <IconButton
              sx={{
                p: 0,
                top: '-17px',
                right: '-17px',
                position: 'absolute',
              }}
              onClick={() => toggleModal('main', false)}
            >
              <Close sx={{ color: '#999', height: '24px', width: '24px' }} />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
          <ButtonC
            fullWidth
            onClick={confirmDeletion}
            sx={{ mb: '8px', backgroundColor: '#F42D2D' }}
          >
            Удалить
          </ButtonC>

          <ButtonC
            fullWidth
            sx={{
              m: '0',
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
