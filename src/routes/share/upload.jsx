import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Colors, ProgressBar } from '@blueprintjs/core';
import * as firebase from 'firebase/app';

const DropZone = styled.div.attrs({
  'data-test-id': 'upload-drop-zone',
})`
  height: 400px;
  width: 400px;
  background-color: ${({ isDragActive }) => (isDragActive ? Colors.BLUE5 : Colors.LIGHT_GRAY5)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultState = styled.div``;

const DragState = styled(DefaultState)``;

const Upload = () => {
  const [progress, updateProgress] = useState(0);
  const onDrop = useCallback((acceptedFiles) => {
    const storage = firebase.storage().ref();

    acceptedFiles.forEach((file) => {
      const task = storage.child(`songs/${file.name}`).put(file);
      task.on(
        'state_changed',
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * (1 / acceptedFiles.length);
          updateProgress(percentage);
        },
        (error) => {
          throw error;
        },
        () => {
          updateProgress(0);
        },
      );
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'audio/*' });

  return (
    <DropZone isDragActive={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <DragState>Drop the files here ...</DragState>
      ) : (
        <DefaultState>Drop music files here to share</DefaultState>
      )}
      {Number(progress) !== 0 && <ProgressBar value={progress} />}
    </DropZone>
  );
};

export default Upload;
