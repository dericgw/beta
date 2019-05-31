import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { ProgressBar } from '@blueprintjs/core';

import { CompletedState, DefaultState, DragState, UploadingState } from './styles';

@inject('store')
@observer
class Upload extends Component {
  onDrop = acceptedFiles => {
    const { userStore, shareStore } = this.props.store;
    shareStore.upload(acceptedFiles, userStore.user.uid);
  };

  cancelUpload = () => {
    this.props.store.shareStore.cancelUpload();
  };

  render() {
    const { uploadProgress, uploadCompleted } = this.props.store.shareStore;
    return (
      <Dropzone
        // disabled={Boolean(uploadProgress || uploadCompleted)}
        onDrop={this.onDrop}
        accept="audio/*"
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <DefaultState {...getRootProps({ isDragActive })}>
            <input {...getInputProps()} />
            {uploadProgress ? <ProgressBar value={uploadProgress} /> : null}
          </DefaultState>
        )}
      </Dropzone>
    );
  }
}

export default Upload;
