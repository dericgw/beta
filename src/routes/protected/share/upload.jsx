import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
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
        disabled={Boolean(uploadProgress || uploadCompleted)}
        onDrop={this.onDrop}
        accept="audio/*"
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) =>
          isDragActive ? (
            <DragState />
          ) : uploadProgress ? (
            <UploadingState
              progress={uploadProgress}
              cancel={this.cancelUpload}
              fileName="The Way.mp3"
            />
          ) : uploadCompleted ? (
            <CompletedState
              link="http://testing.com/1234"
              fileName="The Way.mp3"
              copyLinkToClipboard={() => {}}
              viewShare={() => {}}
            />
          ) : (
            <DefaultState {...getRootProps()}>
              <input {...getInputProps()} />
            </DefaultState>
          )
        }
      </Dropzone>
    );
  }
}

export default Upload;
