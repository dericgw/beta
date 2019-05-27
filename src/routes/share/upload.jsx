import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';

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
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader);
    };

    acceptedFiles.forEach((file) => fileReader.readAsBinaryString(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropZone isDragActive={isDragActive} {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <DragState>Drop the files here ...</DragState>
      ) : (
        <DefaultState>Drop music files here to share</DefaultState>
      )}
    </DropZone>
  );
};

export default Upload;
