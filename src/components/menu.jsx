import React from 'react';
import styled from 'styled-components';
import { Colors, Menu as BMenu, Icon, Popover, PopoverPosition } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

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

const MenuItems = () => (
  <BMenu>
    <BMenu.Item text="Log in" />
    <BMenu.Item text="Log out" />
  </BMenu>
);

const Menu = () => (
  <Popover content={<MenuItems />} position={PopoverPosition.BOTTOM_LEFT}>
    <Opener>
      <Icon icon={IconNames.MENU} />
    </Opener>
  </Popover>
);

export default Menu;
