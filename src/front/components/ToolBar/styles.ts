import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
  margin-top: .2rem;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .13rem;
    padding: .1rem;
    list-style: none;
    border-radius: .2rem;
    cursor: pointer;
    transition: all .2s ease-out;

    :hover {
      background: ${props => props.theme.pallete.onPrimary};
      
      svg {
        color: ${props => props.theme.headerBackgound} !important;
      }
    }
  }
  
  li + li {
    margin-left: .3rem;
  }
`;
