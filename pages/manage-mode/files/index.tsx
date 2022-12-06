import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Stack } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import MainLayout from 'kit/Layout/MainLayout';
import File from 'components/ManageMode/Files/File';
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
          <Stack direction='row' flexWrap='wrap' justifyContent='space-around'>
            {files.data.map((f) => (
              <File key={f.id} file={f} handler={deleteFiles} />
            ))}
          </Stack>
        </InfiniteScroll>
      </MainLayout>
    );
  })
);

export default ManagePage;
