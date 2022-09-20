import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import PageHeader from 'kit/Layout/PageHeader';
import { Clear } from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainLayout from 'kit/Layout/MainLayout';
import { ManagePageT } from '../moderators';

const ManagePage = inject('manageSt')(
  observer((props) => {
    const {
      manageSt: {
        storage: { files },
        getFiles,
        deleteFiles,
      },
    }: ManagePageT = props;

    useEffect(() => {
      getFiles();
    }, []);

    return (
      <MainLayout title='Управление файлами'>
        <PageHeader title='Управление файлами' />

        <InfiniteScroll
          next={() => getFiles()}
          hasMore={files['has-next']}
          dataLength={files.data.length}
          loader={
            <CircularProgress
              sx={{
                top: '50%',
                left: '50%',
                zIndex: '100',
                position: 'fixed',
                transform: 'translate(-50%,-50%)',
              }}
              size={80}
            />
          }
        >
          <ImageList
            sx={{
              m: 1,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {files.data.map((i) => (
              <ImageListItem sx={{ m: '4px', flex: '1 1 400px' }} key={i.id}>
                <img
                  src={`https://xieffect.ru:5000/files/${i.filename}`}
                  alt={i.filename}
                  loading='lazy'
                />
                <ImageListItemBar
                  title={i.filename}
                  actionIcon={
                    <IconButton onClick={() => deleteFiles(i.id)} sx={{ mr: 1 }}>
                      <Clear />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </InfiniteScroll>
      </MainLayout>
    );
  })
);

export default ManagePage;
