import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Spin, Typography, Button, Popconfirm, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ActionsWrapper, Wrapper } from './styles';

const { Title } = Typography;

const iconStyle = { fontSize: '84px' };

const Edit = ({ share, updateShareToEditId, deleteShare, id, navigate }) => {
  useEffect(() => {
    updateShareToEditId(id);
  });

  const handleDelete = () => {
    message.success('The share was deleted.');
    deleteShare(id);
    navigate('/share');
  };

  return share ? (
    <Wrapper>
      <Icon type="audio" style={iconStyle} />
      <Title level={3}>{share.title}</Title>
      <ActionsWrapper>
        <CopyToClipboard text={share.link}>
          <Button icon="copy" shape="circle" type="primary" />
        </CopyToClipboard>
        <Popconfirm
          title="Are you sure delete this share?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button icon="delete" shape="circle" type="danger" />
        </Popconfirm>
      </ActionsWrapper>
    </Wrapper>
  ) : (
    <Spin size="large" />
  );
};

export default inject(({ store }) => ({
  share: store.sharesStore.shareToEdit,
  updateShareToEditId: store.sharesStore.updateShareToEditId,
  deleteShare: store.sharesStore.deleteShare,
}))(observer(Edit));
