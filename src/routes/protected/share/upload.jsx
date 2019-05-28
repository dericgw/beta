import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Button, Colors, Intent, ProgressBar } from '@blueprintjs/core';
import * as firebase from 'firebase/app';
import { IconNames } from '@blueprintjs/icons';

const Wrapper = styled.div`
  height: 400px;
  width: 400px;
  background-color: ${({ isDragActive }) => (isDragActive ? Colors.BLUE5 : Colors.LIGHT_GRAY5)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultState = styled.div``;

const DragState = styled(DefaultState)``;

@inject('shares', 'user')
@observer
class Upload extends Component {
  state = {
    progress: 0,
    task: null,
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
          this.setState({ progress: 0, task: null });
        },
      );
    });
  };

  cancelUpload = () => {
    this.state.task.cancel();
    this.setState({ task: null });
  };

  render() {
    const { progress, task } = this.state;
    return (
      <Dropzone onDrop={this.onDrop} accept="audio/*">
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Wrapper isDragActive={isDragActive} {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <DragState>Drop the files here ...</DragState>
            ) : (
              <DefaultState>
                Drop music files here to share
                {task ? (
                  <Button intent={Intent.DANGER} icon={IconNames.STOP} onClick={this.cancelUpload}>
                    Cancel
                  </Button>
                ) : null}
              </DefaultState>
            )}
            {Number(progress) !== 0 && <ProgressBar value={progress} />}
          </Wrapper>
        )}
      </Dropzone>
    );
  }
}

export default Upload;
