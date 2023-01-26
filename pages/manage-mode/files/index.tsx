import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Box, CircularProgress, Stack } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layout from 'kit/layout/Layout';
import File from 'components/manage-mode/Files/File';
import AreYouSureModal from 'components/manage-mode/Moderators/AreYouSureModal';
import { ManagePageT } from '../moderators';

const ManagePage = inject('manageSt')(
  observer((props) => {
    const {
      manageSt: {
        getFiles,
        deleteFiles,
        toggleModal,
        storage: { files },
        currentFile: { current, id },
        rootStore: {
          userSt: {
            settings: { mode },
          },
        },
      },
    }: ManagePageT = props;

    const filesJsx = files.data.map((f) => <File file={f} key={f.id} deleteFiles={deleteFiles} />);

    const deleteFileHandler = () => {
      if (id) {
        deleteFiles(id);
        toggleModal('confirmation', false);
      }
    };

    useEffect(() => {
      getFiles();
    }, []);

    return (
      <Layout title='Управление файлами'>
        <Box>
          <Box m='-8px'>
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
              <Stack direction='row' flexWrap='wrap' justifyContent='center'>
                {files.data.length ? (
                  filesJsx
                ) : (
                  <Box
                    p='20px 0'
                    width='100%'
                    fontSize='25px'
                    fontWeight='500'
                    textAlign='center'
                    color={mode === 'light' ? 'grayscale.100' : 'grayscale.0'}
                  >
                    Файлы отсутствуют
                  </Box>
                )}
              </Stack>
            </InfiniteScroll>
          </Box>
        </Box>

        <AreYouSureModal
          content={current}
          title='Удалить файл?'
          confirmHandler={deleteFileHandler}
        />
      </Layout>
    );
  })
);

export default ManagePage;
