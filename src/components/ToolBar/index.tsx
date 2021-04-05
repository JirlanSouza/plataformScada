import React from 'react';
import {
  FiMousePointer,
  FiType,
  FiCircle,
  FiSquare,
  FiBarChart,
  FiTriangle,
  FiTrendingUp
} from 'react-icons/fi';
import { useEditorContext } from '../../contexts';

import { Container } from './styles';

const ToolBar: React.FC = () => {
  const tools = [
    {name: 'Cursor', icon: FiMousePointer },
    {name: 'Text', icon: FiType },
    {name: 'Circle', icon: FiCircle },
    {name: 'Square', icon: FiSquare },
    {name: 'Triangle', icon: FiTriangle},
    {name: 'BarGraf', icon: FiBarChart },
    {name: 'Trending', icon: FiTrendingUp },
  ];

  const { setToolSelected } = useEditorContext();

  function handleSelectTool (tool: string) {
    setToolSelected(tool);
  }

  return (
    <Container>
      {tools.map((tool) => {
        return (
          <li key={tool.name} onClick={() => handleSelectTool(tool.name)}>
            <tool.icon size={18} />
          </li>
        )
      })}      
    </Container>
  );
}

export default ToolBar;