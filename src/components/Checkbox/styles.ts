import styled from 'styled-components';

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin-left: 10px;

  /* Hide default HTML checkbox */
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .2s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 0;
    bottom: 0;
    background-color: white;
    -webkit-transition: .4s;
    transition: .2s;
  }

  input:checked + .slider {
    background-color: ${props => props.theme.pallete.primary.main};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${props => props.theme.pallete.primary.main};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;