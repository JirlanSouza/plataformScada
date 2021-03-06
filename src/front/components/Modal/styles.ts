import styled from 'styled-components';

export const Container = styled.dialog<{ position: { x: number; y: number } }>`
  position: fixed;
  top: ${(props) => `${props.position.y}px`};
  left: ${(props) => `${props.position.x}px`};
  width: 400px;
  height: 500px;
  border: 2px solid ${(props) => props.theme.pallete.onPrimary};
  border-radius: 5px;
  background: ${(props) => props.theme.pallete.surface};
  box-shadow: 0 0 3px ${(props) => props.theme.pallete.onSurface};
  z-index: 10;

  svg {
    margin-right: 6px;
    cursor: move;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid ${(props) => props.theme.pallete.onPrimary};
  background: ${(props) => props.theme.pallete.surface};
`;

export const Title = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.pallete.onSurface};
  margin: 10px;
`;

export const Menu = styled.nav`
  width: 100%;
  height: 100%;
  padding: 10px;

  ul {
    width: max-content;
    height: 100%;
    display: flex;
    align-items: center;
    list-style: none;

    :nth-last-child(1) {
      padding-right: 10px;
      border-right: 1px solid ${(props) => props.theme.pallete.onPrimary};
    }

    li {
      max-width: max-content;
      font-weight: 500;
      color: ${(props) => props.theme.pallete.onSurface};
      cursor: pointer;

      :hover {
        opacity: 0.7;
      }
    }

    li + li {
      margin-left: 10px;
      padding-left: 10px;
      border-left: 1px solid ${(props) => props.theme.pallete.onPrimary};
    }
  }
`;

export const Body = styled.div`
  height: 70%;
`;

export const Secssion = styled.div`
  margin: 10px;
  border-bottom: 1px solid ${(props) => props.theme.pallete.onPrimary};
`;

export const SecssionTitle = styled.h3`
  font-size: 1rem;
  color: ${(props) => props.theme.pallete.onSurface};
  margin-bottom: 10px;
`;

export const Content = styled.h3`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  width: 22%;
  margin-right: 10px;
  margin-bottom: 20px;

  label {
    font-size: 0.8rem;
    color: ${(props) => props.theme.pallete.onSurface};
    margin-bottom: 5px;
  }

  input,
  select {
    height: 30px;
    font-weight: 500;
    outline: none;
  }
`;
