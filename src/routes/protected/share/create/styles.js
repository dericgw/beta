import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button, Typography } from 'antd';

import colors from '../../../../assets/styles/theme';

const { Paragraph, Title } = Typography;

export const StyledDefaultState = styled.div`
  position: relative;
  height: 500px;
  width: 500px;
  border-radius: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ isDragActive }) =>
    isDragActive ? colors.primaryColor : colors.grey.lightest};
  color: ${({ isDragActive }) => (isDragActive ? colors.white : colors.textColor)};

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
  background-color: ${colors.successColor};
  opacity: 0.3;
  pointer-events: none;
  animation: ${blink} 1s linear infinite;
`;

export const CompletedState = ({ link, fileName, viewShare, id }) => (
  <>
    <Title level={4}>{fileName}</Title>
    <Paragraph copyable>{link}</Paragraph>
    <Button icon="link" onClick={() => viewShare(id)}>
      View
    </Button>
  </>
);
