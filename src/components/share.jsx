import React from 'react';
import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';
import { Icon, Card, List } from 'antd';

const { Meta } = Card;

const StyledPreviousShare = styled(Card)`
  // display: flex;
  // height: 78px;
  // background-color: ${Colors.LIGHT_GRAY3};
  // padding: 12px;
  // margin-bottom: 12px;
  // box-shadow: none;

  .info {
    display: flex;
    flex: 4;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    .title {
      margin-bottom: 8px;
      font-weight: 300;
    }

    .recipient {
      font-size: 13px;
      font-weight: 400;
    }
  }

  .icons {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    min-width: 48px;
    min-height: 48px;
  }
`;

const Share = ({ id, title, recipient, hasBeenViewed }) => (
  <StyledPreviousShare id={id}>
    <Meta
      avatar={
        hasBeenViewed ? (
          <Icon type="eye" theme="twoTone" />
        ) : (
          <Icon type="eye-visible" theme="twoTone" />
        )
      }
      title={title}
      description={recipient}
    />
  </StyledPreviousShare>
);

export default Share;
