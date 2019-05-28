import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Dropzone from 'react-dropzone';
import * as firebase from 'firebase/app';
import { CompletedState, DefaultState, DragState, UploadingState } from './styles';

@inject('shares', 'user')
@observer
class Upload extends Component {
  state = {
    progress: 0,
    task: 1,
    completed: false,
  };

  onDrop = acceptedFiles => {
    const storage = firebase.storage().ref();
    acceptedFiles.forEach(file => {
      this.setState({ task: storage.child(`songs/${this.props.user.id}/${file.name}`).put(file) });
      this.state.task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / acceptedFiles.length);
          this.setState({ progress: percentage });
        },
        error => {
          throw error;
        },
        () => {
          this.setState({ progress: 0, task: null, completed: true });
        },
      );
    });
  };

  cancelUpload = () => {
    this.state.task.cancel();
    this.setState({ task: null });
  };

  render() {
    const { progress, task, completed } = this.state;
    return (
      <Dropzone
        disabled={Boolean(progress || task || completed)}
        onDrop={this.onDrop}
        accept="audio/*"
        multiple={false}
      >
        {({ getRootProps, getInputProps, isDragActive }) =>
          isDragActive ? (
            <DragState />
          ) : task ? (
            <UploadingState progress={progress} cancel={this.cancelUpload} fileName="The Way.mp3" />
          ) : completed ? (
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
