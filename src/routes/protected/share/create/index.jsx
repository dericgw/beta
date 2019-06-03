import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from '@reach/router';
import Dropzone from 'react-dropzone';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { CompletedState, ProgressIndicator, StyledDefaultState } from './styles';

@inject('store')
@observer
class Create extends Component {
  onDrop = acceptedFiles => {
    const { userStore, sharesStore } = this.props.store;
    sharesStore.upload(acceptedFiles, userStore.user.uid);
  };

  cancelUpload = () => {
    this.props.store.sharesStore.cancelUpload();
  };

  render() {
    const { uploadProgress, uploadCompleted, lastShare, shareLink } = this.props.store.sharesStore;
    return (
      <Dropzone
        disabled={Boolean(uploadProgress || uploadCompleted)}
        onDrop={this.onDrop}
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
                'Or, just click here to search for a file. Upload starts automatically when files
                are added.'
              </p>
            )}
            <Icon
              icon={
                isDragActive
                  ? IconNames.CLOUD_UPLOAD
                  : uploadCompleted
                  ? IconNames.UPDATED
                  : IconNames.MUSIC
              }
              iconSize={84}
            />
            {uploadProgress ? (
              <ProgressIndicator progress={uploadProgress} isComplete={uploadCompleted} />
            ) : null}
          </StyledDefaultState>
        )}
      </Dropzone>
    );
  }
}

export default Create;
