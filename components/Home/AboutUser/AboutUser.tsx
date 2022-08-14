import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { AccountBox, FormatListNumbered, Announcement } from '@mui/icons-material';
import HeaderForAU from './HeaderForAU';
import SubHeaderForAU from './SubHeaderForAU';

const AboutUser = inject('userSt')(
  observer(({ userSt }) => {
    const {
      settings: { id, username, sections },
    } = userSt;

    const permissions = sections.map((s) => s.name);
    const access = permissions.length ? permissions.join(', ') : 'Отсутствуют разрешения';

    return (
      <Paper
        elevation={3}
        sx={{
          maxWidth: '340px',
          margin: '10px',
          padding: '10px',
          backgroundColor: 'background.main',
        }}
      >
        <List
          subheader={
            <Typography pl={2} component='span' color='lightgray' variant='subtitle1'>
              Информация о пользователе
            </Typography>
          }
        >
          <ListItem>
            <ListItemAvatar>
              <AccountBox color='primary' />
            </ListItemAvatar>
            <ListItemText
              primary={<HeaderForAU text='Пользователь' />}
              secondary={<SubHeaderForAU text={username} />}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <FormatListNumbered color='primary' />
            </ListItemAvatar>
            <ListItemText
              primary={<HeaderForAU text='Идентификатор' />}
              secondary={<SubHeaderForAU text={id} />}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemAvatar>
              <Announcement color='primary' />
            </ListItemAvatar>
            <ListItemText
              primary={<HeaderForAU text='Разрешения' />}
              secondary={<SubHeaderForAU text={access} />}
            />
          </ListItem>
        </List>
      </Paper>
    );
  })
);

export default AboutUser;
