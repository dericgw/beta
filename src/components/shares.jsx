import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from '@reach/router';
import { List, Button } from 'antd';
import styled from 'styled-components';

import colors from '../assets/styles/theme';

const Item = styled(List.Item)`
  && {
    padding: 12px 0 12px 12px;

    &.active {
      border-left: 6px solid ${colors.disabledColor};
      background-color: ${colors.white};
      padding-left: 6px;
    }
  }
`;

const Shares = ({ sharesStore }) => {
  const editShare = id => {
    navigate(`/share/${id}/edit`);
  };

  const shares = sharesStore.serializedShares;
  const shareToEditId = sharesStore.shareToEditId;

  return (
    <List
      key={shareToEditId}
      dataSource={shares}
      loading={!shares}
      renderItem={({ id, sentTo, title, hasBeenViewed, created }) => {
        const isActive = id === shareToEditId ? 'active' : '';
        return (
          <Item
            key={id}
            title={created}
            className={isActive}
            actions={[<Button shape="circle-outline" icon="form" onClick={() => editShare(id)} />]}
          >
            <List.Item.Meta title={title} description={sentTo} />
          </Item>
        );
      }}
    />
  );
};

export default inject(({ store }) => ({
  sharesStore: store.sharesStore,
}))(observer(Shares));
