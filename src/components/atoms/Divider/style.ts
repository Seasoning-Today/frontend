import styled from 'styled-components';

interface LayoutProps {
  margin?: number;
  borderWidth?: number;
  color?: string;
}

export const Layout = styled.hr<LayoutProps>`
  width: ${({ margin }) => `calc(100% - ${margin}rem * 2)`};
  border-width: ${({ borderWidth }) => `${borderWidth}rem 0 0 0`};

  border-color: ${({ color }) => `${color}`};
`;
