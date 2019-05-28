import styled from 'styled-components';
import { Colors } from '@blueprintjs/core';

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 320px auto;
  height: 100%;
`;

export const Sidebar = styled.aside`
  padding: 12px;
  background-color: ${Colors.LIGHT_GRAY5};
`;

export const Main = styled.section`
  .router {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
