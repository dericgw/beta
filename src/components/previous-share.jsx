import React from 'react';
import styled from 'styled-components';
import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

const StyledPreviousShare = styled.div`
  display: flex;
`;

const PreviousShare = ({ id, name, recipient, hasBeenViewed }) => (
  <StyledPreviousShare id={id}>
    <p>{name}</p>
    <p>{recipient}</p>
    {hasBeenViewed ? (
      <Icon icon={IconNames.EYE_ON} intent={Intent.SUCCESS} />
    ) : (
      <Icon icon={IconNames.EYE_OPEN} />
    )}
  </StyledPreviousShare>
);

export default PreviousShare;
