import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Colors, Icon, Intent, ProgressBar } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

export const StyledDefaultState = styled.div`
  height: 500px;
  width: 500px;
  border-radius: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ isDragActive }) => (isDragActive ? Colors.BLUE5 : Colors.LIGHT_GRAY5)};
  color: ${({ isDragActive }) => (isDragActive ? Colors.WHITE : Colors.DARK_GRAY1)};

  h4 {
    margin-bottom: 12px;
  }

  p {
    font-weight: 300;
    font-size: 15px;
    margin-bottom: 18px;
    line-height: 1.5;
    max-width: 460px;
    text-align: center;
  }

  svg {
    opacity: 0.5;
  }
`;

const StyledDragState = styled(StyledDefaultState)`
  background-color: ${Colors.BLUE5};
  color: white;
  opacity: 0.8;
`;

const StyledUploadingState = styled(StyledDefaultState)``;

const StyledCompletedState = styled(StyledDefaultState)``;

const StyledErrorState = styled(StyledDefaultState)`
  color: ${Colors.DARK_GRAY1};
  background-color: ${Colors.RED5};
`;

export const DefaultState = props => (
  <StyledDefaultState {...props}>
    <h4>Drop a music file here to share</h4>
    <p>
      (Or, just click here to search for a file. Upload starts automatically when files are added.)
    </p>
    <Icon icon={IconNames.MUSIC} iconSize={84} />
  </StyledDefaultState>
);

export const DragState = forwardRef((props, ref) => (
  <StyledDragState ref={ref} {...props}>
    <h4>Upload starts automatically when files are added.</h4>
    <Icon icon={IconNames.CLOUD_UPLOAD} iconSize={84} />
  </StyledDragState>
));

export const UploadingState = forwardRef(({ progress, cancel, fileName, ...props }, ref) => (
  <StyledUploadingState ref={ref} {...props}>
    <Icon icon={IconNames.CLOUD_UPLOAD} iconSize={36} />
    <h4>{fileName}</h4>
    <ProgressBar value={progress} />
    <Button intent={Intent.DANGER} icon={IconNames.STOP} onClick={cancel}>
      Cancel
    </Button>
  </StyledUploadingState>
));

export const CompletedState = ({ link, fileName, viewShare, id }) => (
  <StyledCompletedState>
    <Icon icon={IconNames.UPDATED} iconSize={36} />
    <h4>{fileName}</h4>
    <p>{link}</p>
    <CopyToClipboard text={link}>
      <Button icon={IconNames.DUPLICATE} />
    </CopyToClipboard>
    <Button intent={Intent.NONE} icon={IconNames.LINK} onClick={() => viewShare(id)}>
      View
    </Button>
  </StyledCompletedState>
);
