import React from 'react';
import { FiFilePlus, FiFolder, FiSave, FiPrinter, FiRotateCcw, FiRotateCw } from 'react-icons/fi';

import { Container } from './styles';

const ToolBar: React.FC = () => {
  const tools = [
    {name: 'Novo projeto', icon: FiFilePlus },
    {name: 'Abrir projeto', icon: FiFolder },
    {name: 'Salvar', icon: FiSave },
    {name: 'Imprimir', icon: FiPrinter },
    {name: 'rotacionar', icon: FiRotateCcw },
    {name: 'rotacionar', icon: FiRotateCw },
  ]
  return (
    <Container>
      {tools.map((tool) => {
        return (
          <li key={tool.name}>
            <tool.icon size={20} />
          </li>
        )
      })}      
    </Container>
  );
}

export default ToolBar;