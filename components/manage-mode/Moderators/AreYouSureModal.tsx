import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { ManagePageT } from 'pages/manage-mode/moderators';

const AreYouSureModal = inject('manageSt')(
  observer((props) => {
    const {
      manageSt: {
        toggleModal,
        deleteModerator,
        currentModerator: { current, id },
        controlModals: { confirmation },
      },
    }: ManagePageT = props;

    const onClick = () => {
      if (id) {
        deleteModerator(id);
        toggleModal('confirmation', false);
      }
    };

    return (
      <Dialog open={confirmation} onClose={() => toggleModal('confirmation', false)}>
        <DialogTitle>Подтверждение</DialogTitle>
        <DialogContent>
          <Typography mb={3} variant='body1'>
            Вы действительно хотите удалить
            <span style={{ color: '#5F85D8' }}>{` ${current} `}</span>?
          </Typography>

          <Typography variant='body1' color='error'>
            Это действие будет невозможно отменить
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button sx={{ width: '40%' }} variant='contained' color='success' onClick={onClick}>
            Да
          </Button>

          <Button
            color='error'
            variant='contained'
            sx={{ width: '40%' }}
            onClick={() => toggleModal('confirmation', false)}
          >
            Нет
          </Button>
        </DialogActions>
      </Dialog>
    );
  })
);

export default AreYouSureModal;
