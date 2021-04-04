import React from 'react';
import {
  FiFilePlus,
  FiFolder,
  FiSave,
  FiPrinter,
  FiRotateCcw,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiMaximize
} from 'react-icons/fi';
import { useEditorContext } from '../../contexts/editorContext';

import { Container } from './styles';

const ActionsBar: React.FC = () => {
  const { lineGridWeight, setLineGridWeight } = useEditorContext()
  function lineGridWeightUp () {
    setLineGridWeight(lineGridWeight + 1)
  }

  function lineGridWeightDown () {
    setLineGridWeight(lineGridWeight - 1)
  }

  const tools = [
    {name: 'Novo projeto', icon: FiFilePlus, action: () => {}},
    {name: 'Abrir projeto', icon: FiFolder, action: () => {}},
    {name: 'Salvar', icon: FiSave, action: () => {}},
    {name: 'Imprimir', icon: FiPrinter, action: () => {}},
    {name: 'Rotacionar', icon: FiRotateCcw, action: () => {}},
    {name: 'RotacionarCw', icon: FiRotateCw, action: () => {}},
    {name: 'ZoomIn', icon: FiZoomIn, action: lineGridWeightUp },
    {name: 'ZoomOut', icon: FiZoomOut, action: lineGridWeightDown },
    {name: 'Enquadrar', icon: FiMaximize, action: () => {}},
  ]
  return (
    <Container>
      {tools.map((tool) => {
        return (
          <li key={tool.name} onClick={() => tool.action()}>
            <tool.icon size={18} />
          </li>
        )
      })}      
    </Container>
  );
}

export default ActionsBar;