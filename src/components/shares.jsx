import React from 'react';
import styled from 'styled-components';
import Share from './share';
import { inject, observer } from 'mobx-react';

const NoPreviousShares = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  height: 100%;
`;

const Shares = ({
  store: {
    sharesStore: { shares },
  },
}) => {
  return shares ? (
    shares.map(({ id, recipient, title, hasBeenViewed }) => (
      <Share key={id} id={id} recipient={recipient} title={title} hasBeenViewed={hasBeenViewed} />
    ))
  ) : (
    <NoPreviousShares>You have not shared anything yet.</NoPreviousShares>
  );
};

export default inject('store')(observer(Shares));
