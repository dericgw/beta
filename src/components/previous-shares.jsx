import React from 'react';
import styled from 'styled-components';
import PreviousShare from './previous-share';

const NoPreviousShares = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  height: 100%;
`;

const PreviousShares = ({ previousShares }) =>
  previousShares ? (
    previousShares.map(({ id, recipient, name, hasBeenViewed }) => (
      <PreviousShare
        key={id}
        id={id}
        recipient={recipient}
        name={name}
        hasBeenViewed={hasBeenViewed}
      />
    ))
  ) : (
    <NoPreviousShares>You have not shared anything yet.</NoPreviousShares>
  );

export default PreviousShares;
