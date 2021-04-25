import styled from 'styled-components';

export const Container = styled.nav`
  width: '50%';
  
  ul {
    display: flex;
    align-items: center;
  };

  li {
    list-style: none;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: all .2s ease-out;
    
    :hover {
      border-bottom: 1px solid ${props => props.theme.pallete.onPrimary};
    }
  }

  li + li {
    margin-left: .8rem;
  }
`;
