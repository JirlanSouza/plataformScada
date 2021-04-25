import styled from 'styled-components';

export const ButtonsWarapper = styled.div`
  display: flex;
  margin: 40px 20px 20px 20px;

  button + button {
    margin-left: 20px;
  }
`;

export const ButtonStyle = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.pallete.onPrimary};
  background: ${props => props.theme.pallete.primary.main};
  color: ${props => props.theme.pallete.onSurface};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color .2s ease;

  :hover {
    color: ${props => props.theme.pallete.onPrimary};
  }
`;