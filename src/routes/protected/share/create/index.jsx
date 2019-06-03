import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from '@reach/router';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';

import { CompletedState, ProgressIndicator, StyledDefaultState } from './styles';

const Create = ({ store }) => {
  const { userStore, sharesStore } = store;
  const onDrop = acceptedFiles => {
    sharesStore.upload(acceptedFiles, userStore.user.uid);
  };

  // TODO: Implement this
  const cancelUpload = () => {
    sharesStore.cancelUpload();
  };

  const { uploadProgress, uploadCompleted, lastShare, shareLink } = sharesStore;
  return (
    <Dropzone
      disabled={Boolean(uploadProgress || uploadCompleted)}
      onDrop={onDrop}
      accept="audio/*"
      multiple={false}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <StyledDefaultState {...getRootProps({ isDragActive })}>
          <input {...getInputProps()} />
          <h4>
            {isDragActive
              ? 'Drop it and start the upload!'
              : uploadCompleted
              ? `Done! Here's a link you can share.`
              : 'Drop a music file here to share'}
          </h4>
          {isDragActive ? (
            <p>(Upload starts automatically when you drop the file...)</p>
          ) : uploadCompleted ? (
            <CompletedState
              link={shareLink}
              fileName={lastShare.title}
              viewShare={() => navigate(shareLink)}
            />
          ) : (
            <p>
              'Or, just click here to search for a file. Upload starts automatically when files are
              added.'
            </p>
          )}
          <Icon
            style={{ fontSize: '84px' }}
            type={isDragActive ? 'cloud-upload' : uploadCompleted ? 'save' : 'folder-add'}
          />
          {uploadProgress ? (
            <ProgressIndicator progress={uploadProgress} isComplete={uploadCompleted} />
          ) : null}
        </StyledDefaultState>
      )}
    </Dropzone>
  );
};

export default inject('store')(observer(Create));
