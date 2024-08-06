import styled from 'styled-components';

interface LayoutProps {
  backgroundColor?: string;
}

export const Layout = styled.button<LayoutProps>`
  width: auto;
  min-width: 3.4375rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.3rem 0.7rem;

  border: none;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
`;
