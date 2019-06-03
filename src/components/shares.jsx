import React from 'react';
import { inject, observer } from 'mobx-react';
import { List, Button } from 'antd';

const Shares = ({
  store: {
    sharesStore: { shares },
  },
}) => {
  return (
    <List
      dataSource={shares}
      loading={!shares}
      renderItem={({ id, sentTo, title, hasBeenViewed }) => {
        return (
          <List.Item
            key={id}
            actions={[<Button shape="circle-outline" icon="edit" href={`/share/${id}/edit`} />]}
          >
            <List.Item.Meta title={title} description={sentTo} />
          </List.Item>
        );
      }}
    />
  );
};

export default inject('store')(observer(Shares));
