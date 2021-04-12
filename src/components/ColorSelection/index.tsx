import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { useAppContext, useEditorContext } from '../../contexts';

import {
  BoxColor,
  BoxSelection,
  BoxTypeColor,
  Button,
  ColorSelected,
  Container,
  CurrentCustomColor,
  TitleTypeColor
} from './styles';

const ColorSelection: React.FC<{ setColor: string, getColor: (color: string) => void}> = ({ setColor, getColor}) => {
  const [showBoxSelection, setShowBoxSelection] = useState(false);
  const [colorSelected, setColorSelected] = useState(setColor);
  const [customColor, setCustomColor] = useState('#050508');

  const { appClickEventSubScribe } = useAppContext();
  const { basicsColors, favoriteColors, setFavoriteColors } = useEditorContext();

  useEffect(() => {
    appClickEventSubScribe(hanndleAppScrennClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setColorSelected(setColor);
  }, [setColor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getColor(colorSelected);
  }, [colorSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  const hanndleAppScrennClick = useCallback((event: React.MouseEvent) => {
    if (showBoxSelection) {
      setShowBoxSelection(false);
      setCustomColor('');
    }
    console.log('App click', showBoxSelection);
  }, [showBoxSelection]);

  function handleSelectColorFromTheCustom (color: string) {
    setColorSelected(color);
    setCustomColor(color);
  }

  function handleAddFavoriteColor () {
    setFavoriteColors([...favoriteColors, customColor])
    alert(customColor)
    setCustomColor('');
  }

  return (
    <Container >
      <ColorSelected color={colorSelected} />
      <FiChevronDown size={18} onClick={() => setShowBoxSelection(!showBoxSelection)} />

      {showBoxSelection &&
        <BoxSelection>
          <BoxTypeColor>
          {basicsColors.map((color, index) => {
            return (
              <BoxColor key={index} color={color} onClick={() => setColorSelected(color)} />
            )
          })}
          </BoxTypeColor>
          <BoxTypeColor>
          <TitleTypeColor>Favoritas</TitleTypeColor>
          {favoriteColors.map((color, index) => {
            return (
              <BoxColor key={index} color={color} onClick={() => setColorSelected(color)} />
            )
          })}
          </BoxTypeColor>

          {customColor.length > 0 &&
          <CurrentCustomColor>
          <TitleTypeColor>Seleção personalida atual</TitleTypeColor>
              <BoxColor color={customColor} />
              <Button onClick={handleAddFavoriteColor} >Adicionar as favoritas</Button>
          </CurrentCustomColor>
            }
          <Button>
            <label htmlFor='inputColor'>Adicionar cor</label>
            <input
              id='inputColor'
              type='color'
              value={customColor}
              onChange={(event => handleSelectColorFromTheCustom(event.target.value))} />
          </Button>
        </BoxSelection>
      }
    </Container>
  );
}

export default ColorSelection;