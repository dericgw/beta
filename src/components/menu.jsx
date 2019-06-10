import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

import colors from '../assets/styles/theme';

const Opener = styled.span`
  position: absolute;
  right: 42px;
  top: 42px;
  height: 42px;
  width: 42px;
  border-radius: 42px;
  background-color: ${colors.grey.lightest};
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
