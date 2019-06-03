import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Colors } from '@blueprintjs/core';

const Opener = styled.span`
  position: absolute;
  right: 42px;
  top: 42px;
  height: 42px;
  width: 42px;
  border-radius: 42px;
  background-color: ${Colors.LIGHT_GRAY4};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = () => (
  <Opener>
    <Icon type="menu" />
  </Opener>
);

export default Menu;
