import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Colors, Intent } from '@blueprintjs/core/lib/esm/index';
import { IconNames } from '@blueprintjs/icons/lib/esm/index';

export const StyledDefaultState = styled.div`
  position: relative;
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

const blink = keyframes`
  50% {
    opacity: 0.1;
  }
`;

export const ProgressIndicator = styled.div`
  display: ${({ isComplete }) => (isComplete ? 'none' : 'block')};
  position: absolute;
  width: ${({ progress }) => `${progress}%`};
  height: ${({ progress }) => `${progress}%`};
  border-radius: 100%;
  background-color: ${Colors.GREEN5};
  opacity: 0.3;
  pointer-events: none;
  animation: ${blink} 1s linear infinite;
`;

export const CompletedState = ({ link, fileName, viewShare, id }) => (
  <>
    <h4>{fileName}</h4>
    <p>{link}</p>
    <CopyToClipboard text={link}>
      <Button icon={IconNames.DUPLICATE} />
    </CopyToClipboard>
    <Button intent={Intent.NONE} icon={IconNames.LINK} onClick={() => viewShare(id)}>
      View
    </Button>
  </>
);