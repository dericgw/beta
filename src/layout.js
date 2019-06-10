import styled from 'styled-components';

import colors from './assets/styles/theme';

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 320px auto;
  height: 100%;
`;

export const Sidebar = styled.aside`
  background-color: ${colors.grey.lightest};
`;

export const Main = styled.section`
  .router {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
