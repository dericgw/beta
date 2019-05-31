import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Button, Colors, Icon, Intent, ProgressBar } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const StyledDefaultState = styled.div`
  height: 100%;
  width: 100%;
  padding: 18px 120px;
  margin: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${Colors.WHITE};
  color: ${Colors.DARK_GRAY1};

  h4 {
    margin-bottom: 12px;
  }

  p {
    font-weight: 300;
    font-size: 15px;
    margin-bottom: 18px;
    line-height: 1.5;
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

export const DefaultState = forwardRef((props, ref) => (
  <StyledDefaultState ref={ref} {...props}>
    <h4>Drop a music file here to share</h4>
    <p>
      (Or, just click here to search for a file. Upload starts automatically when files are added.)
    </p>
    <Icon icon={IconNames.MUSIC} iconSize={84} />
  </StyledDefaultState>
));

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

export const CompletedState = ({ link, fileName, copyLinkToClipboard, viewShare }) => (
  <StyledCompletedState>
    <Icon icon={IconNames.UPDATED} iconSize={36} />
    <h4>{fileName}</h4>
    <p>{link}</p>
    <Button intent={Intent.DANGER} icon={IconNames.STOP} onClick={copyLinkToClipboard}>
      Copy
    </Button>
    <Button intent={Intent.DANGER} icon={IconNames.STOP} onClick={viewShare}>
      View
    </Button>
  </StyledCompletedState>
);
