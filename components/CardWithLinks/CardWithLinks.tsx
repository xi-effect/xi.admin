import React from 'react';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import {
  GitHub,
  Web,
  Bookmarks,
  DocumentScanner,
  DesignServices,
} from '@mui/icons-material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { DefaultLink } from './DefaultLink';
import { HeaderForLinks } from './HeaderForLinks';

export const CardWithLinks = () => (
  <Paper
    elevation={3}
    sx={{
      maxWidth: '340px',
      margin: '10px',
      padding: '10px',
      backgroundColor: 'background.main',
    }}
  >
    <List subheader={
      <Typography
        pl={2}
        component='span'
        fontWeight={400}
        color='lightgray'
        variant='subtitle1'
      >
        Useful links
      </Typography>}>
      <ListItem>
        <ListItemAvatar> <GitHub color='primary' /> </ListItemAvatar>

        <ListItemText
          primary={<HeaderForLinks text='GitHub' />}
          secondary={
            <>
              <DefaultLink
                text='Бэк-энд'
                href='https://github.com/xi-effect/xieffect-backend'
              />
              <DefaultLink
                text='Фронт-энд'
                href='https://github.com/xi-effect/xieffect-front'
              />
              <DefaultLink
                text='Организация'
                href='https://github.com/xi-effect'
              />
            </>
          }
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar> <Web color='primary' /> </ListItemAvatar>
        <ListItemText
          primary={<HeaderForLinks text='Сайт' />}
          secondary={
            <>
              <DefaultLink
                href='https://xieffect.ru/'
                text='Сайт продакшн'
              />
              <DefaultLink
                href='https://xieffect.ru/'
                text='Сайт предпродакшн'
              />

              <Box
                pt={2}
                component='span'
                fontSize='16px'
                color='lightgray'
                display='inline-block'
              >
                <Box component='span' display='block'>
                  <Typography pr={1} component='span'>Почта:</Typography>
                  test@test.test
                </Box>

                <Box component='span'>
                  <Typography pr={1} component='span'>Пароль:</Typography>
                  123456
                </Box>
              </Box>
            </>
          }
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar><Bookmarks color='primary' /></ListItemAvatar>
        <ListItemText
          primary={<HeaderForLinks text='Вспомогательное' />}
          secondary={
            <>
              <DefaultLink
                text='Miro'
                href='https://miro.com/app/board/o9J_lV8Vahk=/'
              />
              <DefaultLink
                text='Notion invite'
                href='https://www.notion.so/xieffect/invite/e5f987da2369c243d38408acaaecea95f3580a38'
              />
              <DefaultLink
                text='Notion welcome page'
                href='https://xieffect.notion.site/Welcome-page-abc2d33f9a664807a994b6bd8cbd8de4'
              />
            </>
          }
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar><DesignServices color='primary' /></ListItemAvatar>
        <ListItemText
          primary={<HeaderForLinks text='Дизайн' />}
          secondary={
            <>
              <DefaultLink
                text='Figma'
                href='https://www.figma.com/team_invite/redeem/7AWFQoIgW576hytb70rCDT'
              />
              <DefaultLink
                text='Miro Design'
                href='https://miro.com/app/board/o9J_ljALvw4=/ '
              />
            </>
          }
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar><DocumentScanner color='primary' /></ListItemAvatar>
        <ListItemText
          primary={<HeaderForLinks text='Документация Бэкенда' />}
          secondary={
            <>
              <DefaultLink
                text='REST API'
                href='https://xieffect.ru:5000/doc/'
              />
              <DefaultLink
                text='SocketIO'
                href='https://xieffect.ru:5000/sio-doc/'
              />
            </>
          }
        />
      </ListItem>
      <Divider />

      <ListItem>
        <ListItemAvatar><DocumentScanner color='primary' /></ListItemAvatar>
        <ListItemText
          primary={<HeaderForLinks text='Документация' />}
          secondary={
            <>
              <DefaultLink
                text='Docs xieffect'
                href='https://docs.xieffect.ru/'
              />

              <Box
                pt={2}
                component='span'
                fontSize='16px'
                color='lightgray'
                display='inline-block'
                sx={{ wordBreak: 'break-all' }}
              >
                <Box component='span' display='block'>
                  <Typography pr={1} component='span'>Логин:</Typography>
                  reader
                </Box>

                <Box component='span'>
                  <Typography pr={1} component='span'>Пароль:</Typography>
                  5q9f5Kz6qzsj6jxwznSUeugEp8a5BWnd7R4JQb
                </Box>

                <Typography
                  p={1}
                  display='block'
                  component='span'
                >
                  (логин и пароль подходят к документации бэкенда)
                </Typography>
              </Box>
            </>
          }
        />
      </ListItem>
    </List>
  </Paper>);
