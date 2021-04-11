import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 2px 0 2px;
  border-radius: 2px;
  background: white;
  box-shadow: inset 0 0 3px black;

  svg {
    cursor: pointer;
  }
`;

export const ColorSelected = styled.div<{ color: string}>`
  width: 70%;
  height: 26px;
  border-radius: 4px;
  outline: none;
  background: ${props => props.color};
  box-shadow: 0 0 1px gray;
`;

export const BoxSelection = styled.div`
  position: absolute;
  top: 32px;
  left: 0;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  outline: none;
  background: white;
  box-shadow: inherit;
`;

export const BoxTypeColor = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 210px;
  margin: 5px;
`;
export const TitleTypeColor = styled.h4`
  width: 100%;
  font-size: 14px;
`;

export const CurrentCustomColor = styled(BoxTypeColor)`
  justify-content: space-between;
`;


export const BoxColor = styled.div<{color: string}>`
  width: 24px;
  height: 24px;
  border: 1px solid ${props => props.theme.pallete.onPrimary};
  border-radius: 2px;
  margin: 1px;
  outline: none;
  background: ${props => props.color};
  cursor: pointer;

  :hover {
    border: 2px solid ${props => props.theme.pallete.onPrimary};
  }
`;

export const Button = styled.button`
  min-width: 100px;
  max-width: calc(fit-content + 10px);
  height: 26px;
  margin: 5px;
  padding: 0 5px 0 5px;
  border-radius: 3px;
  border: none;
  background: ${props => props.theme.pallete.primary.main};
  color: ${props => props.theme.pallete.onSurface};
  font-size: 13px;
  font-weight: 600;
  outline: none;
  cursor: pointer;

  :hover {
    border: 2px solid ${props => props.theme.pallete.onPrimary};
    opacity: .9;
  }

  label {
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    }

  input {
    position: absolute;
    opacity: 0;
    outline: none;
    cursor: pointer;
  }
`;
