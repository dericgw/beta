import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, navigate } from '@reach/router';
import Dropzone from 'react-dropzone';
import { Icon, ProgressBar } from '@blueprintjs/core';

import { CompletedState, DefaultState, StyledDefaultState } from './styles';
import { IconNames } from '@blueprintjs/icons';

@inject('store')
@observer
class Upload extends Component {
  onDrop = acceptedFiles => {
    const { userStore, sharesStore } = this.props.store;
    sharesStore.upload(acceptedFiles, userStore.user.uid);
  };

  cancelUpload = () => {
    this.props.store.sharesStore.cancelUpload();
  };

  viewLastShare = id => {
    navigate(`/shares/${id}`);
  };

  render() {
    const { uploadProgress, uploadCompleted, lastShare } = this.props.store.sharesStore;
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
              {isDragActive ? 'Drop it and start the upload!' : 'Drop a music file here to share'}
            </h4>
            <p>
              {isDragActive
                ? '(Upload starts automatically when you drop the file...)'
                : 'Or, just click here to search for a file. Upload starts automatically when files are added.'}
            </p>
            <Icon icon={isDragActive ? IconNames.CLOUD_UPLOAD : IconNames.MUSIC} iconSize={84} />
            {uploadCompleted ? (
              <CompletedState
                link={lastShare.link}
                fileName={lastShare.title}
                viewShare={this.viewLastShare}
                id={lastShare.id}
              />
            ) : null}
            {uploadProgress ? <ProgressBar value={uploadProgress} /> : null}
          </StyledDefaultState>
        )}
      </Dropzone>
    );
  }
}

export default Upload;
