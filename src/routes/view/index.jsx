import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react';
import { Spin } from 'antd';
import styled from 'styled-components';
import AudioPlayer from '@oovui/audio-player-react';
// import ReactMusicPlayer from 'react-jinke-music-player';
// import 'react-jinke-music-player/assets/index.css';

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const View = ({ id, store }) => {
  const { sharesStore } = store;
  const [share, updateShare] = useState(null);
  useEffect(() => {
    sharesStore
      .fetchById(id)
      .then(song => {
        return new Promise(resolve => {
          updateShare(song);
          resolve(song);
        });
      })
      .then(song => {
        sharesStore.markSongAsViewed(song.id);
      });
  }, [id, sharesStore]);

  return (
    <Wrapper>
      {share ? <AudioPlayer url={share.link} title={share.title} /> : <Spin size="large" />}
    </Wrapper>
  );
};

export default inject('store')(observer(View));
