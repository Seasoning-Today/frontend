import styled from 'styled-components';

interface LayoutProps {
  width?: number;
  height?: number;
}

export const Layout =
  styled.div <
  LayoutProps >
  `
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`;
