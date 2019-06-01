import React from 'react';
import styled from 'styled-components';
import { Icon, Intent, Colors, Card } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const StyledPreviousShare = styled(Card)`
  display: flex;
  height: 78px;
  background-color: ${Colors.LIGHT_GRAY3};
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: none;

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
  }
`;

const Share = ({ id, title, recipient, hasBeenViewed }) => (
  <StyledPreviousShare id={id}>
    <div className="info">
      <p className="title">{title}</p>
      <p className="recipient">{recipient}</p>
    </div>
    <div className="icons">
      {hasBeenViewed ? (
        <Icon icon={IconNames.EYE_ON} intent={Intent.SUCCESS} />
      ) : (
        <Icon icon={IconNames.EYE_OPEN} />
      )}
    </div>
  </StyledPreviousShare>
);

export default Share;
