import React from 'react';
import ColorSelection from '../ColorSelection';

import { Container, Content, InputWrapper, Menu, Secssion, Title, TopBar } from './styles';

interface ObjectProptiesToEdit {
  style: {
    name: string,
    propties: {
      name: string,
      inputType: number,
      inputPropties: {}
    }[],
  }[],
  comon: [],
  conection: []
}

const rectPropties: ObjectProptiesToEdit = {
  style: [
    {
      name: 'font',
      propties: [
        {
          name: 'size',
          inputType: 0,
          inputPropties: {
            minValue: 7,
            maxValue: 64,

          }

        },
        {
          name: 'color',
          inputType: 1,
          inputPropties: {
            getColor: (color: string) => { }
          }
        },
        {
          name: 'bold',
          inputType: 2,
          inputPropties: {}
        },
        {
          name: 'italic',
          inputType: 2,
          inputPropties: {}
        },
      ],
    },
    {
      name: 'background',
      propties: [
        {
          name: 'color',
          inputType: 1,
          inputPropties: {
            getColor: (color: string) => { }
          }
        }

      ]
    },
    {
      name: 'border',
      propties: [
        {
          name: 'color',
          inputType: 1,
          inputPropties: {
            getColor: (color: string) => { }
          }
        },
        {
          name: 'width',
          inputType: 0,
          inputPropties: {
            minValue: 0,
            maxValue: 100,
          }
        },
        {
          name: 'style',
          inputType: 3,
          inputPropties: {
            options: [
              'Solid',
              'Dotted',
              'Dashad',
              'Double',
            ]
          }
        }

      ]
    }
  ],
  comon: [],
  conection: [],
}

const InputNumber: React.FC = () => {
  return (
    <InputWrapper>
      <label>Width</label>
      <input type='number' />
    </InputWrapper>
  )
}

const InputColor: React.FC = () => {
  return (
    <InputWrapper>
      <label>Color</label>
      <ColorSelection getColor={(color: string) => { }} />
    </InputWrapper>
  )
}

const InputRadio: React.FC = () => {
  return (
    <InputWrapper>
      <label>Negrito</label>
      <input type='radio' />
    </InputWrapper>
  )
}

const InputSelect: React.FC = () => {
  return (
    <InputWrapper>
      <label>Style</label>
      <select>
        {/* {options.map((option, index) => {
          return (
            <option>{option}</option>
          )
        }
        }) */}
      </select>
    </InputWrapper>
  )
}

const Inputs = [
  InputNumber,
  InputColor,
  InputRadio,
  InputSelect
]

const ModalProptiesObject: React.FC = () => {

  return (
    <Container>
      <TopBar>
        <Menu >
          <ul>
            <li>Style</li>
            <li>Comon</li>
            <li>Conection</li>
          </ul>
        </Menu>
      </TopBar>

      {rectPropties.style.map((proptie, index) => {
        return (
          <Secssion>
            <Title>{proptie.name}</Title>

            <Content>
              {proptie.propties.map((proptieFild, index) => {
                return (
                  <>
                  {proptieFild.inputType === 0 && <InputNumber/>}
                  {proptieFild.inputType === 1 && <InputColor />}
                  {proptieFild.inputType === 2 && <InputRadio />}
                  {proptieFild.inputType === 3 && <InputSelect />}
                </>
                )
              })}
            </Content>
          </Secssion>

        )
      })}
    </Container>
  );
}

export default ModalProptiesObject;