import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Spin } from 'antd';

const Edit = ({ id, ...res }) => {
  const [share, updateShare] = useState(null);
  console.log(res);
  // useEffect(() => {
  //   fetchById(id).then(song => {
  //     updateShare(song);
  //   });
  // }, [fetchById, id]);

  return share ? <div>{share.title}</div> : <Spin size="large" />;
};

export default inject('store')(observer(Edit));
