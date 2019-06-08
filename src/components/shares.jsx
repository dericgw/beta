import React from 'react';
import { inject, observer } from 'mobx-react';
import { navigate } from '@reach/router';
import { List, Button } from 'antd';

const Shares = ({ shares }) => {
  const editShare = id => {
    navigate(`/share/${id}/edit`);
  };

  return (
    <List
      dataSource={shares}
      loading={!shares}
      renderItem={({ id, sentTo, title, hasBeenViewed, created }) => {
        return (
          <List.Item
            key={id}
            title={created}
            actions={[<Button shape="circle-outline" icon="form" onClick={() => editShare(id)} />]}
          >
            <List.Item.Meta title={title} description={sentTo} />
          </List.Item>
        );
      }}
    />
  );
};

export default inject(({ store }) => ({
  shares: store.sharesStore.serializedShares,
}))(observer(Shares));
